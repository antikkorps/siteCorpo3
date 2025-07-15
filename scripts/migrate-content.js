import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { createDirectus, rest, createItem, authentication } from '@directus/sdk';

// Configuration Directus
const directus = createDirectus('http://localhost:8055').with(rest());

// Fonction pour convertir un titre en slug
function titleToSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, '') // Supprime les caractères spéciaux
    .trim()
    .replace(/\s+/g, '-'); // Remplace les espaces par des tirets
}

// Fonction pour migrer les articles markdown vers Directus
async function migrateMarkdownToDirecuts() {
  try {
    // Authentification avec l'admin via login
    const loginResponse = await directus.request(
      rest().post('/auth/login', {
        email: 'admin@example.com',
        password: 'Franckgabriellouise7'
      })
    );
    
    console.log('✅ Authentifié avec Directus');
    
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
        const result = await directus.request(createItem('articles', article));
        console.log(`✅ Article migré: ${article.titre} (ID: ${result.id})`);
        
      } catch (error) {
        console.error(`❌ Erreur migration ${file}:`, error.message || error);
        console.error('Détails:', error);
      }
    }
    
    console.log('🎉 Migration terminée!');
    
  } catch (authError) {
    console.error('❌ Erreur d\'authentification:', authError.message || authError);
    console.error('Assurez-vous que Directus est démarré sur http://localhost:8055');
  }
}

// Exécuter la migration
migrateMarkdownToDirecuts().catch(console.error);