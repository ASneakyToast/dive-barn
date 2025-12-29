# Media Directory Reorganization Plan

## Goal
Organize `/public/media/` into clean subdirectories for better maintainability.

---

## Step 1: Create Subdirectories

```bash
cd /Users/joellithgow/Code/Personal/dive-barn/public/media
mkdir -p logos posters docs
```

---

## Step 2: Move Files to Subdirectories

### Logos (brand assets)
```bash
mv db-logo-circle.png logos/
mv appleicon.png logos/
mv lady.png logos/
```

### Posters (promotional materials)
```bash
mv dive-barn-festival-poster.png posters/
mv "Website Banner Image 1.png" posters/
mv grid-of-all-cards.png posters/
mv schedule-hero.png posters/
mv "Selected Photo 2 1.png" posters/
```

### Docs (PDFs and screenshots)
```bash
mv dive-barn-map.pdf docs/
mv map-screenshot.jpg docs/
mv carpooling-screenshot.png docs/
mv hero-attendee-info.jpg docs/
```

### Keep at Root Level
- `favicon.ico`
- `apple-touch-icon.png`
- `hero/` directory (already organized)
- `sponsors/` directory (if exists)

---

## Step 3: Update File References in Code

### Files to Update:

#### 1. `src/components/layout/Navigation.astro`
**Find:**
```astro
<img src="/media/db-logo-circle.png" alt="Dive Barn Logo" class="nav__logo-image nav__logo-image--auto-spin">
```
```astro
<img src="/media/appleicon.png" alt="Apple Icon" class="nav__secondary-logo-image"
```

**Replace with:**
```astro
<img src="/media/logos/db-logo-circle.png" alt="Dive Barn Logo" class="nav__logo-image nav__logo-image--auto-spin">
```
```astro
<img src="/media/logos/appleicon.png" alt="Apple Icon" class="nav__secondary-logo-image"
```

#### 2. `src/pages/financial-transparency.astro`
**Find:**
```astro
<img src="/media/Selected Photo 2 1.png" alt="Dive Barn community moments" class="support-image">
```

**Replace with:**
```astro
<img src="/media/posters/Selected Photo 2 1.png" alt="Dive Barn community moments" class="support-image">
```

#### 3. `src/drafts/festival-guide.astro`
**Find:**
```astro
import heroImage from '../../public/media/hero-attendee-info.jpg';
import mapScreenshot from '../../public/media/map-screenshot.jpg';
```

**Replace with:**
```astro
import heroImage from '../../public/media/docs/hero-attendee-info.jpg';
import mapScreenshot from '../../public/media/docs/map-screenshot.jpg';
```

#### 4. Search for any other references
Run these searches to find any other files that might reference the moved files:

```bash
# Search for references to moved files
grep -r "db-logo-circle" src/
grep -r "appleicon.png" src/
grep -r "lady.png" src/
grep -r "dive-barn-festival-poster" src/
grep -r "Website Banner" src/
grep -r "grid-of-all-cards" src/
grep -r "schedule-hero" src/
grep -r "Selected Photo 2" src/
grep -r "dive-barn-map.pdf" src/
grep -r "map-screenshot" src/
grep -r "carpooling-screenshot" src/
grep -r "hero-attendee-info" src/
```

Update any additional references found.

---

## Step 4: Update `.gitignore` (if needed)

Check if there are any patterns that should exclude certain media files. Current structure should be fine, but verify:

```bash
cat .gitignore | grep media
```

---

## Step 5: Test

```bash
# Run dev server
npm run dev

# Visit these pages and verify images load:
# - Homepage (/) - check navigation logos
# - Archive (/archive) - check hero images still work
# - Financial Transparency (/financial-transparency) - check support image
# - Festival Guide (/drafts/festival-guide) - if published

# Run build to ensure no errors
npm run build
```

---

## Step 6: Verify Final Structure

```bash
tree public/media -L 2
```

**Expected output:**
```
public/media/
├── apple-touch-icon.png
├── favicon.ico
├── docs/
│   ├── carpooling-screenshot.png
│   ├── dive-barn-map.pdf
│   ├── hero-attendee-info.jpg
│   └── map-screenshot.jpg
├── hero/
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
├── logos/
│   ├── appleicon.png
│   ├── db-logo-circle.png
│   └── lady.png
├── posters/
│   ├── dive-barn-festival-poster.png
│   ├── grid-of-all-cards.png
│   ├── schedule-hero.png
│   ├── Selected Photo 2 1.png
│   └── Website Banner Image 1.png
└── sponsors/
    └── [sponsor files if they exist]
```

---

## Expected Benefits

- ✅ Cleaner media directory organization
- ✅ Easier to find and manage assets by type
- ✅ Better scalability for future media additions
- ✅ Clearer separation between logos, posters, and documentation

---

## Rollback Plan (if something breaks)

```bash
cd /Users/joellithgow/Code/Personal/dive-barn/public/media

# Move everything back to root
mv logos/* .
mv posters/* .
mv docs/* .

# Remove empty directories
rmdir logos posters docs

# Revert code changes via git
git checkout src/
```

---

## Notes for Executing Agent

- Be careful with file names containing spaces (use quotes)
- Update ALL references found in grep searches
- Test thoroughly before considering complete
- Check both dev server and build output
- Verify all pages that use media assets

---

**Status:** Ready for execution
**Estimated Time:** 10-15 minutes
**Risk Level:** Low (easy to rollback)
