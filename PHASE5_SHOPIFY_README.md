# Phase 5 - Intégration Shopify

## Vue d'ensemble

La Phase 5 complète le workflow end-to-end d'AfriShop V2.0 en ajoutant la synchronisation automatique des produits générés vers Shopify. Les utilisateurs peuvent maintenant :

1. **Scraper un produit** (Phase 1-2)
2. **Générer 20 variations** avec IA (Phase 3-4)
3. **Synchroniser vers Shopify** en un clic (Phase 5) ✨

## Architecture

### Services Backend

#### 1. Shopify Client (`lib/services/shopify-client.ts`)

Service de connexion et validation Shopify.

**Fonctionnalités** :
- Configuration Shopify API avec REST et GraphQL
- Création de clients authentifiés
- Vérification des identifiants (domaine + access token)

**Utilisation** :
```typescript
import { createShopifyClient, verifyShopifyCredentials } from "@/lib/services/shopify-client"

// Vérifier les identifiants
const verification = await verifyShopifyCredentials({
  shopDomain: "monshop.myshopify.com",
  accessToken: "shpat_xxxxx"
})

if (verification.valid) {
  console.log("Connecté à:", verification.shopName)
}

// Créer un client API
const client = createShopifyClient({
  shopDomain: "monshop.myshopify.com",
  accessToken: "shpat_xxxxx"
})
```

**Configuration requise** :
```env
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_HOST_NAME=localhost (ou votre domaine)
```

#### 2. Shopify Products (`lib/services/shopify-products.ts`)

Service de gestion des produits sur Shopify.

**Fonctions principales** :

##### `createShopifyProduct()`
Crée un produit unique sur Shopify.

```typescript
const result = await createShopifyProduct(credentials, generatedProduct)

if (result.success) {
  console.log("Produit créé avec ID:", result.productId)
}
```

##### `createShopifyProductsBatch()`
Crée plusieurs produits avec callback de progression.

```typescript
const result = await createShopifyProductsBatch(
  credentials,
  products, // Array de 20 produits
  (current, total) => {
    console.log(`Progression: ${current}/${total}`)
  }
)

console.log(`${result.created} créés, ${result.failed} échecs`)
```

**Caractéristiques** :
- Rate limiting automatique (600ms entre chaque requête)
- Gestion des variants (couleur, modèle, etc.)
- Upload d'images
- Statut par défaut : `draft` (brouillon)
- Retour détaillé avec IDs Shopify

##### Autres fonctions
- `updateShopifyProduct()` - Mise à jour d'un produit existant
- `deleteShopifyProduct()` - Suppression d'un produit
- `getShopifyProducts()` - Récupération des produits
- `publishShopifyProduct()` - Publication d'un brouillon → actif

### API Routes

#### 1. `/api/shopify/connect` - Connexion Shopify

**POST** - Vérifier et enregistrer les identifiants
```typescript
// Request
{
  "shopDomain": "monshop.myshopify.com",
  "accessToken": "shpat_xxxxx",
  "shopId": "uuid"
}

// Response
{
  "success": true,
  "shopName": "Mon Shop",
  "shopDomain": "monshop.myshopify.com",
  "message": "Connecté avec succès à Mon Shop"
}
```

**GET** - Récupérer le statut de connexion
```typescript
GET /api/shopify/connect?shopId=uuid

// Response
{
  "success": true,
  "connected": true,
  "shopDomain": "monshop.myshopify.com",
  "shopName": "Mon Shop"
}
```

**DELETE** - Déconnecter un shop
```typescript
DELETE /api/shopify/connect?shopId=uuid

// Response
{
  "success": true,
  "message": "Déconnecté de Shopify avec succès"
}
```

#### 2. `/api/shopify/sync` - Synchronisation produits

**POST** - Synchroniser les produits générés
```typescript
// Request
{
  "products": [...], // Array de 20 produits générés
  "shopifyCredentials": {
    "shopDomain": "monshop.myshopify.com",
    "accessToken": "shpat_xxxxx"
  },
  "shopId": "uuid"
}

// Response
{
  "success": true,
  "created": 18,
  "failed": 2,
  "total": 20,
  "results": [
    { "productId": 8234567890 },
    { "productId": 8234567891 },
    { "error": "Rate limit exceeded" },
    ...
  ],
  "message": "18 produit(s) synchronisé(s) avec succès sur Shopify"
}
```

