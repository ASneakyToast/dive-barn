# Dive Barn Festival Website

Annual arts and music gathering on the Yorkville Schoolhouse Ranch in Mendocino County, California.

**Live Site:** [divebarn.com](https://divebarn.com)

---

## 🎨 About

Dive Barn is a free, community-funded annual festival celebrating art, music, and creativity in a stunning rural setting. This website serves as the central hub for festival information, artist showcases, photo archives, and transparency reporting.

### Key Features

- 📅 Dynamic content collections for years and artists
- 🖼️ Photo archive with cloud storage integration
- 💰 Financial transparency reporting
- 📱 Fully responsive design
- ⚡ Performance-optimized static site
- 🎨 Advanced CSS layers architecture
- ♿ Accessibility-focused components

---

## 🚀 Tech Stack

- **Framework:** [Astro.js](https://astro.build) v5.x
- **Language:** TypeScript
- **Styling:** CSS Layers architecture
- **Content:** Astro Content Collections
- **Hosting:** Netlify
- **Photo Storage:** Google Cloud Storage
- **Analytics:** Google Tag Manager, Google Analytics

---

## 📁 Project Structure

```
dive-barn/
├── docs/                          # Project documentation
│   ├── PHOTO_MANAGEMENT.md       # Photo handling guide
│   ├── MEDIA_REORGANIZATION_PLAN.md
│   └── ARCHITECTURE.md           # System architecture
├── public/                        # Static assets
│   └── media/
│       ├── hero/                  # Hero/featured images
│       ├── logos/                 # Brand assets
│       ├── posters/               # Promotional materials
│       └── docs/                  # PDFs, screenshots
├── src/
│   ├── components/                # Reusable components
│   │   ├── layout/               # Navigation, Footer
│   │   ├── ui/                   # UI components
│   │   └── archive/              # Archive-specific
│   ├── config/                    # Site configuration
│   │   └── site.ts               # Centralized config
│   ├── content/                   # Content collections
│   │   ├── artists/              # Artist markdown files
│   │   ├── schedule/             # Schedule entries
│   │   ├── transparency/         # Financial data
│   │   ├── years/                # Festival metadata
│   │   └── config.ts             # Collection schemas
│   ├── data/                      # Data files
│   │   └── photos/               # Photo metadata JSON
│   ├── layouts/                   # Page layouts
│   ├── pages/                     # Route pages
│   ├── styles/                    # Global styles
│   │   ├── layers/               # CSS layer files
│   │   └── tokens/               # Design tokens
│   └── types/                     # TypeScript types
├── astro.config.mjs              # Astro configuration
└── package.json                   # Dependencies
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dive-barn.git
cd dive-barn

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see the site.

### Available Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview built site locally |
| `npm run check` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

---

## 📝 Content Management

### Adding a New Festival Year

See [docs/YEAR_END_CHECKLIST.md](./docs/YEAR_END_CHECKLIST.md) for the complete guide.

**Quick overview:**
1. Create year markdown file in `src/content/years/`
2. Add artist files to `src/content/artists/`
3. Upload photos to Google Cloud Storage
4. Create photo metadata JSON in `src/data/photos/`
5. Update `src/data/allPhotos.ts`
6. Test and deploy

### Managing Photos

See [docs/PHOTO_MANAGEMENT.md](./docs/PHOTO_MANAGEMENT.md) for details on:
- Cloud storage structure
- Photo optimization guidelines
- Metadata format
- Upload procedures

### Content Collections

This site uses Astro Content Collections for structured content:

- **Years** (`src/content/years/`): Festival metadata by year
- **Artists** (`src/content/artists/`): Artist profiles with links
- **Schedule** (`src/content/schedule/`): Event timeline entries
- **Transparency** (`src/content/transparency/`): Financial data

Each collection has TypeScript schemas defined in `src/content/config.ts`.

---

## 🎨 Architecture

### CSS Layers System

The site uses a sophisticated CSS layers architecture for predictable cascade control:

```css
@layer reset, global-tokens, semantic-tokens, component-tokens,
       base, layout, components, pages, utilities;
```

This ensures:
- No specificity battles
- Clear separation of concerns
- Easy theme customization
- Maintainable styles at scale

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for details.

### Design Tokens

Three-tier token system:
- **Global tokens:** Base values (colors, spacing, typography)
- **Semantic tokens:** Contextual meanings (primary, surface, text)
- **Component tokens:** Component-specific overrides

---

## 🚀 Deployment

The site is automatically deployed to Netlify on pushes to `main` branch.

**Build settings:**
- Build command: `npm run build`
- Publish directory: `dist/`
- Node version: 18.x

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

---

## 🤝 Contributing

We welcome contributions from volunteers! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm run check`)
5. Commit with clear message
6. Push and open a Pull Request

### Development Workflow

- All changes should pass `npm run check` before committing
- Follow existing code style (enforced by ESLint + Prettier)
- Add appropriate comments for complex logic
- Update documentation for significant changes

---

## 📊 Performance

The site is optimized for:
- ✅ Fast initial load (<2s on 3G)
- ✅ Minimal JavaScript runtime
- ✅ Optimized images (lazy-loaded, responsive)
- ✅ Excellent Lighthouse scores
- ✅ Accessibility (WCAG AA compliance)

**Core Web Vitals targets:**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

---

## 📄 License

[Add your license here - MIT, Apache 2.0, etc.]

---

## 🙏 Acknowledgments

Special thanks to:
- Eric Carlson & Barbara Henderson (Yorkville Schoolhouse Ranch)
- All contributing artists and musicians
- Festival volunteers and supporters
- Quality Time (design)
- Off Hours (curation)

---

## 📞 Contact

- Website: [divebarn.com](https://divebarn.com)
- Email: hello@divebarn.com
- Instagram: [@divebarnfestival](https://instagram.com/divebarnfestival) _(if applicable)_

---

**Made with ❤️ for the Dive Barn community**
