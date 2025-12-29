# Contributing to Dive Barn

Thank you for contributing to the Dive Barn Festival website! This guide will help you get started and ensure a smooth collaboration process.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guide](#code-style-guide)
- [Adding Festival Content](#adding-festival-content)
- [Testing & Verification](#testing--verification)
- [Pull Request Process](#pull-request-process)
- [Getting Help](#getting-help)

---

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git
- A code editor (VS Code recommended)

### Setup

1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/dive-barn.git
   cd dive-barn
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the dev server:**
   ```bash
   npm run dev
   ```
5. **Visit** `http://localhost:4321` to see the site

---

## Development Workflow

### Branch Naming

Use descriptive branch names that follow this pattern:

- **Features:** `feature/short-description` (e.g., `feature/add-2026-artists`)
- **Bug fixes:** `fix/short-description` (e.g., `fix/mobile-navigation`)
- **Documentation:** `docs/short-description` (e.g., `docs/update-readme`)
- **Refactoring:** `refactor/short-description` (e.g., `refactor/photo-data`)

### Commit Messages

Write clear, concise commit messages:

```
Add 2026 festival year and artists

- Created year content file for 2026
- Added 12 artist markdown files
- Updated photo metadata
```

**Format:**
- Use present tense ("Add feature" not "Added feature")
- First line: Brief summary (50 characters or less)
- Blank line
- Detailed description with bullet points if needed

### Making Changes

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test thoroughly

3. **Run checks before committing:**
   ```bash
   npm run check    # TypeScript type checking
   npm run build    # Verify build succeeds
   npm run dev      # Test in browser
   ```

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Your descriptive commit message"
   ```

5. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** on GitHub

---

## Code Style Guide

### General Principles

- **Consistency:** Follow existing patterns in the codebase
- **Readability:** Write code that's easy to understand
- **Comments:** Add comments for complex logic, not obvious code
- **Keep it simple:** Avoid over-engineering solutions

### TypeScript

- Use TypeScript for type safety
- Define types in `src/types/` when reusable
- Avoid `any` types whenever possible
- Use interfaces for object shapes

```typescript
// Good
interface Artist {
  name: string;
  year: number;
  type: 'artist' | 'musician';
}

// Avoid
const artist: any = { /* ... */ };
```

### Astro Components

- Use `.astro` extension for Astro components
- Keep component logic in the frontmatter (`---` section)
- Use semantic HTML elements
- Add ARIA labels for accessibility

```astro
---
// Component logic here
import { getCollection } from 'astro:content';
const artists = await getCollection('artists');
---

<section aria-label="Artists showcase">
  <!-- Component markup -->
</section>
```

### CSS

- Follow the CSS Layers architecture (see `docs/ARCHITECTURE.md`)
- Use CSS custom properties (design tokens) from `src/styles/tokens/`
- Avoid inline styles
- Mobile-first responsive design

```css
/* Use tokens */
.button {
  background: var(--color-primary);
  padding: var(--spacing-md);
  font-size: var(--typography-font-size-base);
}

/* Mobile-first */
.container {
  padding: var(--spacing-sm);
}

@media (min-width: 768px) {
  .container {
    padding: var(--spacing-lg);
  }
}
```

### File Organization

```
src/
├── components/       # Reusable components
│   ├── layout/      # Navigation, Footer, etc.
│   ├── ui/          # Buttons, Cards, etc.
│   └── archive/     # Archive-specific components
├── config/          # Site configuration
├── content/         # Content collections (markdown)
├── data/            # JSON data files
├── layouts/         # Page layouts
├── pages/           # Routes (file-based routing)
├── styles/          # Global styles
└── types/           # TypeScript type definitions
```

### Linting & Formatting

This project uses ESLint and Prettier:

```bash
npm run lint         # Check for linting errors
npm run format       # Format code with Prettier
```

---

## Adding Festival Content

### Adding a New Festival Year

See `docs/YEAR_END_CHECKLIST.md` for the complete guide.

**Quick steps:**

1. **Create year metadata file:**
   ```bash
   # Create src/content/years/2026.md
   ```

   ```markdown
   ---
   year: 2026
   date: "October 11, 2026"
   theme: "Your Theme Here"
   description: "A brief description of the festival"
   status: "upcoming"
   startTime: "12:00 PM"
   endTime: "11:59 PM"
   ---

   Full description content here...
   ```

2. **Add artist files:**
   ```bash
   # Create files in src/content/artists/
   # Format: 2026-artist-name.md
   ```

   ```markdown
   ---
   name: "Artist Name"
   year: 2026
   type: "artist"  # or "musician"
   instagram: "https://instagram.com/username"
   website: "https://example.com"
   order: 1
   ---

   Artist bio here...
   ```

3. **Upload photos to Google Cloud Storage:**
   ```bash
   # Bucket: divebarn-photos-manual
   # Path: 2026/{photographer-name}/
   ```

4. **Create photo metadata:**
   ```bash
   # Create src/data/photos/2026.json
   ```

   ```json
   [
     {
       "id": "photo-001",
       "url": "https://storage.googleapis.com/divebarn-photos-manual/2026/photographer/image.jpg",
       "alt": "Description of photo",
       "photographer": "photographer-name",
       "location": "Yorkville Schoolhouse Ranch",
       "category": "performances"
     }
   ]
   ```

5. **Update data aggregator:**
   ```typescript
   // In src/data/allPhotos.ts, add:
   import photos2026Data from './photos/2026.json';
   const photos2026 = photos2026Data as Photo2026[];
   ```

### Adding Individual Artists

1. Create a markdown file: `src/content/artists/YYYY-artist-name.md`
2. Follow the schema defined in `src/content/config.ts`
3. Add frontmatter with name, year, type, and optional links
4. Write a brief bio in the body

### Managing Photos

See `docs/PHOTO_MANAGEMENT.md` for detailed instructions.

**Cloud storage structure:**
```
divebarn-photos-manual/
├── 2024/
│   └── photographer-name/
│       ├── photo1.jpg
│       └── photo2.jpg
├── 2025/
│   └── photographer-name/
│       └── photos...
└── 2026/
    └── photographer-name/
        └── photos...
```

**Photo metadata format:**
```json
{
  "id": "unique-id",
  "url": "https://storage.googleapis.com/.../photo.jpg",
  "alt": "Descriptive alt text",
  "photographer": "photographer-name",
  "location": "Yorkville Schoolhouse Ranch",
  "category": "performances"
}
```

---

## Testing & Verification

### Before Committing

Run these commands to ensure your changes don't break anything:

```bash
# 1. TypeScript type checking
npm run check

# 2. Build the site
npm run build

# 3. Preview the build
npm run preview
```

### Manual Testing Checklist

- [ ] Test on different screen sizes (mobile, tablet, desktop)
- [ ] Check all links work correctly
- [ ] Verify images load properly
- [ ] Test navigation between pages
- [ ] Check console for errors
- [ ] Verify accessibility (keyboard navigation, screen reader support)

### Browser Testing

Test in at least two browsers:
- Chrome/Edge (Chromium)
- Firefox or Safari

### Accessibility

- Use semantic HTML elements
- Add ARIA labels where appropriate
- Ensure keyboard navigation works
- Maintain color contrast ratios (WCAG AA)
- Test with a screen reader if possible

---

## Pull Request Process

### Before Submitting

1. **Update from main:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all checks:**
   ```bash
   npm run check && npm run build
   ```

3. **Test thoroughly in the browser**

### Creating the PR

1. **Push your branch** to your fork
2. **Open a Pull Request** on GitHub
3. **Fill out the PR template:**
   - Clear description of changes
   - Why this change is needed
   - Screenshots (if UI changes)
   - Testing checklist

### PR Description Template

```markdown
## Summary
Brief description of what this PR does

## Changes
- List of specific changes made
- Second change
- Third change

## Testing
- [ ] Ran `npm run check` (no errors)
- [ ] Ran `npm run build` (successful)
- [ ] Tested in browser (works as expected)
- [ ] Tested mobile responsiveness
- [ ] Tested in multiple browsers

## Screenshots
(If applicable, add screenshots of UI changes)

## Related Issues
Closes #123
```

### Review Process

- Maintainers will review your PR
- Address any requested changes
- Once approved, your PR will be merged
- Your changes will be deployed automatically via Netlify

---

## Getting Help

### Documentation

- **Photo Management:** `docs/PHOTO_MANAGEMENT.md`
- **Architecture:** `docs/ARCHITECTURE.md` *(coming soon)*
- **Year-End Checklist:** `docs/YEAR_END_CHECKLIST.md` *(coming soon)*

### Asking Questions

- **GitHub Issues:** Open an issue for bugs or feature requests
- **GitHub Discussions:** Ask questions in discussions
- **Email:** hello@divebarn.com for general inquiries

### Useful Resources

- [Astro Documentation](https://docs.astro.build)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Layers Explainer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)

---

## Code of Conduct

### Be Respectful

- Be kind and courteous to other contributors
- Respect differing viewpoints and experiences
- Give and accept constructive feedback gracefully

### Our Commitment

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of experience level, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.

---

## License

By contributing to Dive Barn, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing to Dive Barn!** 🎨🎵

Your work helps create a better experience for our festival community.
