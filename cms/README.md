# CMS Directus

## Déploiement du schéma

### Commandes disponibles

```bash
# Réinitialiser complètement la DB
npm run db:reset

# Créer un snapshot du schéma actuel
npm run schema:snapshot

# Appliquer le schéma versionné
npm run schema:apply

# Voir les différences avec le schéma actuel
npm run schema:diff

# Déploiement rapide
npm run deploy
```

### Script de déploiement

```bash
# Appliquer le schéma seulement
./deploy.sh

# Appliquer le schéma et démarrer le serveur
./deploy.sh --start
```

### Réinitialisation manuelle complète

Si vous rencontrez des problèmes avec la base de données :

```bash
# Supprimer la DB et recréer depuis zéro
rm data.db
npx directus bootstrap
npx directus schema apply --yes ./schema.yaml
```

Cette séquence :
1. Supprime la base de données SQLite
2. Recrée la DB avec l'utilisateur admin
3. Applique le schéma versionné

### Workflow recommandé

1. **Développement** : Modifier le schéma via l'interface Directus
2. **Snapshot** : `npm run schema:snapshot` pour capturer les changements
3. **Versioning** : Commiter le fichier `schema.yaml` mis à jour
4. **Déploiement** : `npm run deploy` sur l'environnement cible

### Fichiers versionnés

- `schema.yaml` : Schéma principal (source de vérité)
- `schema-snapshot.yaml` : Snapshots temporaires
- `.env` : Configuration (non versionné)

### Structure de la base

- **Type** : SQLite (`data.db`)
- **Admin** : admin@example.com
- **Collections** : Définies dans `schema.yaml`