**Processus** :
1. Validation des credentials
2. Création batch des produits (avec rate limiting)
3. Mise à jour de la table `generated_products` avec les IDs Shopify
4. Enregistrement des credentials dans le shop

**GET** - Récupérer les statistiques de synchronisation
```typescript
GET /api/shopify/sync?shopId=uuid

// Response
{
  "success": true,
  "stats": {
    "total": 20,
    "synced": 18,
    "pending": 2,
    "lastSync": "2025-01-15T10:30:00Z"
  },
  "products": [...]
}
```

### Composants UI

#### 1. `ShopifyConnect` - Connexion/Déconnexion

Composant pour gérer la connexion Shopify d'un shop.

**Props** :
```typescript
interface ShopifyConnectProps {
  shopId: string
  onConnectionChange?: (connected: boolean) => void
}
```

**Fonctionnalités** :
- Formulaire de connexion (domaine + token)
- Affichage du statut (connecté/déconnecté)
- Bouton de déconnexion
- Instructions pour obtenir un Access Token
- Validation automatique des credentials
- Lien vers Shopify Admin

**Utilisation** :
```tsx
<ShopifyConnect
  shopId={shopConfig.shopId}
  onConnectionChange={(connected) => {
    console.log("Statut Shopify:", connected)
  }}
/>
```

#### 2. `ShopifySyncDialog` - Synchronisation

Dialog modal pour synchroniser les produits générés.

**Props** :
```typescript
interface ShopifySyncDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  products: any[]
  shopId?: string
  onSyncComplete?: (result: any) => void
}
```

**Fonctionnalités** :
- Formulaire credentials (si pas déjà connecté)
- Barre de progression en temps réel
- Affichage des résultats (créés/échecs)
- Messages d'erreur détaillés
- Fermeture auto après succès

**Utilisation** :
```tsx
<ShopifySyncDialog
  open={showDialog}
  onOpenChange={setShowDialog}
  products={generatedProducts}
  shopId={shopConfig.shopId}
  onSyncComplete={(result) => {
    console.log(`${result.created} produits synchronisés`)
  }}
/>
```

#### 3. Intégration dans `ProductGeneration`

Le composant de génération de produits a été mis à jour pour inclure :

**Bouton de synchronisation** :
- Affiché après la génération réussie des 20 produits
- Ouvre le dialog `ShopifySyncDialog`
- Affiche le nombre de produits à synchroniser

**Code ajouté** :
```tsx
{generatedProducts.length > 0 && (
  <Button
    onClick={() => setShowShopifySync(true)}
    variant="outline"
    className="w-full gap-2"
    size="lg"
  >
    <ShoppingBag className="h-5 w-5" />
    Synchroniser avec Shopify ({generatedProducts.length} produits)
  </Button>
)}

<ShopifySyncDialog
  open={showShopifySync}
  onOpenChange={setShowShopifySync}
  products={generatedProducts}
  shopId={shopId}
/>
```

## Base de données

### Modifications du schéma `shops`

Champs ajoutés pour stocker les credentials Shopify :

```sql
ALTER TABLE shops ADD COLUMN IF NOT EXISTS shopify_domain TEXT;
ALTER TABLE shops ADD COLUMN IF NOT EXISTS shopify_access_token TEXT;
ALTER TABLE shops ADD COLUMN IF NOT EXISTS shopify_shop_name TEXT;
```

### Modifications du schéma `generated_products`

Champs pour tracking de la synchronisation :

```sql
ALTER TABLE generated_products ADD COLUMN IF NOT EXISTS shopify_product_id TEXT;
ALTER TABLE generated_products ADD COLUMN IF NOT EXISTS synced_at TIMESTAMP;
```

**Requête de synchronisation** :
```sql
UPDATE generated_products
SET shopify_product_id = $1, synced_at = NOW()
WHERE product_id = $2 AND user_id = $3
```

## Configuration Shopify

### Étapes pour obtenir un Access Token

