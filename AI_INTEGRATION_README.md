# 🤖 Phase 2 - Intégration IA

## 📋 Vue d'ensemble

La **Phase 2** ajoute des fonctionnalités d'intelligence artificielle au Visual Builder pour automatiser et améliorer la création de contenu pour les boutiques en ligne.

## ✨ Fonctionnalités Implémentées

### 1. Génération de Contenu Automatique

#### 🎯 Génération de Titres
- Bouton "Générer" à côté du champ titre
- Crée des titres accrocheurs en 3-8 mots
- Prend en compte le type de section et le produit
- Animation de chargement pendant la génération

#### 📝 Amélioration de Descriptions
- Bouton "Améliorer" pour les descriptions
- Optimise le texte existant ou en crée du nouveau
- Longueur optimale de 15-30 mots
- Ton professionnel et engageant

#### 🔘 Génération de Boutons CTA
- Bouton "Générer" pour le texte des boutons
- CTA courts et incitatifs (2-4 mots)
- Adaptés au contexte de la section

#### ⚡ Génération Complète
- Bouton violet "Générer tout le contenu avec l'IA"
- Remplit automatiquement: titre, sous-titre, description, bouton
- Un seul clic pour du contenu complet

### 2. Assistant IA - Suggestions de Layout

#### 🧠 Analyse du Produit
- Analyse automatique du produit importé
- Recommandations basées sur:
  - Type de produit
  - Catégorie
  - Prix
  - Description

#### 📊 Suggestions Intelligentes
- Propose 5 sections optimales
- Explication du choix de chaque section
- Visualisation avec miniatures
- Bouton "Ajouter toutes les sections" en un clic

#### 🎨 Stratégie Globale
- Explication de la stratégie de page recommandée
- Ordre optimal des sections
- Justification des choix

## 🛠️ Architecture Technique

### Fichiers Créés

#### 1. `/app/api/ai/generate-content/route.ts`
**Route API Next.js** pour la génération de contenu

**Types de génération supportés**:
- `title`: Génération de titres
- `description`: Amélioration de descriptions
- `button`: Génération de CTA
- `full-section`: Génération complète
- `suggest-layout`: Suggestions de sections

**Modèle utilisé**: `gpt-4o-mini` (économique et rapide)

```typescript
// Exemple d'utilisation
POST /api/ai/generate-content
{
  "type": "title",
  "context": {
    "sectionType": "hero",
    "currentTitle": "Mon ancien titre"
  },
  "productData": {
    "name": "iPhone 15 Pro",
    "description": "...",
    "price": "999"
  }
}
```

#### 2. `/hooks/use-ai-generation.ts`
**Hook React personnalisé** pour faciliter les appels IA

**Méthodes**:
- `generateTitle()`: Génère un titre
- `generateDescription()`: Améliore une description
- `generateButton()`: Génère un CTA
- `generateFullSection()`: Génère tout le contenu
- `suggestLayout()`: Suggère des sections

**État**:
- `isGenerating`: Boolean pour l'état de chargement
- `error`: Message d'erreur éventuel

```typescript
const { isGenerating, generateTitle } = useAIGeneration({ productData })

const handleGenerate = async () => {
  const title = await generateTitle("hero", "Ancien titre")
  console.log(title) // "Découvrez l'Excellence Redéfinie"
}
```

#### 3. `/components/shop-builder/ai-assistant-panel.tsx`
**Composant UI** pour l'assistant IA dans le panneau gauche

