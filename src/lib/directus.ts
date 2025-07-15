import { createDirectus, readItems, rest } from "@directus/sdk"

// Types pour les collections Directus
export interface Page {
  id: number
  titre: string
  slug: string
  contenu: string
  image_principale?: {
    id: string
    filename_download: string
    width: number
    height: number
  }
  meta_description?: string
  statut: "draft" | "published" | "archived"
  ordre?: number
  date_publication?: string
  date_created: string
  date_updated: string
}

export interface Service {
  id: number
  titre: string
  slug: string
  description_courte: string
  description_complete: string
  image_principale?: {
    id: string
    filename_download: string
    width: number
    height: number
  }
  icone?: string
  couleur?: string
  statut: "draft" | "published" | "archived"
  ordre?: number
  date_created: string
  date_updated: string
}

export interface Actualite {
  id: number
  titre: string
  slug: string
  sous_titre?: string
  contenu: string
  auteur?: string
  image_principale?: {
    id: string
    filename_download: string
    width: number
    height: number
  }
  date_publication?: string
  statut: "draft" | "published" | "archived"
  date_created: string
  date_updated: string
}

export interface Temoignage {
  id: number
  nom_client: string
  prenom_client: string
  fonction?: string
  etablissement: string
  temoignage: string
  photo_client?: {
    id: string
    filename_download: string
    width: number
    height: number
  }
  note?: number
  statut: "draft" | "published" | "archived"
  ordre?: number
  date_created: string
  date_updated: string
}

export interface MembreEquipe {
  id: number
  nom: string
  prenom: string
  fonction: string
  bio?: string
  photo?: {
    id: string
    filename_download: string
    width: number
    height: number
  }
  email?: string
  telephone?: string
  linkedin?: string
  statut: "draft" | "published" | "archived"
  ordre?: number
  date_created: string
  date_updated: string
}

export interface Certification {
  id: number
  nom: string
  description?: string
  logo?: {
    id: string
    filename_download: string
    width: number
    height: number
  }
  date_obtention?: string
  date_expiration?: string
  statut: "draft" | "published" | "archived"
  ordre?: number
  date_created: string
  date_updated: string
}

export interface ParametresSite {
  id: number
  titre: string
  logo?: {
    id: string
    filename_download: string
    width: number
    height: number
  }
  favicon?: {
    id: string
    filename_download: string
    width: number
    height: number
  }
  description_site?: string
  adresse?: string
  telephone?: string
  email?: string
  siret?: string
  facebook?: string
  linkedin?: string
  youtube?: string
  date_created: string
  date_updated: string
}

// Configuration Directus
const DIRECTUS_URL = process.env.DIRECTUS_URL || "http://localhost:8055"
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN

// Client Directus
const directus = createDirectus(DIRECTUS_URL).with(rest())

// Fonctions pour récupérer les données
export async function getPages(): Promise<Page[]> {
  try {
    const response = await directus.request(
      readItems("pages", {
        filter: {
          statut: {
            _eq: "published",
          },
        },
        sort: ["ordre", "date_publication"],
        fields: ["*", "image_principale.*"],
      })
    )
    return (response as Page[]) || []
  } catch (error) {
    console.error("Erreur lors de la récupération des pages:", error)
    return []
  }
}

export async function getPage(slug: string): Promise<Page | null> {
  try {
    const response = await directus.request(
      readItems("pages", {
        filter: {
          slug: {
            _eq: slug,
          },
          statut: {
            _eq: "published",
          },
        },
        fields: ["*", "image_principale.*"],
        limit: 1,
      })
    )
    return (response as Page[])?.[0] || null
  } catch (error) {
    console.error("Erreur lors de la récupération de la page:", error)
    return null
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const response = await directus.request(
      readItems("services", {
        filter: {
          statut: {
            _eq: "published",
          },
        },
        sort: ["ordre"],
        fields: ["*", "image_principale.*"],
      })
    )
    return (response as Service[]) || []
  } catch (error) {
    console.error("Erreur lors de la récupération des services:", error)
    return []
  }
}

export async function getService(slug: string): Promise<Service | null> {
  try {
    const response = await directus.request(
      readItems("services", {
        filter: {
          slug: {
            _eq: slug,
          },
          statut: {
            _eq: "published",
          },
        },
        fields: ["*", "image_principale.*"],
        limit: 1,
      })
    )
    return (response as Service[])?.[0] || null
  } catch (error) {
    console.error("Erreur lors de la récupération du service:", error)
    return null
  }
}

export async function getActualites(limit?: number): Promise<Actualite[]> {
  try {
    const response = await directus.request(
      readItems("actualites", {
        filter: {
          statut: {
            _eq: "published",
          },
        },
        sort: ["-date_publication"],
        fields: ["*", "image_principale.*"],
        limit: limit || 10,
      })
    )
    return (response as Actualite[]) || []
  } catch (error) {
    console.error("Erreur lors de la récupération des actualités:", error)
    return []
  }
}

// Fonction pour récupérer une actualité par son slug
export async function getActualite(slug: string): Promise<Actualite | null> {
  try {
    const response = await directus.request(
      readItems("actualites", {
        filter: {
          slug: {
            _eq: slug,
          },
          statut: {
            _eq: "published",
          },
        },
        fields: ["*", "image_principale.*"],
        limit: 1,
      })
    )
    return (response as Actualite[])?.[0] || null
  } catch (error) {
    console.error("Erreur lors de la récupération de l'actualité:", error)
    return null
  }
}

export async function getTemoignages(): Promise<Temoignage[]> {
  try {
    const response = await directus.request(
      readItems("temoignages", {
        filter: {
          statut: {
            _eq: "published",
          },
        },
        sort: ["ordre"],
        fields: ["*", "photo_client.*"],
      })
    )
    return (response as Temoignage[]) || []
  } catch (error) {
    console.error("Erreur lors de la récupération des témoignages:", error)
    return []
  }
}

export async function getEquipe(): Promise<MembreEquipe[]> {
  try {
    const response = await directus.request(
      readItems("equipe", {
        filter: {
          statut: {
            _eq: "published",
          },
        },
        sort: ["ordre"],
        fields: ["*", "photo.*"],
      })
    )
    return (response as MembreEquipe[]) || []
  } catch (error) {
    console.error("Erreur lors de la récupération de l'équipe:", error)
    return []
  }
}

export async function getCertifications(): Promise<Certification[]> {
  try {
    const response = await directus.request(
      readItems("certifications", {
        filter: {
          statut: {
            _eq: "published",
          },
        },
        sort: ["ordre"],
        fields: ["*", "logo.*"],
      })
    )
    return (response as Certification[]) || []
  } catch (error) {
    console.error("Erreur lors de la récupération des certifications:", error)
    return []
  }
}

export async function getParametresSite(): Promise<ParametresSite | null> {
  try {
    const response = await directus.request(
      readItems("parametres_site", {
        fields: ["*", "logo.*", "favicon.*"],
        limit: 1,
      })
    )
    return (response as ParametresSite[])?.[0] || null
  } catch (error) {
    console.error("Erreur lors de la récupération des paramètres du site:", error)
    return null
  }
}

// Fonction utilitaire pour formater les URLs d'images
export function getImageUrl(file: any, width?: number, height?: number): string {
  if (!file) return ""

  let url = `${DIRECTUS_URL}/assets/${file.id}`
  const params = new URLSearchParams()

  if (width) params.append("width", width.toString())
  if (height) params.append("height", height.toString())

  if (params.toString()) {
    url += `?${params.toString()}`
  }

  return url
}

// Fonction pour formater les dates
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
