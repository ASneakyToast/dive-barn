# Year-End Checklist: Adding a New Festival Year

This guide walks you through adding a new festival year to the Dive Barn website after each annual event.

---

## Overview

After each festival, you'll need to:
1. Create year metadata
2. Add artist profiles
3. Upload and organize photos
4. Test and deploy

**Estimated Time:** 2-4 hours (depending on number of artists and photos)

---

## Prerequisites

- [ ] Access to Google Cloud Storage bucket (`divebarn-photos-manual`)
- [ ] Festival photos collected and organized by photographer
- [ ] Artist information (names, bios, links)
- [ ] Node.js and Git installed
- [ ] Repository cloned locally

---

## Step 1: Create Year Metadata

### 1.1 Create Year Content File

Create a new markdown file for the festival year:

```bash
# Example for 2026
touch src/content/years/2026.md
```

### 1.2 Add Year Frontmatter

**File:** `src/content/years/2026.md`

```markdown
---
year: 2026
date: "October 10, 2026"
theme: "Your Festival Theme Here"
description: "A brief one-sentence description of this year's festival"
status: "past"  # Use "upcoming" before the festival, "past" after
startTime: "12:00 PM"
endTime: "11:59 PM"
---

Write a longer description of this year's festival here. This will appear on the archive page and individual year page. Include:

- What made this year special
- Notable moments or highlights
- Any unique circumstances
- Community contributions

This content supports **markdown** formatting for emphasis, lists, and links.
```

### 1.3 Schema Reference

The year schema requires these fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `year` | number | ✅ | Festival year (e.g., 2026) |
| `date` | string | ✅ | Full date (e.g., "October 10, 2026") |
| `theme` | string | ✅ | Festival theme |
| `description` | string | ✅ | Brief description |
| `status` | enum | ✅ | "upcoming" or "past" |
| `startTime` | string | ❌ | Event start time |
| `endTime` | string | ❌ | Event end time |

---

## Step 2: Add Artist Profiles

### 2.1 Create Artist Files

For each artist/musician, create a markdown file:

```bash
# Naming convention: YYYY-artist-name.md
touch src/content/artists/2026-artist-name.md
```

**Example:** `src/content/artists/2026-selby-sohn.md`

### 2.2 Add Artist Frontmatter

```markdown
---
name: "Artist Name"
year: 2026
type: "artist"  # Options: "artist" or "musician"
instagram: "https://instagram.com/username"  # Optional
website: "https://example.com"  # Optional
order: 1  # Optional: Display order (lower numbers first)
---

Write the artist's bio here. Include:

- Their practice or musical style
- Background or origin
- Notable works or performances
- What they presented at Dive Barn

Keep it concise but informative (2-4 sentences is ideal).
```

### 2.3 Artist Schema Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Full artist/musician name |
| `year` | number | ✅ | Festival year they participated |
| `type` | enum | ✅ | "artist" or "musician" |
| `instagram` | string | ❌ | Instagram profile URL |
| `website` | string | ❌ | Personal website URL |
| `bio` | string | ❌ | Brief biography |
| `order` | number | ❌ | Display order (default: 0) |

### 2.4 Batch Artist Creation

If you have many artists, use this script template:

```bash
#!/bin/bash

# Create multiple artist files at once
YEAR=2026
ARTISTS=(
  "artist-one"
  "artist-two"
  "musician-three"
)

for artist in "${ARTISTS[@]}"; do
  cat > "src/content/artists/${YEAR}-${artist}.md" <<EOF
---
name: "${artist}"
year: ${YEAR}
type: "artist"
order: 0
---

Bio to be added.
EOF
done
```

---

## Step 3: Upload Photos to Cloud Storage

### 3.1 Organize Photos Locally

Create a folder structure for the year:

```
festival-photos-2026/
└── photographer-name/
    ├── photo-001.jpg
    ├── photo-002.jpg
    └── ...
```

**Photo Requirements:**
- ✅ **Format:** JPG or JPEG
- ✅ **Max size:** 5MB per photo (recommended: 1-2MB)
- ✅ **Resolution:** 1920px wide (max)
- ✅ **Naming:** Descriptive names (e.g., `performance-stage-sunset.jpg`)

### 3.2 Upload to Google Cloud Storage

**Bucket:** `divebarn-photos-manual`

**Structure:** `{year}/{photographer-name}/`

**Using `gsutil` (recommended):**

```bash
# Install Google Cloud SDK first: https://cloud.google.com/sdk/install

# Upload entire photographer folder
gsutil -m cp -r festival-photos-2026/photographer-name \
  gs://divebarn-photos-manual/2026/

# Verify upload
gsutil ls gs://divebarn-photos-manual/2026/photographer-name/
```

**Using Google Cloud Console:**

