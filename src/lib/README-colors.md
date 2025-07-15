# Guide des Couleurs - Site MVO Stérilisation

Ce document décrit la charte graphique et l'utilisation des couleurs sur le site MVO Stérilisation.

## Couleurs Principales

### Bleu Principal

- **Code hexadécimal** : `#32697B`
- **Utilisation** : Couleur principale du site, boutons primaires, liens, éléments d'accent
- **CSS Variable** : `--mvo-blue`

### Vert Principal

- **Code hexadécimal** : `#6F9D2B`
- **Utilisation** : Boutons secondaires, éléments de succès, accents verts
- **CSS Variable** : `--mvo-green`

### Orange

- **Code hexadécimal** : `#FF6600`
- **Utilisation** : Éléments d'alerte, accents orange, boutons d'action
- **CSS Variable** : `--mvo-orange`

## Dégradé Officiel MVO

Le dégradé officiel du site MVO utilise :

- **Début** : `#263443`
- **Fin** : `#3a899d`
- **CSS Variables** : `--mvo-gradient-from`, `--mvo-gradient-to`
- **Classe CSS** : `.mvo-gradient`

## Couleurs Secondaires

### Bleu

- **Clair** : `#4A8BA8` (`--mvo-light-blue`)
- **Sombre** : `#1E4A5A` (`--mvo-dark-blue`)

### Vert

- **Clair** : `#8BB84A` (`--mvo-light-green`)
- **Sombre** : `#4A6B1E` (`--mvo-dark-green`)

## Couleurs Neutres

- **Blanc** : `#FFFFFF` (`--mvo-white`)
- **Gris clair** : `#F8F9FA` (`--mvo-light-gray`)
- **Gris** : `#6C757D` (`--mvo-gray`)
- **Gris sombre** : `#343A40` (`--mvo-dark-gray`)
- **Noir** : `#000000` (`--mvo-black`)

## Couleurs Sémantiques

- **Succès** : `#6F9D2B` (vert principal)
- **Avertissement** : `#FF6600` (orange)
- **Erreur** : `#DC3545`
- **Information** : `#32697B` (bleu principal)

## Utilisation dans le Code

### Variables CSS

```css
/* Utilisation directe */
color: var(--mvo-blue);
background-color: var(--mvo-green);

/* Dégradé */
background: linear-gradient(
  135deg,
  var(--mvo-gradient-from) 0%,
  var(--mvo-gradient-to) 100%
);
```

### Classes CSS Utilitaires

```css
/* Couleurs de texte */
.mvo-text-blue
.mvo-text-green
.mvo-text-orange

/* Couleurs de fond */
.mvo-bg-blue
.mvo-bg-green
.mvo-bg-orange

/* Dégradé */
.mvo-gradient;
```

### TypeScript

```typescript
import { colors, getColor } from "../lib/colors"

// Utilisation directe
const primaryBlue = colors.primary.blue // '#32697B'
const primaryGreen = colors.primary.green // '#6F9D2B'

// Fonction utilitaire
const blueColor = getColor("primary", "blue") // '#32697B'
```

## Composants Stylisés

### Boutons

- **Primaire** : `.btn-primary` (bleu principal)
- **Secondaire** : `.btn-secondary` (vert principal)

### Cartes

- **Classe** : `.card`
- **Couleur de fond** : Blanc
- **Ombre** : Gris clair avec effet hover

## Règles d'Utilisation

1. **Cohérence** : Toujours utiliser les variables CSS ou les classes utilitaires
2. **Contraste** : Vérifier le contraste pour l'accessibilité
3. **Hiérarchie** : Utiliser le bleu principal pour les éléments importants
4. **Accents** : Utiliser le vert et l'orange pour les actions et alertes
5. **Neutres** : Utiliser les gris pour le texte et les bordures

## Maintenance

- Les couleurs sont centralisées dans `src/lib/colors.ts`
- Les variables CSS sont définies dans `src/styles/global.css`
- Toute modification doit être faite dans ces deux fichiers
- Mettre à jour cette documentation lors des changements
