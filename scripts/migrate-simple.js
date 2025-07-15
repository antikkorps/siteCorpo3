import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

// Configuration depuis les variables d'environnement
const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Fonction pour convertir un titre en slug
function titleToSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Authentification et récupération du token
async function authenticate() {
  const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    }),
  });

  if (!response.ok) {
    throw new Error(`Erreur authentification: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.data.access_token;
}

// Créer un article dans Directus
async function createArticle(token, article) {
  const response = await fetch(`${DIRECTUS_URL}/items/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erreur création article: ${response.status} ${response.statusText} - ${errorText}`);
  }

  return await response.json();
}

// Migration principale
async function migrateMarkdownToDirectus() {
  try {
    if (!ADMIN_PASSWORD) {
      throw new Error('Variable ADMIN_PASSWORD manquante. Définissez-la dans cms/.env');
    }
    
    console.log('🔐 Authentification...');
    const token = await authenticate();
    console.log('✅ Authentifié avec succès');

    const blogDir = './src/content/blog';
    const files = readdirSync(blogDir).filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
    
    console.log(`📚 Migration de ${files.length} articles...`);
    
    for (const file of files) {
      try {
        const filePath = join(blogDir, file);
        const fileContent = readFileSync(filePath, 'utf-8');
        const { data: frontmatter, content } = matter(fileContent);
        
        // Convertir les données markdown vers le format Directus
        const article = {
          titre: frontmatter.title,
          slug: titleToSlug(frontmatter.title),
          contenu: content,
          extrait: frontmatter.description || '',
          date_publication: frontmatter.pubDate ? new Date(frontmatter.pubDate).toISOString() : new Date().toISOString(),
          date_modification: frontmatter.updatedDate ? new Date(frontmatter.updatedDate).toISOString() : null,
          statut: 'published',
          meta_description: frontmatter.description || '',
          image_hero: frontmatter.heroImage || null,
        };
        
        // Créer l'article dans Directus
        const result = await createArticle(token, article);
        console.log(`✅ Article migré: ${article.titre} (ID: ${result.data.id})`);
        
      } catch (error) {
        console.error(`❌ Erreur migration ${file}:`, error.message);
      }
    }
    
    console.log('🎉 Migration terminée!');
    
  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

// Exécuter la migration
migrateMarkdownToDirectus().catch(console.error);