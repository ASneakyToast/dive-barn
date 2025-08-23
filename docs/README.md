# Dive Barn Festival Website

An annual arts and music festival website for Dive Barn 2025, taking place October 11 on the Yorkville Schoolhouse Ranch in Mendocino County. Built with modern web standards using CSS layers architecture and web components.

## 🎨 Project Overview

Dive Barn is a growing one-day festival that brings together artists and musicians on a ranch in Mendocino County. This website serves as the digital home for the event, featuring:

- Festival information and schedule
- Artist lineups and performances
- RSVP functionality via Partiful
- Financial transparency reporting
- Photo galleries from previous years
- Responsive design with light/dark themes

## 🏗️ Architecture

The project uses a modern CSS layers architecture with design tokens and web components:

- **CSS Layers**: Organized cascade with reset, tokens, components, and utilities
- **Design System**: Token-based theming with semantic color system
- **Web Components**: Reusable UI components without Shadow DOM
- **No Framework**: Vanilla JavaScript and CSS for maximum performance
- **Static Site**: Deployed on Netlify with optimized caching

## 🚀 Quick Start

```bash
# Clone the repository
git clone [your-repo-url]
cd dive-barn

# Install dependencies (if using build tools)
npm install

# Serve locally (any static server)
python -m http.server 8000
# or
npx serve .
# or
live-server .

# Open http://localhost:8000
```

## 📁 Project Structure

```
dive-barn/
├── components/              # Web component library
│   ├── accordion-item/     
│   ├── button/             
│   ├── card/               
│   ├── cta/                
│   ├── floating-button/    
│   ├── footer/             
│   ├── heading/            
│   ├── nav/                
│   ├── table/              
│   ├── theme-switcher/     
│   └── timeline-item/      
├── styles/                  # CSS layers architecture
│   ├── layers/             # Core CSS layers
│   │   ├── reset.css       
│   │   ├── base.css        
│   │   ├── layout.css      
│   │   ├── components.css  
│   │   └── utilities.css   
│   ├── tokens/             # Design tokens
│   │   └── layers/         
│   ├── pages/              # Page-specific styles
│   └── layers.css          # Main entry point
├── media/                  # Images and assets
│   ├── sponsors/           
│   └── year-one/           # 2024 event photos
├── scripts/                
│   └── main.js             
├── docs/                   
│   └── DEPLOYMENT.md       # Deployment guide
├── index.html              # Main festival page
├── schedule.html           # Event schedule
├── financial-transparency.html
├── yorkville-schoolhouse-ranch.html
├── components-demo.html    # Component showcase
└── netlify.toml            # Netlify configuration
```

## 🎨 Design System

### CSS Layers Architecture

The project uses a sophisticated CSS layers system for organized styling:

```css
@layer reset, 
       global-tokens, 
       semantic-tokens, 
       component-tokens, 
       base, layout, components, pages, utilities;
```

### Design Tokens

- **Global Tokens**: Base values (colors, typography, spacing)
- **Semantic Tokens**: Context-aware mappings (primary, secondary, etc.)
- **Component Tokens**: Component-specific values
- **Theme System**: Light/dark mode support

### Theme Switching

The site includes a theme switcher component that toggles between light and dark modes using CSS custom properties and data attributes.

## 🧩 Web Components

All UI components are built as web components for reusability:

### Available Components

- **`<dive-barn-nav>`** - Site navigation with responsive design
- **`<db-button>`** - Styled button with variants and states
- **`<db-card>`** - Content card with image and text
- **`<db-heading>`** - Semantic headings with consistent styling
- **`<db-cta>`** - Call-to-action sections
- **`<db-floating-button>`** - Floating action button (RSVP)
- **`<db-theme-toggle>`** - Light/dark theme switcher
- **`<db-accordion-item>`** - Collapsible content sections
- **`<db-timeline-item>`** - Event timeline entries
- **`<db-table>`** - Styled data tables

### Component Usage

```html
<!-- Button component -->
<db-button variant="primary" size="large">
    RSVP Now
</db-button>

<!-- Card component -->
<db-card 
    image="./media/artist.jpg" 
    title="Artist Name" 
    content="Performance description">
</db-card>

<!-- Navigation -->
<dive-barn-nav></dive-barn-nav>
```

## 🛠️ Development

### Adding New Components

1. Create component directory: `components/my-component/`
2. Add JavaScript: `my-component-component.js`
3. Add styles: `my-component-styles.css`
4. Register in `styles/layers/components.css`
5. Include in `styles/layers.css`

### Working with Styles

- Edit design tokens in `styles/tokens/layers/`
- Use existing tokens via CSS custom properties
- Follow the layer hierarchy for proper cascade
- Test both light and dark themes

### Component Architecture

- No Shadow DOM (for CSS custom property inheritance)
- Event forwarding for accessibility
- Semantic HTML structure
- Progressive enhancement approach

## 🌐 Pages

### Main Pages

- **`index.html`** - Festival homepage with hero, overview, and highlights
- **`schedule.html`** - Detailed event schedule and lineup
- **`financial-transparency.html`** - Budget and financial information
- **`yorkville-schoolhouse-ranch.html`** - Venue information
- **`components-demo.html`** - Design system showcase

### Features

- Responsive design for all screen sizes
- Accessible navigation and content
- SEO-optimized meta tags and structure
- Performance-optimized images and assets
- Progressive enhancement

## 🚀 Deployment

The site is configured for Netlify deployment with:

- Static site hosting
- Security headers
- Optimized caching
- 404 handling
- Build optimization

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for detailed deployment instructions.

### Build Configuration

```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Cache-Control = "public, max-age=31536000"
```

## 🤝 Contributing

### Development Workflow

1. **Setup**: Clone repo and serve locally
2. **Components**: Create reusable web components
3. **Styling**: Use design tokens and CSS layers
4. **Testing**: Test across browsers and themes
5. **Documentation**: Update component examples

### Code Standards

- Use semantic HTML
- Follow existing naming conventions
- Maintain accessibility standards
- Test responsive design
- Validate CSS and HTML

### Component Guidelines

- Self-contained with JS and CSS
- Use design tokens for consistency
- Forward events for accessibility
- Support both themes
- Include usage examples

## 📋 Browser Support

- Chrome 88+
- Firefox 87+
- Safari 14+
- Edge 88+

## 📄 License

ISC License

---

## 🎪 About Dive Barn

Dive Barn is an annual gathering of artists and musicians on the Yorkville Schoolhouse Ranch, a property stewarded by the Henderson/Carlson family. All are welcome to this growing, one-day festival celebrating creativity and community in Mendocino County.

**Next Event**: October 11, 2025

For more information and to RSVP, visit the [festival website](https://partiful.com/e/Ft3EJk5f8OUREaoQKtBo).