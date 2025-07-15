import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// Collection pour les fichiers markdown (legacy)
const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
	}),
});

// Schema pour les articles Directus (pour la validation TypeScript)
export const directusArticleSchema = z.object({
	id: z.number(),
	titre: z.string(),
	slug: z.string(),
	contenu: z.string(),
	extrait: z.string().optional(),
	date_publication: z.string(),
	date_modification: z.string().optional(),
	statut: z.enum(['published', 'draft', 'archived']),
	image_hero: z.string().optional(),
	meta_description: z.string().optional(),
	tags: z.array(z.string()).optional(),
});

export const collections = { blog };