**Fonctionnalités**:
- Mode collapsé par défaut (économie d'espace)
- Bouton "Suggérer un layout"
- Affichage des suggestions avec raisons
- Ajout en masse de sections

#### 4. Modifications des Composants Existants

**`properties-panel.tsx`**:
- ✅ Import du hook `useAIGeneration`
- ✅ Boutons IA pour chaque champ
- ✅ Animation de chargement
- ✅ Désactivation des champs pendant génération
- ✅ Bouton principal "Générer tout le contenu"

**`widgets-library-panel.tsx`**:
- ✅ Intégration de `AIAssistantPanel`
- ✅ Support de `productData` prop
- ✅ Fonction `onAddMultipleWidgets`

**`visual-builder.tsx`**:
- ✅ Passage de `productData` aux panneaux
- ✅ Fonction d'ajout multiple de widgets

## 🚀 Configuration

### 1. Obtenir une Clé API OpenAI

1. Aller sur https://platform.openai.com/api-keys
2. Créer un nouveau projet
3. Générer une clé API (commence par `sk-`)
4. Copier la clé (elle ne s'affichera qu'une fois)

### 2. Configurer l'Environnement

Ajouter dans `.env.local`:

```bash
OPENAI_API_KEY=sk-votre-cle-api-ici
```

⚠️ **Important**: Ne jamais commiter `.env.local` dans Git !

### 3. Vérifier l'Installation

```bash
# Vérifier que le SDK est installé
npm list openai

# Devrait afficher: openai@6.22.0
```

## 💡 Utilisation

### Dans le Panneau de Propriétés

1. **Sélectionner une section** dans le canvas
2. Le panneau de droite s'ouvre
3. Onglet **"Contenu"**

#### Génération Rapide (Recommandé)
```
Cliquer sur le bouton violet:
"✨ Générer tout le contenu avec l'IA"
```
→ Remplit automatiquement tous les champs en ~3 secondes

#### Génération Individuelle
```
À côté de chaque champ, bouton "Générer" ou "Améliorer":
- Titre: "Générer"
- Description: "Améliorer"
- Bouton: "Générer"
```

### Avec l'Assistant IA

1. **Importer un produit** (étape 1)
2. **Accéder au Visual Builder** (étape 3)
3. Dans le panneau de gauche:
   - Voir la zone violette "Assistant IA"
   - Cliquer sur "✨ Suggérer un layout"
4. **L'IA analyse** le produit (~5 secondes)
5. **Affichage des suggestions**:
   - 5 sections recommandées
   - Raison pour chaque section
   - Explication globale
6. Cliquer sur **"Ajouter toutes les sections"**
7. Toutes les sections s'ajoutent automatiquement au canvas !

## 📊 Prompts IA Utilisés

### Titre
```
Tu es un expert en rédaction marketing et e-commerce.
Tu crées des titres accrocheurs, concis et percutants.
Titres en français, 3-8 mots maximum.

Génère un titre pour une section "hero".
Produit: iPhone 15 Pro
Description: Smartphone premium avec...

Réponds UNIQUEMENT avec le titre.
```

### Description
```
Tu es un expert en copywriting e-commerce.
Descriptions engageantes qui convertissent.
Ton moderne et professionnel, 15-30 mots.

Améliore cette description pour "features":
Les meilleures fonctionnalités du marché

Produit: iPhone 15 Pro

Réponds UNIQUEMENT avec la description améliorée.
```

### Suggestions de Layout
```
Tu es un expert en UX/UI pour sites e-commerce.
Recommande les meilleures structures de page.

Analyse ce produit et suggère 5 sections:
Produit: iPhone 15 Pro
Catégorie: électronique
Prix: 999€

Retourne un JSON:
{
  "sections": [
    {"id": "hero-split", "reason": "..."},
    ...
  ],
  "explanation": "Stratégie globale..."
}
```

## 🎯 Exemples de Résultats

### Titre Généré
**Input**: Section "hero" pour iPhone 15 Pro
**Output**: "L'Innovation Redéfinie dans Votre Poche"

### Description Améliorée
**Input**: "Un bon téléphone"
**Output**: "Découvrez la puissance ultime avec le processeur A17 Pro, une autonomie exceptionnelle et un design titanium élégant"

### Bouton CTA
**Input**: Section "cta"
**Output**: "Obtenir le Mien"

### Suggestions de Layout (iPhone)
1. **hero-split** - "Image produit impactante pour montrer le design premium"
2. **features-3-colonnes** - "Mettre en avant les 3 innovations clés (puce, caméra, autonomie)"
3. **how-it-works-numbered** - "Expliquer le processus d'achat simple en 3 étapes"
4. **testimonials-grid** - "Preuves sociales avec avis 5 étoiles"
5. **cta-centered** - "Appel à l'action fort pour finaliser l'achat"

**Explication**: "Cette structure guide le visiteur d'une première impression visuelle forte vers une décision d'achat, en passant par la présentation des bénéfices, la simplification du processus et la réassurance sociale."

## ⚡ Performance

### Temps de Génération
- **Titre seul**: ~1-2 secondes
- **Description**: ~2-3 secondes
- **Bouton**: ~1 seconde
- **Section complète**: ~3-4 secondes
- **Suggestions layout**: ~4-6 secondes

### Coûts
Utilisation de `gpt-4o-mini`:
- **Prix**: ~$0.15 / 1M tokens input, ~$0.60 / 1M tokens output
- **Par génération**:
  - Titre: ~$0.0001 (~100 tokens)
  - Section complète: ~$0.0003 (~300 tokens)
  - Suggestions: ~$0.0005 (~500 tokens)

**Estimation**: 1000 générations complètes = ~$0.30

## 🔒 Sécurité

### Bonnes Pratiques Implémentées

✅ **Clé API côté serveur uniquement**
- Route API Next.js (pas d'exposition au client)
- Variable d'environnement `OPENAI_API_KEY`

✅ **Gestion d'erreurs**
- Messages d'erreur user-friendly
- Logs côté serveur pour debug
- Timeout automatique

✅ **Rate Limiting**
- Gestion de l'erreur 429 (trop de requêtes)
- Message d'attente pour l'utilisateur

✅ **Validation des entrées**
- Vérification du type de génération
- Validation du contexte requis

## 🐛 Gestion d'Erreurs

### Erreurs Possibles

#### 1. Clé API invalide
```
Error: Clé API OpenAI invalide
```
**Solution**: Vérifier la clé dans `.env.local`

#### 2. Limite de requêtes
```
Error: Limite de requêtes atteinte
```
**Solution**: Attendre quelques instants

#### 3. Format JSON invalide
```
Error: Format de réponse invalide
```
**Solution**: Réessayer, l'IA corrige généralement au 2ème essai

### Debug

Activer les logs:
```typescript
// Dans properties-panel.tsx
const handleGenerateTitle = async () => {
  console.log('Generating title for:', selectedSection.category)
  const result = await generateTitle(...)
  console.log('Result:', result)
}
```

## 📈 Métriques & Analytics

### À Implémenter (Phase 3)

- [ ] Tracking du nombre de générations par utilisateur
- [ ] Temps moyen de génération
- [ ] Taux de satisfaction (keep vs regenerate)
- [ ] Sections IA les plus utilisées
- [ ] Coûts par utilisateur

## 🔮 Améliorations Futures

### Court Terme
- [ ] Choix du ton (formel, casual, luxe, etc.)
- [ ] Régénération si pas satisfait
- [ ] Historique des générations
- [ ] Templates de prompts personnalisables

### Moyen Terme
- [ ] Génération d'images avec DALL-E 3
- [ ] SEO automatique (meta descriptions, alt texts)
- [ ] A/B testing suggestions
- [ ] Multi-langue automatique

### Long Terme
- [ ] Fine-tuning sur les données AfriShop
- [ ] Modèle personnalisé pour l'e-commerce
- [ ] Génération de pages complètes
- [ ] Chat IA intégré pour aide contextuelle

## 📝 Exemples de Code

### Utiliser le Hook dans un Nouveau Composant

```typescript
"use client"

import { useAIGeneration } from "@/hooks/use-ai-generation"
import { Button } from "@/components/ui/button"

export function MyComponent({ productData }) {
  const { isGenerating, generateTitle } = useAIGeneration({ productData })

  const handleClick = async () => {
    try {
      const title = await generateTitle("hero")
      console.log("Titre généré:", title)
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  return (
    <Button onClick={handleClick} disabled={isGenerating}>
      {isGenerating ? "Génération..." : "Générer Titre"}
    </Button>
  )
}
```

### Appeler l'API Directement

```typescript
const response = await fetch('/api/ai/generate-content', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'title',
    context: { sectionType: 'hero' },
    productData: { name: 'Mon Produit', ...  }
  })
})

const data = await response.json()
console.log(data.content) // "Titre Généré"
```

## 🎓 Ressources

- [Documentation OpenAI API](https://platform.openai.com/docs)
- [GPT-4o Mini Pricing](https://openai.com/api/pricing/)
- [Best Practices for Prompting](https://platform.openai.com/docs/guides/prompt-engineering)
- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

## 📞 Support

### En cas de problème:

1. **Vérifier la console**:
   - F12 → Console
   - Regarder les erreurs

2. **Vérifier les Network requests**:
   - F12 → Network
   - Filtrer par "generate-content"
   - Voir la réponse du serveur

3. **Tester l'API manuellement**:
```bash
curl -X POST http://localhost:3001/api/ai/generate-content \
  -H "Content-Type: application/json" \
  -d '{"type":"title","context":{"sectionType":"hero"}}'
```

---

**Version**: 1.0.0 (Phase 2)
**Dernière mise à jour**: 2026-02-21
**Auteur**: AfriShop Team
