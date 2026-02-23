-- Migration AfriShop - Tables principales
-- Date: 2026-02-23

-- Table: shops
-- Stocke les boutiques créées par les utilisateurs
CREATE TABLE IF NOT EXISTS public.shops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Configuration de la boutique
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  sections JSONB NOT NULL DEFAULT '[]'::jsonb,
  product_data JSONB,

  -- Métadonnées
  name TEXT,
  slug TEXT UNIQUE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  version INTEGER DEFAULT 1,

  -- Shopify integration
  shopify_store_id TEXT,
  shopify_access_token TEXT,
  shopify_domain TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_shops_user_id ON public.shops(user_id);
CREATE INDEX IF NOT EXISTS idx_shops_status ON public.shops(status);
CREATE INDEX IF NOT EXISTS idx_shops_slug ON public.shops(slug);

-- Row Level Security (RLS)
ALTER TABLE public.shops ENABLE ROW LEVEL SECURITY;

-- Politique: Les utilisateurs peuvent voir leurs propres boutiques
CREATE POLICY "Users can view own shops" ON public.shops
  FOR SELECT USING (auth.uid() = user_id);

-- Politique: Les utilisateurs peuvent créer leurs boutiques
CREATE POLICY "Users can create own shops" ON public.shops
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Politique: Les utilisateurs peuvent modifier leurs boutiques
CREATE POLICY "Users can update own shops" ON public.shops
  FOR UPDATE USING (auth.uid() = user_id);

-- Politique: Les utilisateurs peuvent supprimer leurs boutiques
CREATE POLICY "Users can delete own shops" ON public.shops
  FOR DELETE USING (auth.uid() = user_id);


-- Table: shop_versions
-- Stocke l'historique des versions pour chaque boutique
CREATE TABLE IF NOT EXISTS public.shop_versions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_id UUID NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,

  -- Snapshot de la version
  snapshot JSONB NOT NULL,
  label TEXT,
  is_auto_save BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_shop_versions_shop_id ON public.shop_versions(shop_id);
CREATE INDEX IF NOT EXISTS idx_shop_versions_created_at ON public.shop_versions(created_at DESC);

-- Row Level Security (RLS)
ALTER TABLE public.shop_versions ENABLE ROW LEVEL SECURITY;

-- Politique: Les utilisateurs peuvent voir les versions de leurs boutiques
CREATE POLICY "Users can view own shop versions" ON public.shop_versions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.shops
      WHERE shops.id = shop_versions.shop_id
      AND shops.user_id = auth.uid()
    )
  );

-- Politique: Les utilisateurs peuvent créer des versions pour leurs boutiques
CREATE POLICY "Users can create shop versions" ON public.shop_versions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.shops
      WHERE shops.id = shop_versions.shop_id
      AND shops.user_id = auth.uid()
    )
  );

-- Politique: Les utilisateurs peuvent supprimer les versions de leurs boutiques
CREATE POLICY "Users can delete shop versions" ON public.shop_versions
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.shops
      WHERE shops.id = shop_versions.shop_id
      AND shops.user_id = auth.uid()
    )
  );


-- Table: scraped_products
-- Cache des produits scrapés pour éviter re-scraping
CREATE TABLE IF NOT EXISTS public.scraped_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Source du produit
  platform TEXT NOT NULL CHECK (platform IN ('aliexpress', 'amazon', 'jumia', 'temu', 'shein')),
  product_url TEXT NOT NULL,
  product_id TEXT,

  -- Données scrapées
  data JSONB NOT NULL,

  -- Métadonnées
  scrape_success BOOLEAN DEFAULT TRUE,
  error_message TEXT,

  -- Cache management
  cache_expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour performance et cache lookup
CREATE UNIQUE INDEX IF NOT EXISTS idx_scraped_products_url ON public.scraped_products(product_url);
CREATE INDEX IF NOT EXISTS idx_scraped_products_platform ON public.scraped_products(platform);
CREATE INDEX IF NOT EXISTS idx_scraped_products_cache_expires ON public.scraped_products(cache_expires_at);

-- Row Level Security (RLS) - Public read pour cache partagé
ALTER TABLE public.scraped_products ENABLE ROW LEVEL SECURITY;

-- Politique: Tout le monde peut lire le cache (produits scrapés partagés)
CREATE POLICY "Anyone can read scraped products" ON public.scraped_products
  FOR SELECT USING (TRUE);

-- Politique: Seuls les services backend peuvent écrire (via service role)
CREATE POLICY "Service role can write scraped products" ON public.scraped_products
  FOR ALL USING (TRUE);


-- Table: product_imports
-- Historique des imports de produits par utilisateur
CREATE TABLE IF NOT EXISTS public.product_imports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  shop_id UUID REFERENCES public.shops(id) ON DELETE SET NULL,

  -- Détails de l'import
  platform TEXT NOT NULL,
  product_url TEXT NOT NULL,
  product_data JSONB NOT NULL,

  -- Status
  status TEXT DEFAULT 'success' CHECK (status IN ('success', 'failed', 'pending')),
  error_message TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_product_imports_user_id ON public.product_imports(user_id);
CREATE INDEX IF NOT EXISTS idx_product_imports_shop_id ON public.product_imports(shop_id);

-- RLS
ALTER TABLE public.product_imports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own imports" ON public.product_imports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own imports" ON public.product_imports
  FOR INSERT WITH CHECK (auth.uid() = user_id);


-- Function: Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Update updated_at on shops
DROP TRIGGER IF EXISTS update_shops_updated_at ON public.shops;
CREATE TRIGGER update_shops_updated_at
  BEFORE UPDATE ON public.shops
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger: Update updated_at on scraped_products
DROP TRIGGER IF EXISTS update_scraped_products_updated_at ON public.scraped_products;
CREATE TRIGGER update_scraped_products_updated_at
  BEFORE UPDATE ON public.scraped_products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();


-- Function: Nettoyer le cache expiré (à exécuter via cron)
CREATE OR REPLACE FUNCTION public.clean_expired_cache()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.scraped_products
  WHERE cache_expires_at < NOW();

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Commentaires pour documentation
COMMENT ON TABLE public.shops IS 'Boutiques créées par les utilisateurs';
COMMENT ON TABLE public.shop_versions IS 'Historique des versions de boutiques';
COMMENT ON TABLE public.scraped_products IS 'Cache des produits scrapés depuis les plateformes e-commerce';
COMMENT ON TABLE public.product_imports IS 'Historique des imports de produits par utilisateur';
