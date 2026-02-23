-- Migration: Generated Products Table
-- Date: 2026-02-23
-- Stocke les produits générés automatiquement par l'IA

-- Table: generated_products
CREATE TABLE IF NOT EXISTS public.generated_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_id UUID NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Produit de base source
  base_product_id TEXT,
  base_product_platform TEXT,

  -- Données du produit généré
  product_id TEXT NOT NULL, -- ID unique généré
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',

  -- Media
  images JSONB DEFAULT '[]'::jsonb,
  thumbnail TEXT,

  -- Catégorisation
  category TEXT,
  tags JSONB DEFAULT '[]'::jsonb,

  -- Variante
  variant_type TEXT, -- "color", "size", "model", "bundle", "premium"
  variant_value TEXT,

  -- Features & specs
  features JSONB DEFAULT '[]'::jsonb,
  specifications JSONB DEFAULT '{}'::jsonb,

  -- Métadonnées de génération
  generation_strategy TEXT, -- "color", "model", "bundle", "premium"
  generation_metadata JSONB DEFAULT '{}'::jsonb,

  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),

  -- Shopify sync (pour Phase 5)
  shopify_product_id TEXT,
  shopify_variant_id TEXT,
  synced_at TIMESTAMP WITH TIME ZONE,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_generated_products_shop_id ON public.generated_products(shop_id);
CREATE INDEX IF NOT EXISTS idx_generated_products_user_id ON public.generated_products(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_products_product_id ON public.generated_products(product_id);
CREATE INDEX IF NOT EXISTS idx_generated_products_status ON public.generated_products(status);
CREATE INDEX IF NOT EXISTS idx_generated_products_base_product ON public.generated_products(base_product_id, base_product_platform);

-- Row Level Security (RLS)
ALTER TABLE public.generated_products ENABLE ROW LEVEL SECURITY;

-- Politique: Les utilisateurs peuvent voir leurs propres produits générés
CREATE POLICY "Users can view own generated products" ON public.generated_products
  FOR SELECT USING (auth.uid() = user_id);

-- Politique: Les utilisateurs peuvent créer des produits
CREATE POLICY "Users can create generated products" ON public.generated_products
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Politique: Les utilisateurs peuvent modifier leurs produits
CREATE POLICY "Users can update own generated products" ON public.generated_products
  FOR UPDATE USING (auth.uid() = user_id);

-- Politique: Les utilisateurs peuvent supprimer leurs produits
CREATE POLICY "Users can delete own generated products" ON public.generated_products
  FOR DELETE USING (auth.uid() = user_id);

-- Trigger: Auto-update updated_at
DROP TRIGGER IF EXISTS update_generated_products_updated_at ON public.generated_products;
CREATE TRIGGER update_generated_products_updated_at
  BEFORE UPDATE ON public.generated_products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Vue: Statistiques de génération par shop
CREATE OR REPLACE VIEW public.shop_generation_stats AS
SELECT
  shop_id,
  user_id,
  COUNT(*) as total_products,
  COUNT(DISTINCT base_product_id) as unique_base_products,
  COUNT(*) FILTER (WHERE status = 'published') as published_count,
  COUNT(*) FILTER (WHERE shopify_product_id IS NOT NULL) as synced_to_shopify,
  jsonb_object_agg(
    COALESCE(generation_strategy, 'unknown'),
    count
  ) FILTER (WHERE generation_strategy IS NOT NULL) as strategy_breakdown,
  MIN(created_at) as first_generation,
  MAX(created_at) as last_generation
FROM (
  SELECT
    shop_id,
    user_id,
    base_product_id,
    status,
    shopify_product_id,
    generation_strategy,
    created_at,
    COUNT(*) as count
  FROM public.generated_products
  GROUP BY shop_id, user_id, base_product_id, status, shopify_product_id, generation_strategy, created_at
) subquery
GROUP BY shop_id, user_id;

-- Commentaires
COMMENT ON TABLE public.generated_products IS 'Produits générés automatiquement par IA pour chaque boutique';
COMMENT ON VIEW public.shop_generation_stats IS 'Statistiques de génération de produits par boutique';
