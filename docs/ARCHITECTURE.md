# Dive Barn Website Architecture

This document provides a comprehensive overview of the Dive Barn website's technical architecture, design systems, and organizational patterns.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [CSS Layers Architecture](#css-layers-architecture)
- [Design Token System](#design-token-system)
- [Content Collections](#content-collections)
- [Component Organization](#component-organization)
- [Data Flow](#data-flow)
- [Photo Management](#photo-management)
- [Routing & Pages](#routing--pages)
- [Build Process](#build-process)
- [Performance Strategy](#performance-strategy)

---

## Overview

The Dive Barn website is built as a static site using Astro.js, prioritizing performance, maintainability, and ease of content management. The architecture emphasizes:

- **Content-driven development** using Astro Content Collections
- **Type-safe TypeScript** throughout
- **Advanced CSS architecture** with CSS Layers
- **Hybrid asset management** (cloud storage + local assets)
- **Static-first rendering** with optional islands for interactivity

---

## Tech Stack

### Core

- **Framework:** Astro.js v5.x
- **Language:** TypeScript 5.x
- **Runtime:** Node.js 18.x+

### Styling

- **CSS Layers** for cascade control
- **CSS Custom Properties** for design tokens
- **No CSS-in-JS** (pure CSS approach)
- **Mobile-first responsive design**

### Content

- **Astro Content Collections** for structured data
- **Markdown** for content authoring
- **Zod schemas** for type validation

### Hosting & Storage

- **Hosting:** Netlify (automatic deployments)
- **Photo Storage:** Google Cloud Storage
- **CDN:** Netlify CDN

### Analytics

- **Google Tag Manager**
- **Google Analytics**

---

## Project Structure

```
dive-barn/
├── docs/                          # Project documentation
│   ├── ARCHITECTURE.md            # This file
│   ├── PHOTO_MANAGEMENT.md        # Photo handling guide
│   ├── YEAR_END_CHECKLIST.md      # Annual update process
│   └── MEDIA_REORGANIZATION_PLAN.md
│
├── public/                        # Static assets (served as-is)
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── media/
│       ├── hero/                  # Critical hero images (10 files)
│       ├── logos/                 # Brand assets
│       ├── posters/               # Promotional materials
│       └── docs/                  # PDFs, screenshots
│
├── src/
│   ├── components/                # Reusable UI components
│   │   ├── layout/               # Navigation, Footer
│   │   ├── ui/                   # Button, Card, Heading, etc.
│   │   └── archive/              # Archive-specific components
│   │
│   ├── config/                    # Centralized configuration
│   │   └── site.ts               # Site config, venue, social, nav
│   │
│   ├── content/                   # Content Collections
│   │   ├── artists/              # Artist markdown files
│   │   ├── schedule/             # Schedule entries
│   │   ├── transparency/         # Financial data
│   │   ├── years/                # Festival metadata by year
│   │   └── config.ts             # Collection schemas (Zod)
│   │
│   ├── data/                      # Data files (non-content)
│   │   ├── photos/               # Photo metadata JSON
│   │   │   ├── 2024.json
│   │   │   └── 2025.json
│   │   └── allPhotos.ts          # Photo data aggregator
│   │
│   ├── layouts/                   # Page layouts
│   │   ├── BaseLayout.astro      # Base HTML structure
│   │   └── ArchiveLayout.astro   # Layout for archive pages
│   │
│   ├── pages/                     # Route pages (file-based routing)
│   │   ├── index.astro           # Homepage
│   │   ├── archive.astro         # Archive hub
│   │   ├── financial-transparency.astro
│   │   └── [year]/               # Dynamic year routes
│   │       └── index.astro
│   │
│   ├── styles/                    # Global styles
│   │   ├── global.css            # Main entry point
│   │   ├── layers/               # CSS layer files
│   │   │   ├── reset.css
│   │   │   ├── base.css
│   │   │   ├── layout.css
│   │   │   ├── components.css
│   │   │   └── utilities.css
│   │   ├── tokens/               # Design tokens
│   │   │   └── layers/
│   │   │       ├── global-tokens.css
│   │   │       ├── semantic-tokens.css
│   │   │       ├── component-tokens.css
│   │   │       └── theme-system.css
│   │   └── pages/                # Page-specific styles
│   │       ├── schedule-styles.css
│   │       └── financial-transparency.css
│   │
│   ├── types/                     # TypeScript type definitions
│   │   ├── photos.ts
│   │   └── site.ts
│   │
│   └── utils/                     # Utility functions
│       └── [various utilities]
│
├── astro.config.mjs               # Astro configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies & scripts
└── README.md                      # Project overview

```

---

## CSS Layers Architecture

The site uses **CSS Cascade Layers** (`@layer`) for predictable, maintainable styling without specificity battles.

### Layer Order

```css
@layer reset,
       global-tokens,
       semantic-tokens,
       component-tokens,
       base,
       layout,
       components,
       pages,
       utilities;
```

**Layers are defined in order of specificity (lowest to highest):**

1. **`reset`** - CSS reset (normalize styles)
2. **`global-tokens`** - Base design tokens (colors, spacing, typography)
3. **`semantic-tokens`** - Contextual tokens (primary, surface, text colors)
4. **`component-tokens`** - Component-specific token overrides
5. **`base`** - Base element styles (typography, links, etc.)
6. **`layout`** - Layout patterns (grid, flex, container)
7. **`components`** - Component styles
8. **`pages`** - Page-specific styles
9. **`utilities`** - Utility classes (highest priority)

### Why CSS Layers?

**Benefits:**
- ✅ **No specificity battles** - Layer order determines cascade, not selector specificity
- ✅ **Clear separation of concerns** - Each layer has a defined purpose
- ✅ **Easy refactoring** - Change styles without worrying about breaking others
- ✅ **Maintainable at scale** - Predictable styling as project grows
- ✅ **Theme customization** - Override tokens without touching component styles

**Example:**
```css
/* Even though .button has low specificity,
   it wins over .nav a because components layer
   comes after base layer */

@layer base {
  a { color: blue; }  /* Specificity: 0,0,1 */
}

@layer components {
  .button { color: red; }  /* Specificity: 0,1,0 but layer wins! */
}
```

### Layer Files

| File | Purpose |
|------|---------|
| `src/styles/layers/reset.css` | CSS reset/normalize |
| `src/styles/layers/base.css` | Base element styles |
| `src/styles/layers/layout.css` | Layout patterns and containers |
| `src/styles/layers/components.css` | Component styles |
| `src/styles/layers/utilities.css` | Utility classes |

---

## Design Token System

The site uses a **three-tier token system** for consistent, themeable design.

### Token Tiers

```
Global Tokens (primitives)
    ↓
Semantic Tokens (contextual meanings)
    ↓
Component Tokens (component-specific overrides)
```

### 1. Global Tokens

**Raw values** - colors, spacing scales, font families

**File:** `src/styles/tokens/layers/global-tokens.css`

```css
@layer global-tokens {
  :root {
    /* Colors */
    --color-gray-50: #f9fafb;
    --color-gray-900: #111827;
    --color-orange-500: #ff7e3a;

    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;

    /* Typography */
    --typography-font-family-base: 'Inter', sans-serif;
    --typography-font-family-display: 'Instrument Serif', serif;
    --typography-font-size-base: 1rem;
    --typography-font-size-lg: 1.125rem;
  }
}
```

### 2. Semantic Tokens

**Contextual meanings** - what colors/spacing mean in context

**File:** `src/styles/tokens/layers/semantic-tokens.css`

```css
@layer semantic-tokens {
  :root {
    /* Surface colors */
    --color-surface: var(--color-gray-50);
    --color-surface-variant: var(--color-gray-100);

    /* Text colors */
    --color-text-primary: var(--color-gray-900);
    --color-text-secondary: var(--color-gray-700);

    /* Action colors */
    --color-primary: var(--color-orange-500);
    --color-primary-hover: var(--color-orange-600);
  }
}
```

### 3. Component Tokens

**Component-specific** - override semantic tokens for specific components

**File:** `src/styles/tokens/layers/component-tokens.css`

```css
@layer component-tokens {
  :root {
    /* Button */
    --button-bg: var(--color-primary);
    --button-text: white;
    --button-padding: var(--spacing-md) var(--spacing-lg);

    /* Card */
    --card-bg: var(--color-surface);
    --card-border-radius: 8px;
    --card-padding: var(--spacing-lg);
  }
}
```

### Theme System

**File:** `src/styles/tokens/layers/theme-system.css`

Supports light/dark themes by overriding semantic tokens:

```css
@layer semantic-tokens {
  [data-theme="dark"] {
    --color-surface: var(--color-gray-900);
    --color-text-primary: var(--color-gray-50);
  }
}
```

---

## Content Collections

Astro Content Collections provide **type-safe, structured content** with Zod schema validation.

### Available Collections

| Collection | Purpose | Schema |
|------------|---------|--------|
| `years` | Festival metadata by year | year, date, theme, status |
| `artists` | Artist profiles | name, year, type, links |
| `schedule` | Event timeline | title, time, performer |
| `transparency` | Financial data | year, category, amount |

### Collection Schemas

**File:** `src/content/config.ts`

```typescript
const yearsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    year: z.number(),
    date: z.string(),
    theme: z.string(),
    description: z.string(),
    status: z.enum(['upcoming', 'past']),
    startTime: z.string().optional(),
    endTime: z.string().optional()
  })
});

const artistsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    year: z.number(),
    type: z.enum(['artist', 'musician']),
    instagram: z.string().optional(),
    website: z.string().optional(),
    bio: z.string().optional(),
    order: z.number().optional()
  })
});
```

### Using Collections

```typescript
import { getCollection } from 'astro:content';

// Get all artists
const allArtists = await getCollection('artists');

// Filter by year
const artists2025 = allArtists.filter(a => a.data.year === 2025);

// Sort by order
const sorted = artists2025.sort((a, b) =>
  (a.data.order || 0) - (b.data.order || 0)
);
```

### Content File Structure

**Example:** `src/content/artists/2025-selby-sohn.md`

```markdown
---
name: "Selby Sohn"
year: 2025
type: "musician"
instagram: "https://instagram.com/selbysohn"
website: "https://selbysohn.com"
order: 1
---

Selby Sohn is a musician based in Oakland...
```

**Benefits:**
- ✅ Type-safe queries
- ✅ Schema validation at build time
- ✅ Easy to add new years/artists
- ✅ Content authored in markdown
- ✅ Frontmatter for structured data, body for long-form content

---

## Component Organization

Components are organized by **function and scope**.

### Directory Structure

```
src/components/
├── layout/          # Site-wide layout components
│   ├── Navigation.astro
│   ├── Footer.astro
│   └── Header.astro
│
├── ui/              # Reusable UI components
│   ├── Button.astro
│   ├── Card.astro
│   ├── Heading.astro
│   ├── Accordion.astro
│   ├── CTA.astro
│   └── ThemeToggle.astro
│
└── archive/         # Archive-specific components
    ├── YearSection.astro
    └── PhotoGrid.astro
```

### Component Patterns

#### 1. Layout Components

**Purpose:** Site-wide structural elements

**Example:** `src/components/layout/Navigation.astro`

```astro
---
import { NAVIGATION_LINKS } from '../../config/site';
const pathname = Astro.url.pathname;
---

<nav class="nav">
  <ul class="nav__list">
    {NAVIGATION_LINKS.map(link => (
      <li>
        <a href={link.href} data-current={pathname === link.href ? 'page' : undefined}>
          {link.label}
        </a>
      </li>
    ))}
  </ul>
</nav>
```

#### 2. UI Components

**Purpose:** Reusable, configurable UI elements

**Example:** `src/components/ui/Button.astro`

```astro
---
interface Props {
  variant?: 'primary' | 'secondary';
  href?: string;
  label: string;
}

const { variant = 'primary', href, label } = Astro.props;
---

<a href={href} class={`button button--${variant}`}>
  {label}
</a>

<style>
  .button {
    /* Component-scoped styles */
  }
</style>
```

#### 3. Page-Specific Components

**Purpose:** Components used on specific pages

**Example:** `src/components/archive/YearSection.astro`

### Component Best Practices

- ✅ **Single Responsibility** - Each component does one thing well
- ✅ **Props Interface** - Define TypeScript interfaces for props
- ✅ **Scoped Styles** - Use `<style>` blocks for component-specific styles
- ✅ **Semantic HTML** - Use proper HTML elements
- ✅ **Accessibility** - Include ARIA labels and keyboard navigation

---

## Data Flow

### Content → Page Flow

```
Content Collections (markdown + frontmatter)
    ↓
Astro queries collections (getCollection())
    ↓
Data transformed/filtered in page frontmatter
    ↓
Data passed to components as props
    ↓
Components render with data
```

### Example: Archive Page

**File:** `src/pages/archive.astro`

```typescript
---
// 1. Query collections
const allYears = await getCollection('years');
const allArtists = await getCollection('artists');

// 2. Transform data
const years = allYears
  .sort((a, b) => b.data.year - a.data.year)
  .slice(0, 2);

// 3. Pass to components
---

<main>
  {years.map(year => (
    <YearSection year={year} artists={allArtists} />
  ))}
</main>
```

### Configuration Flow

```
src/config/site.ts (centralized config)
    ↓
Imported by components/pages
    ↓
Used for site-wide settings
```

**Example:** `src/config/site.ts`

```typescript
export const SITE_CONFIG = {
  title: 'Dive Barn',
  url: 'https://divebarn.com'
};

export const NAVIGATION_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/archive', label: 'Archive' }
];
```

---

## Photo Management

### Hybrid Storage Strategy

- **Cloud Storage** (Google Cloud Storage) - Full photo archives
- **Local Assets** (`/public/media/`) - Critical images (hero, logos)

### Cloud Storage Structure

```
divebarn-photos-manual/
├── 2024/
│   └── katherine-jemima-hamilton/
│       ├── art_installation-1.JPG
│       └── ...
└── 2025/
    └── photographer-name/
        └── ...
```

### Photo Metadata

**Files:** `src/data/photos/*.json`

```json
[
  {
    "id": "photo-001",
    "url": "https://storage.googleapis.com/divebarn-photos-manual/2024/photographer/image.jpg",
    "alt": "Description",
    "photographer": "katherine-jemima-hamilton",
    "location": "Yorkville Schoolhouse Ranch",
    "category": "performances"
  }
]
```

### Photo Data Aggregator

**File:** `src/data/allPhotos.ts`

```typescript
import photos2024Data from './photos/2024.json';
import photos2025Data from './photos/2025.json';

export const photos2024 = photos2024Data as Photo2024[];
export const photos2025 = photos2025Data as Photo2025[];
```

**See:** `docs/PHOTO_MANAGEMENT.md` for full details

---

## Routing & Pages

Astro uses **file-based routing** where files in `src/pages/` automatically become routes.

### Route Structure

```
src/pages/
├── index.astro                 → /
├── archive.astro               → /archive
├── financial-transparency.astro → /financial-transparency
└── [year]/
    └── index.astro             → /2024, /2025, etc.
```

### Dynamic Routes

**File:** `src/pages/[year]/index.astro`

```typescript
---
export async function getStaticPaths() {
  const allYears = await getCollection('years');

  return allYears.map(year => ({
    params: { year: year.data.year.toString() },
    props: { year }
  }));
}

const { year } = Astro.props;
---

<h1>{year.data.theme}</h1>
```

---

## Build Process

### Development

```bash
npm run dev
```

- Starts dev server at `localhost:4321`
- Hot module reloading
- TypeScript checking in editor

### Production Build

```bash
npm run build
```

1. **Type checking** - Validates TypeScript types
2. **Content validation** - Validates collection schemas
3. **Static generation** - Pre-renders all pages
4. **Asset optimization** - Minifies CSS/JS, optimizes images
5. **Output** - Generates `/dist` directory

### Build Output

```
dist/
├── index.html
├── archive/
│   └── index.html
├── 2024/
│   └── index.html
├── 2025/
│   └── index.html
├── _astro/
│   ├── [hashed].css
│   └── [hashed].js
└── media/
    └── [static assets]
```

### Deployment

**Netlify** automatically deploys when pushing to `main` branch:

1. GitHub push triggers webhook
2. Netlify runs `npm run build`
3. Deploys `/dist` to CDN
4. Updates DNS (instant)

---

## Performance Strategy

### Static-First

- **Pre-rendered HTML** - All pages generated at build time
- **No client-side rendering** (unless needed for interactivity)
- **Fast Time to First Byte** (TTFB < 100ms)

### Asset Optimization

- **Cloud storage** - Photos served from Google Cloud CDN
- **Local critical assets** - Hero images, logos bundled for fast loading
- **Lazy loading** - Images below fold lazy-loaded
- **Responsive images** - Multiple sizes served based on viewport

### CSS Optimization

- **CSS Layers** - Better cascade control = less CSS
- **Design tokens** - Reusable values reduce CSS size
- **No CSS-in-JS** - Pure CSS is faster and smaller

### Core Web Vitals Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Bundle Size

- **Minimal JavaScript** - Only where necessary (theme toggle, etc.)
- **No framework bloat** - Astro sends zero JS by default
- **Small CSS** - CSS Layers reduce duplication

---

## Future Architecture Considerations

### Potential Enhancements

1. **API Routes** - Expose data via JSON API endpoints
2. **Image Optimization** - Astro Image service for automatic optimization
3. **View Transitions** - Astro's built-in view transitions for smoother navigation
4. **Islands Architecture** - Add interactive components with React/Vue as needed
5. **Edge Functions** - Dynamic content generation at CDN edge

### Scalability

The current architecture supports:
- ✅ Adding new years indefinitely (content collections)
- ✅ Thousands of photos (cloud storage + JSON metadata)
- ✅ Additional content types (new collections)
- ✅ Multi-language support (potential i18n)

---

## Additional Resources

- **Astro Documentation:** https://docs.astro.build
- **CSS Layers Spec:** https://developer.mozilla.org/en-US/docs/Web/CSS/@layer
- **Content Collections Guide:** https://docs.astro.build/en/guides/content-collections/
- **Photo Management:** `docs/PHOTO_MANAGEMENT.md`
- **Contributing Guide:** `CONTRIBUTING.md`

---

**Last Updated:** October 2025
