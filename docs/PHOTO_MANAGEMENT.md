# Photo Management Guide

## Overview

Dive Barn uses a hybrid approach for photo storage:
- **Festival photos** (archive): Stored in Google Cloud Storage bucket
- **Static assets** (logos, hero images): Stored locally in the repository

This approach balances performance, cost, and repository size.

---

## Cloud Storage Structure

### Bucket: `divebarn-photos-manual`

```
divebarn-photos-manual/
├── 2024/
│   └── katherine-jemima-hamilton/
│       ├── art_installation-1.JPG
│       ├── art_installation-2.JPG
│       └── ... (13 photos total)
└── 2025/
    ├── dana-morrison/
    │   ├── IMG_0510.jpg
    │   ├── IMG_0511.jpg
    │   └── ... (85 photos)
    └── joseph-blake/
        ├── IMG_5437.jpg
        ├── IMG_5439.jpg
        └── ... (34 photos)
```

### URL Format
```
https://storage.googleapis.com/divebarn-photos-manual/{year}/{photographer}/{filename}
```

---

## Local Media Structure

### Current Organization

```
/public/media/
├── hero/                          # Hero/featured images (10 images, ~16MB)
│   ├── IMG_0511.jpg
│   ├── IMG_0513.jpg
│   ├── IMG_0515.jpg
│   ├── IMG_0529.jpg
│   ├── IMG_0568.jpg
│   ├── IMG_0572.jpg
│   ├── IMG_0577.jpg
│   ├── IMG_0583.jpg
│   ├── IMG_0587.jpg
│   └── IMG_0624.jpg
├── logos/                         # Brand assets (should organize here)
│   ├── db-logo-circle.png
│   └── appleicon.png
├── posters/                       # Promotional materials (should organize here)
│   ├── dive-barn-festival-poster.png
│   ├── Website Banner Image 1.png
│   └── grid-of-all-cards.png
├── docs/                          # PDFs and screenshots (should organize here)
│   ├── dive-barn-map.pdf
│   ├── map-screenshot.jpg
│   └── carpooling-screenshot.png
├── favicon.ico
└── apple-touch-icon.png
```

**Note:** The subdirectory organization (logos/, posters/, docs/) is recommended but not yet implemented.

---

## Photo Data Format

### Location
```
src/data/photos/
├── 2024.json
└── 2025.json
```

### JSON Schema
```json
[
  {
    "id": "2024-001",
    "filename": "art_installation-1.JPG",
    "url": "https://storage.googleapis.com/divebarn-photos-manual/2024/katherine-jemima-hamilton/art_installation-1.JPG",
    "photographer": "katherine-jemima-hamilton",
    "categories": ["art_installation"],
    "caption": "Art installation from Dive Barn 2024",
    "year": 2024
  }
]
```

### Fields
- **id**: Unique identifier (format: `{year}-{number}`)
- **filename**: Original filename
- **url**: Full cloud storage URL
- **photographer**: Photographer slug (lowercase, hyphenated)
- **categories**: Array of category tags
- **caption**: Photo description
- **year**: Festival year (2024 | 2025 | ...)

---

## Adding Photos for a New Year

### 1. Prepare Photos
- Collect photos from photographers
- Resize large images (recommended max: 2000px on longest side)
- Optimize file size (aim for <500KB per image)
- Organize by photographer

### 2. Upload to Cloud Storage
```bash
# Using gsutil (Google Cloud SDK)
gsutil cp -r ./photos/2026/photographer-name/* \
  gs://divebarn-photos-manual/2026/photographer-name/
```

### 3. Generate Photo Metadata
Create `src/data/photos/2026.json` with photo metadata:

```json
[
  {
    "id": "2026-001",
    "filename": "photo-name.jpg",
    "url": "https://storage.googleapis.com/divebarn-photos-manual/2026/photographer-name/photo-name.jpg",
    "photographer": "photographer-name",
    "categories": ["category1", "category2"],
    "caption": "Description of the photo",
    "year": 2026
  }
]
```

**Tip:** You can use AI tools to help generate captions and categorize photos.

### 4. Update Code
1. Update `src/data/allPhotos.ts`:
   ```typescript
   import photos2026Data from './photos/2026.json';

   export interface Photo2026 {
     id: string;
     filename: string;
     url: string;
     photographer: 'photographer-name';
     categories: string[];
     caption: string;
     year: 2026;
   }

   const photos2026 = photos2026Data as Photo2026[];

   export const allPhotos: ArchivePhoto[] = [
     ...photos2024.map(...),
     ...photos2025.map(...),
     ...photos2026.map(photo => ({
       ...photo,
       photographer: photo.photographer as string,
     })),
   ];
   ```

2. Update type definitions for year filtering

### 5. Test
```bash
npm run dev
# Visit /archive to verify photos display correctly
```

---

## Categories

Common photo categories used:
- `art_installation` - Art installations and exhibits
- `community_moments` - People gathering, interactions
- `workshops` - Workshop activities
- `performances` - Musical and performance acts
- `nature_landscape` - Venue and natural surroundings
- `vendor_booth` - Food and vendor areas
- `barn_interior` - Inside barn shots
- `barn_exterior` - Outside barn shots
- `morning_camping` - Camping and morning scenes

---

## Best Practices

### Cloud Storage
- ✅ Use cloud for all festival archive photos (100+ images)
- ✅ Organize by year/photographer
- ✅ Use descriptive filenames
- ✅ Keep originals backed up separately

### Local Storage
- ✅ Only keep essential static assets locally
- ✅ Optimize images before committing (use ImageOptim, TinyPNG, etc.)
- ✅ Use hero images (<10 files) for critical above-the-fold content
- ❌ Don't commit large photo archives to git

### Photo Quality
- Target: 1200-2000px on longest side
- Format: JPEG for photos, PNG for logos/graphics
- File size: Aim for <500KB per photo
- Always keep high-res originals archived externally

---

## Troubleshooting

### Photos not loading from cloud
- Check bucket URL is correct
- Verify bucket permissions (should be publicly readable)
- Test URL directly in browser

### Slow page load
- Check image file sizes (should be <500KB)
- Ensure lazy loading is enabled on archive pages
- Consider adding CDN caching headers

### Build errors
- Verify JSON syntax in photo data files
- Check all photo URLs are valid
- Ensure photographer types match interface definitions

---

## Year-End Checklist

When adding a new year's festival:

- [ ] Collect all photos from photographers
- [ ] Resize and optimize images
- [ ] Upload to cloud storage (`gs://divebarn-photos-manual/{year}/{photographer}/`)
- [ ] Create `src/data/photos/{year}.json`
- [ ] Update `src/data/allPhotos.ts` with new year
- [ ] Update year filter types throughout codebase
- [ ] Add year markdown file in `src/content/years/{year}.md`
- [ ] Add artist markdown files in `src/content/artists/`
- [ ] Test archive page displays correctly
- [ ] Update homepage if needed
- [ ] Commit and deploy

---

**Last Updated:** Phase 2 - Photo Management System (2025)