1. **Se connecter à l'admin Shopify**
   - URL : `https://monshop.myshopify.com/admin`

2. **Créer une app personnalisée**
   - Paramètres → Apps et canaux de vente
   - Cliquer sur "Développer des apps"
   - Créer une nouvelle app

3. **Configurer les permissions Admin API**
   - Sélectionner "Configuration"
   - Admin API scopes :
     - ✅ `read_products`
     - ✅ `write_products`
     - ✅ `read_orders` (optionnel)
     - ✅ `write_orders` (optionnel)

4. **Installer l'app et obtenir le token**
   - Cliquer sur "Installer l'app"
   - Copier l'**Admin API access token** (commence par `shpat_`)
   - ⚠️ Le token n'est affiché qu'une seule fois !

5. **Utiliser dans AfriShop**
   - Domaine : `monshop.myshopify.com`
   - Token : `shpat_xxxxxxxxxxxxx`

### Permissions requises

| Scope | Description | Requis |
|-------|-------------|--------|
| `read_products` | Lire les produits existants | ✅ Oui |
| `write_products` | Créer/modifier des produits | ✅ Oui |
| `read_orders` | Lire les commandes | ⚪ Optionnel |
| `write_orders` | Créer/modifier des commandes | ⚪ Optionnel |

## Workflow complet

### De A à Z : Scraping → Shopify

```
1. Import du produit
   ↓
2. Génération de 20 variations (IA)
   ↓
3. Génération d'images (Gemini + Placeholders)
   ↓
4. Enregistrement dans Supabase
   ↓
5. Clic "Synchroniser avec Shopify"
   ↓
6. Saisie des credentials (ou utilise ceux enregistrés)
   ↓
7. Upload batch vers Shopify (600ms entre chaque)
   ↓
8. Mise à jour des IDs Shopify dans la DB
   ↓
9. ✅ Produits disponibles sur Shopify (draft)
```

### Temps estimé

- **Import produit** : 5-10 secondes
- **Génération 20 produits** : 30-50 secondes
- **Synchronisation Shopify** : 20-30 secondes (20 produits × 600ms + API time)
- **Total** : ~1 minute pour 20 produits prêts sur Shopify

## Rate Limiting

### Shopify API Limits

Shopify impose des limites strictes :
- **REST API** : 2 requêtes/seconde
- **Bucket size** : 40 requêtes max en burst

### Gestion dans AfriShop

**Pause entre requêtes** :
```typescript
await new Promise((resolve) => setTimeout(resolve, 600))
```

**600ms = ~1.67 req/sec** → En-dessous de la limite de 2 req/sec ✅

**Temps pour 20 produits** :
- 20 produits × 600ms = 12 secondes minimum
- + temps API (~0.5-1s par requête)
- = **~20-30 secondes total**

### Progression en temps réel

Le callback `onProgress` permet de suivre l'upload :

```typescript
await createShopifyProductsBatch(
  credentials,
  products,
  (current, total) => {
    setProgress((current / total) * 100)
    console.log(`${current}/${total} produits synchronisés`)
  }
)
```

## Gestion des erreurs

### Erreurs courantes

#### 1. Credentials invalides
```json
{
  "success": false,
  "error": "Invalid API key or access token"
}
```

**Solution** : Vérifier le domaine et le token

#### 2. Rate limit dépassé
```json
{
  "success": false,
  "error": "Exceeded 2 calls per second for api client"
}
```

**Solution** : Automatiquement géré par le délai de 600ms

#### 3. Permission insuffisante
```json
{
  "success": false,
  "error": "Access denied for products scope"
}
```

**Solution** : Ajouter `write_products` dans les scopes de l'app

#### 4. Domaine invalide
```json
{
  "success": false,
  "error": "Shop not found"
}
```

**Solution** : Utiliser le format `monshop.myshopify.com`

### Retry logic

Actuellement **pas de retry automatique**.

Pour implémenter :
```typescript
async function createWithRetry(credentials, product, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await createShopifyProduct(credentials, product)
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
}
```

## Résultats batch

### Structure du résultat

