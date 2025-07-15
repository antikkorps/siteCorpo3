#!/bin/bash

# Script de déploiement automatique pour Directus
# Applique le schéma versionné et démarre le serveur

set -e

echo "🔄 Déploiement du schéma Directus..."

# Vérifier que le fichier de schéma existe
if [ ! -f "schema.yaml" ]; then
    echo "❌ Fichier schema.yaml introuvable"
    exit 1
fi

# Appliquer le schéma
echo "📝 Application du schéma..."
npx directus schema apply --yes ./schema.yaml

echo "✅ Schéma appliqué avec succès"

# Optionnel : démarrer le serveur
if [ "$1" = "--start" ]; then
    echo "🚀 Démarrage du serveur Directus..."
    npx directus start
fi