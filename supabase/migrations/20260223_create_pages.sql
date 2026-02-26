-- Table pour les pages du shop
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID NOT NULL REFERENCES public.shops(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  is_home BOOLEAN DEFAULT FALSE,

  sections JSONB DEFAULT '[]'::jsonb,

  meta_title TEXT,
  meta_description TEXT,

  is_published BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(shop_id, slug)
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_pages_shop_id ON public.pages(shop_id);
CREATE INDEX IF NOT EXISTS idx_pages_user_id ON public.pages(user_id);
CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages(shop_id, slug);
CREATE INDEX IF NOT EXISTS idx_pages_is_home ON public.pages(shop_id, is_home);

-- RLS Policies
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs ne peuvent voir que leurs propres pages
CREATE POLICY "Users can view their own pages"
  ON public.pages FOR SELECT
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent insérer leurs propres pages
CREATE POLICY "Users can insert their own pages"
  ON public.pages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent mettre à jour leurs propres pages
CREATE POLICY "Users can update their own pages"
  ON public.pages FOR UPDATE
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent supprimer leurs propres pages
CREATE POLICY "Users can delete their own pages"
  ON public.pages FOR DELETE
  USING (auth.uid() = user_id);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pages_updated_at_trigger
  BEFORE UPDATE ON public.pages
  FOR EACH ROW
  EXECUTE FUNCTION update_pages_updated_at();