```typescript
{
  success: boolean        // true si au moins 1 créé
  created: number        // Nombre de produits créés
  failed: number         // Nombre d'échecs
  total: number          // Total de produits
  results: Array<{
    productId?: number   // ID Shopify si succès
    error?: string       // Message d'erreur si échec
  }>
}
```

### Exemple de résultat

```json
{
  "success": true,
  "created": 18,
  "failed": 2,
  "total": 20,
  "results": [
    { "productId": 8234567890 },
    { "productId": 8234567891 },
    { "error": "Image URL not accessible" },
    { "productId": 8234567892 },
    // ... 16 autres
  ]
}
```

## Statut des produits

### Cycle de vie

```
draft → active → archived
  ↓       ↓
  ↓    published (visible clients)
  ↓
invisible (admin seulement)
```

### Par défaut : Draft

Tous les produits créés sont en `draft` :
```typescript
const shopifyProduct: ShopifyProduct = {
  // ...
  status: "draft"
}
```

### Publication

Pour publier un produit :
```typescript
await publishShopifyProduct(credentials, productId)
```

Cela change le statut de `draft` → `active`.

## Sécurité

### Stockage des credentials

⚠️ **Attention** : Les `access_token` sont stockés en clair dans la DB.

**TODO** : Chiffrement des tokens
```typescript
// Exemple avec crypto
import { encrypt, decrypt } from "@/lib/crypto"

// Avant stockage
const encryptedToken = encrypt(accessToken)

// Avant utilisation
const decryptedToken = decrypt(shop.shopify_access_token)
```

### Row Level Security (RLS)

Les credentials Shopify sont protégés par RLS :
```sql
-- Un user ne peut voir que ses shops
CREATE POLICY "Users can only access their own shops"
ON shops FOR ALL
USING (auth.uid() = user_id);
```

### Validation côté serveur

Tous les endpoints vérifient :
1. ✅ Authentification Supabase
2. ✅ Ownership du shop (user_id)
3. ✅ Validation des credentials Shopify

## Monitoring

### Logs

Les opérations Shopify sont loggées :
```typescript
console.log(`🔄 Synchronisation de ${products.length} produits...`)
console.log(`  📦 Progression: ${current}/${total}`)
console.log(`✅ ${created} créés, ${failed} échecs`)
```

### Statistiques

Vue disponible via `/api/shopify/sync?shopId=xxx` (GET) :
```json
{
  "stats": {
    "total": 20,       // Total de produits générés
    "synced": 18,      // Produits synchronisés
    "pending": 2,      // En attente de sync
    "lastSync": "2025-01-15T10:30:00Z"
  }
}
```

## Prochaines améliorations

### Court terme

- [ ] Chiffrement des access tokens
- [ ] Retry automatique avec exponential backoff
- [ ] Webhook Shopify (notifications de vente)
- [ ] Synchronisation bidirectionnelle (Shopify → AfriShop)

### Moyen terme

- [ ] Gestion des collections Shopify
- [ ] Upload d'images réelles (remplacer placeholders)
- [ ] Gestion du stock et inventaire
- [ ] Multi-devises et multi-langues

### Long terme

- [ ] Shopify App publique (OAuth flow)
- [ ] Analytics de ventes intégrées
- [ ] Recommandations IA pour optimiser les produits
- [ ] A/B testing automatique des descriptions

## Dépendances

```json
{
  "dependencies": {
    "@shopify/shopify-api": "^11.5.0"
  }
}
```

**Version Shopify API** : 2024-01 (LATEST_API_VERSION)

## Ressources

- [Shopify Admin API Docs](https://shopify.dev/docs/api/admin-rest)
- [Shopify App Development](https://shopify.dev/docs/apps)
- [Rate Limits](https://shopify.dev/docs/api/usage/rate-limits)
- [REST API Reference](https://shopify.dev/docs/api/admin-rest/2024-01/resources/product)

## Support

Pour les problèmes Shopify :
1. Vérifier les logs console
2. Tester les credentials avec Postman
3. Consulter le Shopify Admin pour les produits créés
4. Vérifier les scopes de l'app

---

**Phase 5 Status** : ✅ Implémentée et fonctionnelle

**Prochaine phase** : Phase 6 - Déploiement (Vercel + Supabase production)
