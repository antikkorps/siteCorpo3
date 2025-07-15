/**
 * Configuration des couleurs du site MVO Stérilisation
 *
 * Ce fichier centralise toutes les couleurs utilisées dans le site
 * pour garantir la cohérence avec la charte graphique MVO.
 */

export const colors = {
  // Couleurs principales MVO
  primary: {
    blue: "#32697B", // Bleu principal MVO
    green: "#6F9D2B", // Vert principal MVO
    orange: "#FF6600", // Orange accent (conservé)
  },

  // Dégradé officiel MVO (conservé pour compatibilité)
  gradient: {
    from: "#263443",
    to: "#3a899d",
  },

  // Couleurs secondaires
  secondary: {
    lightBlue: "#4A8BA8", // Version plus claire du bleu principal
    lightGreen: "#8BB84A", // Version plus claire du vert principal
    darkBlue: "#1E4A5A", // Version plus sombre du bleu principal
    darkGreen: "#4A6B1E", // Version plus sombre du vert principal
  },

  // Couleurs neutres
  neutral: {
    white: "#FFFFFF",
    lightGray: "#F8F9FA",
    gray: "#6C757D",
    darkGray: "#343A40",
    black: "#000000",
  },

  // Couleurs sémantiques
  semantic: {
    success: "#6F9D2B", // Utilise le vert principal
    warning: "#FF6600", // Utilise l'orange
    error: "#DC3545",
    info: "#32697B", // Utilise le bleu principal
  },
} as const

// Types TypeScript pour la sécurité des types
export type ColorKey = keyof typeof colors
export type PrimaryColorKey = keyof typeof colors.primary
export type SecondaryColorKey = keyof typeof colors.secondary
export type NeutralColorKey = keyof typeof colors.neutral
export type SemanticColorKey = keyof typeof colors.semantic

// Fonction utilitaire pour obtenir une couleur
export function getColor(category: ColorKey, shade?: string): string {
  const colorCategory = colors[category]
  if (typeof colorCategory === "string") {
    return colorCategory
  }
  if (shade && shade in colorCategory) {
    return colorCategory[shade as keyof typeof colorCategory]
  }
  throw new Error(`Couleur non trouvée: ${category}.${shade}`)
}

// Export des couleurs individuelles pour une utilisation directe
export const { primary, gradient, secondary, neutral, semantic } = colors
