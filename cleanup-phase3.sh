#!/bin/bash

# Phase 3 Cleanup Script
# Run this script to remove deprecated files

set -e  # Exit on error

echo "🧹 Phase 3: Cleanup & Future-Proofing"
echo "======================================"
echo ""

# Part 1: Remove deprecated files
echo "Step 1: Removing deprecated files..."

# Remove deprecated constants file
if [ -f "src/utils/constants.ts" ]; then
  rm src/utils/constants.ts
  echo "✓ Removed src/utils/constants.ts"
fi

# Remove unused ArtistPanel component
if [ -f "src/components/ui/ArtistPanel.astro" ]; then
  rm src/components/ui/ArtistPanel.astro
  echo "✓ Removed src/components/ui/ArtistPanel.astro"
fi

# Remove old photo TypeScript files (now using JSON)
if [ -f "src/data/photos2024.ts" ]; then
  rm src/data/photos2024.ts
  echo "✓ Removed src/data/photos2024.ts"
fi

if [ -f "src/data/photos2025.ts" ]; then
  rm src/data/photos2025.ts
  echo "✓ Removed src/data/photos2025.ts"
fi

echo ""
echo "Step 2: Cleaning up legacy folder..."

# Remove legacy HTML files
if [ -d "legacy" ]; then
  echo "⚠️  Found legacy/ directory. Listing contents:"
  ls -la legacy/
  echo ""
  read -p "Delete legacy folder? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf legacy/
    echo "✓ Removed legacy/ directory"
  else
    echo "↷ Skipped legacy/ directory"
  fi
fi

echo ""
echo "Step 3: Verifying build..."
npm run check

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "Next steps:"
echo "1. Update src/drafts/festival-guide.astro to remove old imports"
echo "2. Run: npm run build"
echo "3. Test the site: npm run dev"
