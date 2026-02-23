# 🎨 Visual Builder - CMS Drag & Drop Style Elementor

## 📋 Vue d'ensemble

Le **Visual Builder** est un éditeur de pages visuel drag & drop inspiré d'Elementor, intégré dans AfriShop pour permettre la création de boutiques en ligne de manière intuitive et professionnelle.

## ✨ Fonctionnalités Phase 1 (Implémentées)

### 1. Interface à 3 Panneaux
- **Panneau Gauche**: Bibliothèque de widgets/sections avec recherche et filtres par catégorie
- **Canvas Central**: Zone de prévisualisation en temps réel avec rendu responsive
- **Panneau Droit**: Éditeur de propriétés avancé avec onglets (Contenu, Style, Avancé)

### 2. Drag & Drop Complet
- ✅ Glisser-déposer depuis la bibliothèque vers le canvas
- ✅ Réorganisation des sections par drag & drop
- ✅ Drop zones visuelles avec feedback
- ✅ Animations fluides pendant le drag

### 3. Canvas Responsive
- **Mode Desktop** (100% largeur)
- **Mode Tablet** (768px)
- **Mode Mobile** (375px)
- Transitions fluides entre les modes

### 4. Édition en Temps Réel
- Modification instantanée du contenu (titres, descriptions, boutons)
- Ajustement des espacements (padding top/bottom)
- Personnalisation des couleurs de fond
- Alignement du texte
- Classes CSS personnalisées
- ID de section pour ancrage

### 5. Widgets/Sections Disponibles

#### Hero Sections
- **Hero Centré** 🎯 - Titre et CTA centrés avec fond gradient
- **Hero Split 50/50** 📱 - Texte à gauche, image à droite
- **Hero Gradient** 🌈 - Fond gradient moderne

#### Features Sections
- **Grille 3 Colonnes** 📊 - 3 colonnes avec icônes
- **Layout Alterné** 🔄 - Image et texte alternés

#### How It Works
- **Étapes Numérotées** 🔢 - Process en 3 étapes
- **Timeline Verticale** ⏱️ - Ligne de temps

#### Testimonials
- **Grille 2x2** ⭐ - 4 témoignages en grille

#### FAQ
- **Accordéon Simple** ❓ - Questions/réponses pliables

#### CTA
- **CTA Centré** 🎯 - Call-to-action impactant

### 6. Actions Disponibles
- **Sélection**: Cliquer sur une section pour l'éditer
- **Duplication**: Dupliquer une section en un clic
- **Suppression**: Supprimer une section
- **Réorganisation**: Glisser-déposer pour changer l'ordre

## 🚀 Comment Utiliser

### Accès au Visual Builder

1. **Créer une nouvelle boutique**:
   ```
   Dashboard → Créer une boutique
   ```

2. **Flux de travail**:
   - **Étape 1**: Import du produit (URL AliExpress/Amazon)
   - **Étape 2**: Customizer (couleurs, polices)
   - **Étape 3**: Visual Builder 🎨 (nouveau!)
   - **Étape 4**: Prévisualisation finale

### Utilisation du Builder

#### 1. Ajouter une Section
- Parcourez la bibliothèque dans le panneau gauche
- Utilisez la recherche ou les filtres par catégorie
- **Glissez** la section vers le canvas central
- **Déposez** où vous voulez

#### 2. Modifier une Section
- **Cliquez** sur une section dans le canvas
- Le panneau droit affiche les propriétés
- Modifiez le contenu dans l'onglet **Contenu**
- Ajustez le style dans l'onglet **Style**
- Options avancées dans l'onglet **Avancé**

#### 3. Réorganiser les Sections
- **Glissez** la poignée de drag (icône trois points)
- **Déposez** à la nouvelle position

#### 4. Actions Rapides
- **Dupliquer** (icône copie): Crée une copie de la section
- **Supprimer** (icône poubelle): Supprime la section

#### 5. Mode Responsive
- Cliquez sur Desktop/Tablet/Mobile dans la barre du haut
- Le canvas ajuste sa largeur automatiquement
- Visualisez votre boutique sur différents devices

## 📁 Architecture des Fichiers

