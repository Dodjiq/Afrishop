# Configuration de Supabase pour AfriShop

Ce guide vous explique comment configurer Supabase pour AfriShop.

## 📋 Prérequis

- Un compte Supabase (gratuit) : https://supabase.com
- Node.js installé
- Le projet AfriShop cloné localement

## 🚀 Étape 1 : Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Connectez-vous ou créez un compte
3. Cliquez sur **"New Project"**
4. Remplissez les informations :
   - **Name** : AfriShop (ou le nom de votre choix)
   - **Database Password** : Choisissez un mot de passe fort (sauvegardez-le !)
   - **Region** : Choisissez la région la plus proche (ex: Frankfurt pour l'Europe)
5. Cliquez sur **"Create new project"**
6. Attendez 2-3 minutes que le projet soit créé

## 🔑 Étape 2 : Récupérer les clés API

1. Dans votre projet Supabase, allez dans **Settings** (icône engrenage en bas à gauche)
2. Cliquez sur **API** dans le menu
3. Vous verrez deux clés importantes :
   - **Project URL** : `https://xxxxx.supabase.co`
   - **anon public** : Une longue clé qui commence par `eyJ...`

## 📝 Étape 3 : Configurer les variables d'environnement

1. Ouvrez le fichier `.env.local` à la racine du projet
2. Remplacez les valeurs placeholder par vos vraies clés :

```env
# Remplacez ces valeurs
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Sauvegardez le fichier

## 🗄️ Étape 4 : Créer les tables de base de données

1. Dans Supabase, allez dans **SQL Editor**
2. Cliquez sur **"New Query"**
3. Copiez-collez ce script SQL :

```sql
-- Table des utilisateurs (profiles)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des boutiques
CREATE TABLE shops (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  url TEXT UNIQUE,
  product_data JSONB NOT NULL,
  shop_config JSONB NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;

-- Policies pour profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policies pour shops
CREATE POLICY "Users can view own shops"
  ON shops FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own shops"
  ON shops FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own shops"
  ON shops FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own shops"
  ON shops FOR DELETE
  USING (auth.uid() = user_id);

-- Fonction pour créer un profil automatiquement
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer le profil
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

4. Cliquez sur **"Run"** pour exécuter le script
5. Vérifiez qu'il n'y a pas d'erreurs

## ✅ Étape 5 : Tester la configuration

1. Redémarrez votre serveur de développement :
```bash
npm run dev
```

2. Allez sur http://localhost:3000
3. Essayez de vous connecter
4. La déconnexion devrait maintenant fonctionner correctement !

## 🔐 Étape 6 : Configurer l'authentification par email

1. Dans Supabase, allez dans **Authentication** > **Providers**
2. Assurez-vous que **Email** est activé
3. Configurez les paramètres d'email si nécessaire

## 📧 (Optionnel) Configurer Resend pour les emails

1. Créez un compte sur [resend.com](https://resend.com)
2. Allez dans **API Keys**
3. Créez une nouvelle clé API
4. Ajoutez-la dans `.env.local` :
```env
RESEND_API_KEY=re_votre_cle_api
```

## 🎉 C'est fait !

Votre application AfriShop est maintenant connectée à Supabase !

### Fonctionnalités disponibles :
- ✅ Authentification (login/signup/logout)
- ✅ Base de données pour les boutiques
- ✅ Gestion des utilisateurs
- ✅ Sécurité avec Row Level Security

### Prochaines étapes :
- Connecter les formulaires de login/signup à Supabase
- Migrer les boutiques du localStorage vers Supabase
- Implémenter la récupération de mot de passe avec emails

## 🆘 Besoin d'aide ?

- Documentation Supabase : https://supabase.com/docs
- Discord AfriShop : [Lien à venir]
- Issues GitHub : https://github.com/Dodjiq/Afrishop/issues