1. Go to: https://console.cloud.google.com/storage/browser/divebarn-photos-manual
2. Click "Create folder" → Name it `2026`
3. Open `2026` folder
4. Click "Create folder" → Name it `photographer-name`
5. Open `photographer-name` folder
6. Click "Upload files" → Select all photos
7. Wait for upload to complete

### 3.3 Make Photos Public

**Important:** Photos must be publicly accessible.

```bash
# Make all photos in the year publicly readable
gsutil -m acl ch -R -u AllUsers:R gs://divebarn-photos-manual/2026/
```

---

## Step 4: Create Photo Metadata

### 4.1 Create JSON File

Create a new JSON file for the year's photos:

```bash
touch src/data/photos/2026.json
```

### 4.2 Add Photo Metadata

**File:** `src/data/photos/2026.json`

```json
[
  {
    "id": "2026-001",
    "url": "https://storage.googleapis.com/divebarn-photos-manual/2026/photographer-name/photo-001.jpg",
    "alt": "Descriptive alt text for accessibility",
    "photographer": "photographer-name",
    "location": "Yorkville Schoolhouse Ranch",
    "category": "performances"
  },
  {
    "id": "2026-002",
    "url": "https://storage.googleapis.com/divebarn-photos-manual/2026/photographer-name/photo-002.jpg",
    "alt": "Another descriptive alt text",
    "photographer": "photographer-name",
    "location": "Yorkville Schoolhouse Ranch",
    "category": "art-installations"
  }
]
```

**Photo Categories:**
- `performances` - Musical performances, stage shots
- `art-installations` - Art pieces, installations
- `community` - People, gatherings, interactions
- `venue` - Ranch, landscape, infrastructure
- `food` - Food service, communal meals
- `camping` - Camping areas, tents, morning scenes

### 4.3 Generate Metadata Programmatically

For many photos, use this script to generate metadata template:

```bash
#!/bin/bash

YEAR=2026
PHOTOGRAPHER="photographer-name"
BUCKET="divebarn-photos-manual"

# List all photos in bucket
gsutil ls "gs://${BUCKET}/${YEAR}/${PHOTOGRAPHER}/" | while read url; do
  filename=$(basename "$url")
  id="${YEAR}-$(echo $filename | sed 's/\.[^.]*$//')"

  cat <<EOF
{
  "id": "${id}",
  "url": "https://storage.googleapis.com/${BUCKET}/${YEAR}/${PHOTOGRAPHER}/${filename}",
  "alt": "Description needed",
  "photographer": "${PHOTOGRAPHER}",
  "location": "Yorkville Schoolhouse Ranch",
  "category": "uncategorized"
},
EOF
done
```

**Then:**
1. Run script and copy output
2. Paste into `src/data/photos/2026.json`
3. Manually add alt text for each photo
4. Categorize each photo

---

## Step 5: Update Photo Aggregator

### 5.1 Import New Year's Photos

**File:** `src/data/allPhotos.ts`

Add import for the new year:

```typescript
// Add this import
import photos2026Data from './photos/2026.json';

// Existing imports
import photos2024Data from './photos/2024.json';
import photos2025Data from './photos/2025.json';
```

### 5.2 Export Photo Array

Add type assertion and export:

```typescript
// Define type (if not already defined)
export interface Photo2026 {
  id: string;
  url: string;
  alt: string;
  photographer: string;
  location: string;
  category: string;
}

// Add this export
export const photos2026 = photos2026Data as Photo2026[];

// Existing exports
export const photos2024 = photos2024Data as Photo2024[];
export const photos2025 = photos2025Data as Photo2025[];
```

### 5.3 Update Type Definition

**File:** `src/types/photos.ts`

```typescript
export interface Photo2026 {
  id: string;
  url: string;
  alt: string;
  photographer: string;
  location: string;
  category: string;
}
```

---

## Step 6: Update Archive Page

### 6.1 Import New Year's Photos

**File:** `src/pages/archive.astro`

```typescript
---
import { photos2026 } from '../data/allPhotos';

// Existing imports
import { photos2024, photos2025 } from '../data/allPhotos';
---
```

### 6.2 Add Year Section (if needed)

The archive page should automatically include the new year once content collections are created. Verify the year appears by checking:

```typescript
const allYears = await getCollection('years');
// New year should be included here
```

---

## Step 7: Test Locally

### 7.1 Run Type Checking

```bash
npm run check
```

**Verify:**
- ✅ No TypeScript errors
- ✅ Content collections validate
- ✅ Photo types match schemas

### 7.2 Build the Site

```bash
npm run build
```

**Verify:**
- ✅ Build completes successfully
- ✅ No build warnings or errors
- ✅ Check build output for new pages

### 7.3 Test in Browser

```bash
npm run dev
```

**Visit:** `http://localhost:4321`