```
components/shop-builder/
├── visual-builder.tsx              # Composant principal
├── widgets-library-panel.tsx       # Panneau gauche (bibliothèque)
├── properties-panel.tsx            # Panneau droit (éditeur)
├── builder-canvas.tsx              # Canvas central avec drop zones
├── shop-customizer.tsx             # Étape précédente (couleurs/polices)
└── shop-preview.tsx                # Prévisualisation finale

app/(dashboard)/create/page.tsx     # Page principale avec flux complet
```

## 🎨 Personnalisation

### Ajouter un Nouveau Widget

1. **Ajouter le template** dans `widgets-library-panel.tsx`:
```typescript
{
  id: "mon-widget",
  category: "hero",
  name: "Mon Widget",
  description: "Description du widget",
  thumbnail: "🎨",
  popular: false,
  content: {
    title: "Titre par défaut",
    description: "Description par défaut",
  },
  style: {
    paddingTop: "normal",
    paddingBottom: "normal",
    backgroundColor: "transparent",
  },
}
```

2. **Ajouter le rendu** dans `builder-canvas.tsx`:
```typescript
if (section.id === "mon-widget") {
  return (
    <div>
      {/* Votre rendu personnalisé */}
    </div>
  )
}
```

## 🔮 Phase 2 - Intégration IA (À venir)

### Fonctionnalités Prévues
- 🤖 **Génération de contenu avec IA**
  - Bouton "Générer avec IA" pour titres
  - Bouton "Améliorer avec IA" pour descriptions
  - Suggestions SEO automatiques

- 🎨 **Suggestions de design IA**
  - Recommandations de layouts basées sur le produit
  - Combinaisons de couleurs optimisées

- 🖼️ **Génération d'images IA**
  - Intégration DALL-E / Midjourney
  - Génération d'arrière-plans

### API IA à Intégrer
- OpenAI GPT-4 (génération de texte)
- Anthropic Claude (amélioration de contenu)
- DALL-E 3 (génération d'images)
- Replicate (alternative images)

## 🔧 Configuration Technique

### Dépendances
```json
{
  "@dnd-kit/core": "^6.3.1",
  "@dnd-kit/sortable": "^10.0.0",
  "@dnd-kit/utilities": "^3.2.2",
  "@phosphor-icons/react": "^2.1.10"
}
```

### Multi-tenant
Le système est conçu pour être **multi-tenant**:
- Chaque boutique a ses propres sections
- Les données sont isolées par utilisateur
- Support de Supabase pour la base de données

## 🎯 Prochaines Étapes

### Phase 2 - IA (Prochain)
- [ ] Intégrer API OpenAI pour génération de contenu
- [ ] Ajouter boutons IA dans le panneau de propriétés
- [ ] Implémenter suggestions de design
- [ ] Génération d'images avec DALL-E

### Phase 3 - Fonctionnalités Avancées
- [ ] Historique Undo/Redo
- [ ] Templates pré-conçus complets
- [ ] Export/Import de designs
- [ ] Prévisualisation live côte-à-côte
- [ ] Animations au scroll
- [ ] Éditeur d'images intégré

## 💡 Conseils d'Utilisation

1. **Commencez simple**: Ajoutez 3-4 sections essentielles (Hero, Features, CTA)
2. **Utilisez les templates**: Tous les widgets ont du contenu par défaut
3. **Testez le responsive**: Vérifiez sur mobile, tablet et desktop
4. **Dupliquez au lieu de recréer**: Utilisez la fonction dupliquer
5. **Sauvegardez régulièrement**: Cliquez sur "Sauvegarder" fréquemment

## 🐛 Debug

Pour activer les logs de debug:
```typescript
// Dans visual-builder.tsx
console.log('Active drag ID:', activeId)
console.log('Sections:', sections)
```

## 📞 Support

En cas de problème:
1. Vérifiez la console navigateur (F12)
2. Assurez-vous que toutes les dépendances sont installées
3. Redémarrez le serveur de développement

---

**Version**: 1.0.0 (Phase 1)
**Dernière mise à jour**: 2026-02-21
**Auteur**: AfriShop Team