**Test checklist:**
- [ ] New year appears on homepage (if upcoming)
- [ ] New year appears in archive
- [ ] Artist profiles display correctly
- [ ] Photos load properly
- [ ] All links work (Instagram, websites)
- [ ] Mobile responsiveness
- [ ] Navigation works
- [ ] No console errors

### 7.4 Test Individual Pages

- [ ] `/archive` - New year section appears
- [ ] `/2026` - Individual year page (if route exists)
- [ ] Artist cards show all information
- [ ] Photo gallery displays correctly

---

## Step 8: Deploy

### 8.1 Commit Changes

```bash
# Check status
git status

# Add all new files
git add src/content/years/2026.md
git add src/content/artists/2026-*.md
git add src/data/photos/2026.json
git add src/data/allPhotos.ts
git add src/types/photos.ts

# Commit with clear message
git commit -m "Add Dive Barn 2026 festival content

- Created year metadata and description
- Added 12 artist profiles
- Uploaded 150+ photos to cloud storage
- Created photo metadata JSON
- Updated photo aggregator and types"
```

### 8.2 Push to GitHub

```bash
# Push to main branch (triggers Netlify deployment)
git push origin main
```

### 8.3 Verify Deployment

1. **Check Netlify:** https://app.netlify.com/
   - Build should trigger automatically
   - Wait for "Published" status (~2-5 minutes)

2. **Test production site:** https://divebarn.com
   - Verify all changes appear
   - Test photos load from cloud storage
   - Check all pages work

---

## Step 9: Post-Deployment Checklist

- [ ] Homepage displays correctly
- [ ] Archive page includes new year
- [ ] All artist links work
- [ ] Photos load from cloud storage
- [ ] No broken images or 404 errors
- [ ] Mobile site works correctly
- [ ] Test in multiple browsers (Chrome, Safari, Firefox)
- [ ] Verify SEO meta tags (Open Graph, Twitter cards)

---

## Troubleshooting

### Photos Not Loading

**Issue:** Images return 403 Forbidden or 404 Not Found

**Solution:**
```bash
# Make sure photos are public
gsutil -m acl ch -R -u AllUsers:R gs://divebarn-photos-manual/2026/

# Verify URL format
# Correct: https://storage.googleapis.com/divebarn-photos-manual/2026/photographer/photo.jpg
# Wrong: gs://divebarn-photos-manual/2026/photographer/photo.jpg
```

### Build Errors

**Issue:** TypeScript errors during build

**Solution:**
1. Run `npm run check` to see detailed errors
2. Verify all schema fields are present
3. Check for typos in frontmatter
4. Ensure types match (number vs string, etc.)

### Content Not Appearing

**Issue:** New year or artists don't show on site

**Solution:**
1. Verify files are in correct directories:
   - Years: `src/content/years/`
   - Artists: `src/content/artists/`
2. Check frontmatter YAML is valid (proper indentation, quotes)
3. Verify collection schema matches (`src/content/config.ts`)
4. Clear `.astro` cache: `rm -rf .astro && npm run build`

### Artist Order Wrong

**Issue:** Artists appear in wrong order on archive page

**Solution:**
Add or update the `order` field in artist frontmatter:
```markdown
---
name: "Artist Name"
order: 1  # Lower numbers appear first
---
```

---

## Quick Reference

### File Locations

| What | Where |
|------|-------|
| Year metadata | `src/content/years/YYYY.md` |
| Artist files | `src/content/artists/YYYY-artist-name.md` |
| Photo metadata | `src/data/photos/YYYY.json` |
| Photo aggregator | `src/data/allPhotos.ts` |
| Photo types | `src/types/photos.ts` |
| Archive page | `src/pages/archive.astro` |

### Cloud Storage

| Item | Value |
|------|-------|
| Bucket | `divebarn-photos-manual` |
| Path format | `{year}/{photographer}/` |
| URL format | `https://storage.googleapis.com/divebarn-photos-manual/{year}/{photographer}/{filename}` |

### Commands

```bash
# Development
npm run dev          # Start dev server
npm run check        # Type checking
npm run build        # Build for production

# Cloud Storage
gsutil ls gs://divebarn-photos-manual/2026/                    # List files
gsutil cp -r photos/ gs://divebarn-photos-manual/2026/         # Upload
gsutil acl ch -R -u AllUsers:R gs://divebarn-photos-manual/2026/  # Make public
```

---

## Additional Resources

- **Photo Management Guide:** `docs/PHOTO_MANAGEMENT.md`
- **Architecture Overview:** `docs/ARCHITECTURE.md`
- **Contributing Guide:** `CONTRIBUTING.md`
- **Content Collections Docs:** https://docs.astro.build/en/guides/content-collections/

---

**Need Help?**

- Open an issue on GitHub
- Email: hello@divebarn.com
- Reference the architecture docs for technical details

---

**Last Updated:** October 2025
