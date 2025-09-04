# Project Requirements Document
# Dive Barn Festival Website Migration to Astro.js

**Version:** 1.0  
**Date:** September 1, 2025  
**Project:** Dive Barn Festival Website  
**Scope:** Migration from static HTML to Astro.js framework  

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Current Architecture Analysis](#current-architecture-analysis)
3. [Technical Requirements](#technical-requirements)
4. [Migration Strategy](#migration-strategy)
5. [Timeline and Phases](#timeline-and-phases)
6. [Risk Assessment](#risk-assessment)
7. [Success Metrics](#success-metrics)
8. [Appendix](#appendix)

---

## Executive Summary

### Project Overview
The Dive Barn Festival website currently operates as a high-performance static HTML site with an excellent CSS layers architecture and custom Web Components. This PRD outlines the migration to Astro.js to modernize the development workflow while preserving the site's performance-first approach and design system excellence.

### Goals
- **Maintainability**: Reduce HTML duplication across 5 pages through component-based architecture
- **Developer Experience**: Add TypeScript, build tooling, and modern development workflow
- **Performance**: Maintain current excellent performance while adding build-time optimizations
- **SEO**: Implement automatic meta tag generation and structured data
- **Scalability**: Enable easier content updates and future feature additions

### Key Benefits
- Zero-JavaScript runtime maintained where appropriate
- Build-time optimizations and asset bundling
- Component reusability and type safety
- Automatic SEO and social media optimization
- Streamlined deployment pipeline

---

## Current Architecture Analysis

### Strengths of Current Implementation

#### 1. CSS Layers Architecture
The site employs a sophisticated CSS layers cascade system:
```css
/* styles/layers.css */
@layer reset, tokens.global, tokens.semantic, tokens.component, base, layout, components, utilities;
```

**Benefits:**
- Clear separation of concerns with predictable cascade order
- Three-tier design token system (global → semantic → component)
- Excellent maintainability and scalability
- Modern CSS approach with custom properties

#### 2. Web Components System
Custom elements with proper encapsulation:
- `<dive-barn-nav>` - Responsive navigation with theme awareness
- `<db-theme-toggle>` - Dark/light mode switcher
- `<db-floating-button>` - RSVP call-to-action
- `<db-heading>`, `<db-card>`, `<db-button>` - Design system components

**Benefits:**
- Reusable, encapsulated components
- Accessibility-first approach with proper ARIA labels
- Vanilla JavaScript for minimal runtime overhead

#### 3. Performance Characteristics
- **Minimal JavaScript**: Only interactive components load JS
- **Optimized Assets**: Strategic font loading and image optimization
- **CSS-Only Animations**: Smooth interactions without JavaScript
- **Progressive Enhancement**: Works without JavaScript enabled

### Current Limitations

#### 1. Development Workflow
- **Manual HTML Management**: 5 separate HTML files with duplicated structure
- **No Build Process**: Missing optimization, bundling, and asset processing
- **Content Updates**: Require manual HTML editing across multiple files
- **No Type Safety**: Vanilla JavaScript without TypeScript benefits

#### 2. SEO and Content Management
- **Manual Meta Tags**: Requires updating each page individually
- **No Structured Data**: Missing JSON-LD for event information
- **Static Content**: Schedule and event data embedded in HTML
- **Limited Social Sharing**: Basic Open Graph implementation

#### 3. Scalability Concerns
- **Code Duplication**: Navigation and layout repeated across pages
- **Maintenance Overhead**: Changes require updates to multiple files
- **Asset Management**: Manual optimization and versioning

---

## Technical Requirements

### Astro.js Project Architecture

#### Recommended Project Structure
```
src/
├── components/
│   ├── ui/                    # Design system components
│   │   ├── Button.astro      # Convert from db-button web component
│   │   ├── Card.astro        # Convert from db-card web component
│   │   ├── Heading.astro     # Convert from db-heading web component
│   │   ├── ThemeToggle.astro # Convert from db-theme-toggle
│   │   └── FloatingButton.astro
│   ├── layout/               # Layout components
│   │   ├── BaseLayout.astro  # Shared HTML structure
│   │   ├── Navigation.astro  # Convert from dive-barn-nav
│   │   └── Footer.astro      # Extract from current HTML
│   └── sections/             # Page sections
│       ├── Hero.astro        # Festival hero section
│       ├── Festival.astro    # Festival overview
│       ├── Schedule.astro    # Schedule display
│       └── FAQ.astro         # FAQ accordion
├── content/
│   ├── config.ts            # Content collections schema
│   ├── schedule/            # Schedule data as Markdown
│   │   ├── 2025-lineup.md
│   │   └── venue-info.md
│   └── transparency/        # Financial data
│       └── 2025-budget.md
├── layouts/
│   └── BaseLayout.astro     # Main layout wrapper
├── pages/
│   ├── index.astro          # Convert from index.html
│   ├── schedule.astro       # Convert from schedule.html
│   ├── financial-transparency.astro
│   ├── yorkville-schoolhouse-ranch.astro
│   └── components-demo.astro
├── styles/
│   ├── tokens/              # Preserve existing design tokens
│   │   ├── global-tokens.css
│   │   ├── semantic-tokens.css
│   │   └── component-tokens.css
│   ├── layers/              # Preserve CSS layers
│   │   ├── reset.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── utilities.css
│   └── global.css           # Main stylesheet import
├── utils/
│   ├── constants.ts         # Site configuration
│   └── helpers.ts           # Utility functions
└── types/
    └── index.ts             # TypeScript definitions
```

#### Configuration Requirements

**Astro Configuration (`astro.config.mjs`)**
```javascript
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/static';

export default defineConfig({
  output: 'static',
  adapter: netlify(),
  build: {
    inlineStylesheets: 'auto',
    assets: 'assets'
  },
  vite: {
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        browserslist: '> 0.5%, last 2 versions, Firefox ESR, not dead'
      }
    }
  },
  image: {
    service: 'astro/assets/services/sharp'
  }
});
```

**Package Configuration**
```json
{
  "name": "dive-barn-astro",
  "version": "2.0.0",
  "description": "Dive Barn festival website built with Astro.js",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "lint": "eslint src --ext .ts,.astro",
    "format": "prettier --write src"
  },
  "dependencies": {
    "astro": "^4.0.0",
    "@astrojs/netlify": "^5.0.0",
    "@astrojs/check": "^0.3.0",
    "typescript": "^5.0.0"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "prettier-plugin-astro": "^0.12.0"
  }
}
```

### Component Migration Strategy

#### Web Component to Astro Component Translation

**Current Web Component Pattern:**
```javascript
// components/button/button-component.js
class DBButton extends HTMLElement {
    connectedCallback() {
        const variant = this.getAttribute('variant') || 'primary';
        this.innerHTML = `
            <button class="db-button db-button--${variant}">
                ${this.textContent}
            </button>
        `;
    }
}
customElements.define('db-button', DBButton);
```

**Astro Component Translation:**
```astro
---
// src/components/ui/Button.astro
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'normal' | 'large';
  disabled?: boolean;
  href?: string;
  loading?: boolean;
  class?: string;
}

const { 
  variant = 'primary', 
  size = 'normal', 
  disabled, 
  href, 
  loading,
  class: className,
  ...rest 
} = Astro.props;

const Component = href ? 'a' : 'button';
const classes = [
  'db-button',
  `db-button--${variant}`,
  `db-button--${size}`,
  loading && 'db-button--loading',
  className
].filter(Boolean).join(' ');
---

<Component 
  class={classes}
  disabled={disabled}
  href={href}
  {...loading && { 'aria-busy': 'true' }}
  {...rest}
>
  {loading && <span class="db-button__spinner" aria-hidden="true"></span>}
  <slot />
</Component>

<style>
  /* Component-specific styles if needed */
  .db-button--loading {
    position: relative;
    color: transparent;
  }
  
  .db-button__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: currentColor;
  }
</style>
```

#### Interactive Component Hydration

**Theme Toggle Component:**
```astro
---
// src/components/ui/ThemeToggle.astro
---

<button 
  id="theme-toggle"
  class="theme-toggle"
  aria-label="Toggle dark mode"
  data-theme-toggle
>
  <span class="theme-toggle__icon" aria-hidden="true">
    <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24">
      <!-- Sun SVG -->
    </svg>
    <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24">
      <!-- Moon SVG -->
    </svg>
  </span>
</button>

<script>
  // Client-side JavaScript for theme switching
  class ThemeToggle {
    constructor() {
      this.init();
    }

    init() {
      const toggle = document.querySelector('[data-theme-toggle]');
      if (!toggle) return;

      toggle.addEventListener('click', this.handleToggle.bind(this));
      this.updateIcon();
    }

    handleToggle() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      this.updateIcon();
      
      // Dispatch custom event for other components
      document.dispatchEvent(new CustomEvent('themechange', {
        detail: { theme: newTheme }
      }));
    }

    updateIcon() {
      const theme = document.documentElement.getAttribute('data-theme');
      const toggle = document.querySelector('[data-theme-toggle]');
      
      toggle?.classList.toggle('theme-toggle--dark', theme === 'dark');
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ThemeToggle());
  } else {
    new ThemeToggle();
  }
</script>
```

### CSS Architecture Preservation

The existing CSS layers system will be preserved and enhanced:

**Global Styles Integration:**
```css
/* src/styles/global.css */
@import url('./tokens/global-tokens.css') layer(tokens.global);
@import url('./tokens/semantic-tokens.css') layer(tokens.semantic);
@import url('./tokens/component-tokens.css') layer(tokens.component);
@import url('./layers/reset.css') layer(reset);
@import url('./layers/base.css') layer(base);
@import url('./layers/layout.css') layer(layout);
@import url('./layers/components.css') layer(components);
@import url('./layers/utilities.css') layer(utilities);

@layer tokens.global, tokens.semantic, tokens.component, reset, base, layout, components, utilities;
```

**Component Style Integration:**
Astro components can include scoped styles while leveraging the global token system:

```astro
---
// Component frontmatter
---

<div class="festival-hero">
  <slot />
</div>

<style>
  .festival-hero {
    background: var(--color-surface-primary);
    padding: var(--space-section);
    border-radius: var(--radius-large);
  }
  
  /* Scoped component styles that won't leak globally */
  .festival-hero :global(.hero__title) {
    font-size: var(--font-size-hero);
  }
</style>
```

### SEO and Metadata Enhancement

**Dynamic Meta Tag Generation:**
```astro
---
// src/layouts/BaseLayout.astro
interface Props {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article' | 'event';
  date?: string;
}

const { title, description, image, type = 'website', date } = Astro.props;
const siteTitle = 'Dive Barn 2025 - Annual Arts Festival';
const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const socialImage = image ? new URL(image, Astro.site) : new URL('/images/dive-barn-social.jpg', Astro.site);
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>{fullTitle}</title>
  <meta name="title" content={fullTitle}>
  <meta name="description" content={description}>
  <link rel="canonical" href={canonicalURL}>
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={type}>
  <meta property="og:url" content={canonicalURL}>
  <meta property="og:title" content={fullTitle}>
  <meta property="og:description" content={description}>
  <meta property="og:image" content={socialImage}>
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content={canonicalURL}>
  <meta property="twitter:title" content={fullTitle}>
  <meta property="twitter:description" content={description}>
  <meta property="twitter:image" content={socialImage}>
  
  <!-- Event Structured Data -->
  {type === 'event' && (
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MusicEvent",
        "name": "Dive Barn 2025",
        "startDate": "2025-10-11T10:00:00-07:00",
        "endDate": "2025-10-11T23:00:00-07:00",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": "Yorkville Schoolhouse Ranch",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Mendocino County",
            "addressRegion": "CA",
            "addressCountry": "US"
          }
        },
        "image": socialImage.href,
        "description": description,
        "offers": {
          "@type": "Offer",
          "url": "https://partiful.com/e/Ft3EJk5f8OUREaoQKtBo",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "validFrom": date
        }
      })}
    </script>
  )}
  
  <!-- Fonts and Styles -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  <slot />
</body>
</html>
```

---

## Migration Strategy

### Phase 1: Foundation Setup (Week 1-2)

#### Week 1: Project Initialization
**Day 1-2: Environment Setup**
- Initialize new Astro project with TypeScript
- Configure build tools, linting, and formatting
- Set up development and deployment scripts
- Create Git branch for migration work

**Day 3-5: CSS Architecture Migration**
- Copy existing CSS layers and token system
- Test CSS layers browser compatibility
- Set up Astro global styles import
- Verify design token inheritance

#### Week 2: Base Layout and Components
**Day 1-3: Layout Components**
- Create `BaseLayout.astro` with meta tag generation
- Build `Navigation.astro` component from existing web component
- Extract and create `Footer.astro` component
- Implement theme toggle functionality

**Day 4-5: Design System Components**
- Convert `db-button` to `Button.astro`
- Convert `db-card` to `Card.astro`  
- Convert `db-heading` to `Heading.astro`
- Create TypeScript interfaces for all component props

### Phase 2: Component Migration (Week 3-5)

#### Week 3: Interactive Components
**Day 1-2: Theme System**
- Implement client-side theme toggle with hydration
- Test theme persistence and system preference detection
- Ensure theme switching works across all pages

**Day 3-5: Navigation and Interactive Elements**
- Convert navigation web component to Astro with islands
- Implement floating RSVP button component
- Add client-side hydration for interactive elements
- Test mobile navigation functionality

#### Week 4: Content Components
**Day 1-3: Section Components**
- Create `Hero.astro` for festival landing section
- Build `Schedule.astro` component for event timeline
- Create `FAQ.astro` with accordion functionality
- Implement `Gallery.astro` for venue photos

**Day 4-5: Specialized Components**
- Build `FinancialTable.astro` for transparency data
- Create `VenueInfo.astro` for ranch details
- Implement `ContactForm.astro` if needed
- Add loading states and error handling

#### Week 5: Content Collections
**Day 1-3: Data Structure**
- Set up content collections for schedule data
- Create Markdown files for event information
- Implement content validation schemas
- Test content querying and display

**Day 4-5: Dynamic Content**
- Generate schedule pages from content collections
- Implement content-based navigation
- Add search and filtering capabilities
- Test content updates workflow

### Phase 3: Page Migration (Week 6-7)

#### Week 6: Core Pages
**Day 1-2: Homepage Migration**
- Convert `index.html` to `index.astro`
- Implement hero section with dynamic content
- Add festival overview and call-to-action sections
- Test responsive design and accessibility

**Day 3-5: Secondary Pages**
- Convert `schedule.html` to `schedule.astro`
- Migrate `financial-transparency.html` to Astro
- Convert `yorkville-schoolhouse-ranch.html`
- Test inter-page navigation and linking

#### Week 7: SEO and Optimization
**Day 1-3: SEO Implementation**
- Add structured data for event information
- Implement automatic sitemap generation
- Optimize meta tags for each page
- Test social media sharing functionality

**Day 4-5: Performance Optimization**
- Implement image optimization and lazy loading
- Add critical CSS inlining
- Configure asset bundling and compression
- Run performance audits and optimizations

### Phase 4: Testing and Deployment (Week 8-9)

#### Week 8: Quality Assurance
**Day 1-2: Functional Testing**
- Cross-browser compatibility testing
- Mobile responsiveness verification
- Accessibility audit with automated tools
- Manual accessibility testing with screen readers

**Day 3-5: Performance Testing**
- Lighthouse performance audits
- WebPageTest analysis
- Core Web Vitals measurement
- Bundle size analysis and optimization

#### Week 9: Deployment and Launch
**Day 1-3: Deployment Setup**
- Configure Netlify build and deployment
- Set up environment variables and secrets
- Test staging deployment
- Set up monitoring and analytics

**Day 4-5: Go-Live**
- Final content verification
- DNS cutover to new site
- Monitor for issues post-launch
- Document deployment process

---

## Risk Assessment

### High Risk Items

#### 1. CSS Layers Browser Compatibility
**Risk Level:** High  
**Impact:** Visual design breakage in older browsers  
**Probability:** Medium (CSS layers support ~85% globally)

**Mitigation Strategies:**
- Implement PostCSS fallbacks for non-supporting browsers
- Use feature detection to load alternative stylesheets
- Test thoroughly in target browser matrix
- Provide graceful degradation path

**Contingency Plan:**
- Convert CSS layers to traditional cascade if issues arise
- Maintain layer organization in build process
- Use CSS custom properties as fallback mechanism

#### 2. Interactive Component Hydration Issues
**Risk Level:** High  
**Impact:** Theme toggle, navigation, and other interactive elements fail  
**Probability:** Medium

**Mitigation Strategies:**
- Thoroughly test island hydration in different scenarios
- Implement Progressive Enhancement approach
- Use `client:visible` directive for below-fold components
- Maintain vanilla JavaScript fallbacks

**Contingency Plan:**
- Revert to vanilla web components if hydration fails
- Use traditional JavaScript inclusion method
- Implement manual component initialization

#### 3. Build Process Complexity
**Risk Level:** Medium  
**Impact:** Development workflow disruption, deployment issues  
**Probability:** Low

**Mitigation Strategies:**
- Start with minimal Astro configuration
- Gradually add build optimizations
- Document all build steps clearly
- Maintain simple deployment pipeline

**Contingency Plan:**
- Simplify build configuration if issues arise
- Use basic static site generation without optimizations
- Fall back to current static HTML approach temporarily

### Medium Risk Items

#### 4. Content Migration Data Loss
**Risk Level:** Medium  
**Impact:** Missing or incorrectly formatted content  
**Probability:** Low

**Mitigation Strategies:**
- Back up all current content before migration
- Use automated content extraction tools
- Manual verification of all migrated content
- Implement content validation schemas

#### 5. SEO Impact During Migration
**Risk Level:** Medium  
**Impact:** Temporary search ranking decrease  
**Probability:** Medium

**Mitigation Strategies:**
- Maintain exact URL structure
- Implement proper redirects if URLs change
- Monitor search console during migration
- Submit updated sitemap immediately

#### 6. Performance Regression
**Risk Level:** Medium  
**Impact:** Slower page loads, poor user experience  
**Probability:** Low

**Mitigation Strategies:**
- Continuous performance monitoring during development
- A/B test against current site before launch
- Implement aggressive caching strategies
- Use Astro's zero-JavaScript default approach

---

## Success Metrics

### Performance Targets

#### Core Web Vitals
- **Largest Contentful Paint (LCP):** < 2.5 seconds
- **First Input Delay (FID):** < 100 milliseconds  
- **Cumulative Layout Shift (CLS):** < 0.1
- **First Contentful Paint (FCP):** < 1.2 seconds

#### Lighthouse Scores
- **Performance:** 100/100 (maintain current excellence)
- **Accessibility:** 100/100 (improve from current ~95)
- **Best Practices:** 100/100
- **SEO:** 100/100 (improve from current ~90)

#### Bundle Size Targets
- **Total JavaScript:** < 50KB gzipped (minimal interactive components)
- **Critical CSS:** < 30KB inlined
- **Total CSS:** < 100KB (maintain current size)
- **Image Optimization:** 80% reduction in image file sizes

### Developer Experience Goals

#### Development Workflow
- **Build Time:** < 30 seconds for full build
- **Hot Reload:** < 500ms for component changes
- **Type Safety:** 100% of component props properly typed
- **Code Reuse:** 80% reduction in HTML duplication across pages

#### Code Quality Metrics
- **TypeScript Coverage:** 95% of codebase
- **Component Test Coverage:** 90% of UI components
- **Accessibility Test Coverage:** 100% of interactive components
- **Documentation:** Complete component and build documentation

### SEO and Content Goals

#### Search Optimization
- **Structured Data:** 100% implementation for events and organization
- **Social Media Optimization:** Complete Open Graph and Twitter Card support
- **Sitemap Generation:** Automatic generation and submission
- **Meta Tag Optimization:** Dynamic, content-aware meta tag generation

#### Content Management
- **Update Workflow:** 50% reduction in time to update content
- **Content Validation:** Automated schema validation for all content
- **Version Control:** All content changes tracked in Git
- **Preview System:** Staging environment for content review

### User Experience Targets

#### Accessibility Improvements
- **Screen Reader Support:** 100% compatibility with major screen readers
- **Keyboard Navigation:** Full keyboard accessibility for all interactive elements
- **Color Contrast:** AAA compliance for all text elements
- **Focus Management:** Proper focus indicators and management

#### Feature Enhancements
- **Theme Persistence:** User theme preference saved across visits
- **Progressive Enhancement:** Full functionality without JavaScript
- **Offline Functionality:** Basic page caching for repeat visitors
- **Print Optimization:** Proper print styles for all content

---

## Appendix

### A. Technology Stack Comparison

#### Current Stack
- **Framework:** Static HTML files
- **Styling:** CSS Layers with Custom Properties
- **JavaScript:** Vanilla Web Components
- **Build:** None (manual file management)
- **Deployment:** Netlify (static file hosting)

#### Proposed Stack
- **Framework:** Astro.js with Static Site Generation
- **Styling:** Preserved CSS Layers + Astro component styles
- **JavaScript:** TypeScript + Island Architecture
- **Build:** Vite + Astro build pipeline
- **Deployment:** Netlify (optimized Astro deployment)

### B. Browser Support Matrix

#### Current Browser Support
- **Chrome:** 90+ (CSS Layers support)
- **Firefox:** 97+ (CSS Layers support)
- **Safari:** 15.4+ (CSS Layers support)
- **Edge:** 99+ (CSS Layers support)

#### Fallback Strategy for Older Browsers
- PostCSS processing for legacy cascade
- JavaScript-based theme switching fallback
- Progressive enhancement for all features

### C. Content Audit

#### Existing Pages
1. **index.html** - Festival homepage with hero, overview, and CTA
2. **schedule.html** - Event timeline and performer information
3. **financial-transparency.html** - Budget breakdown and donation info
4. **yorkville-schoolhouse-ranch.html** - Venue details and directions
5. **components-demo.html** - Design system showcase (internal)

#### Content Types
- **Festival Information:** Event details, dates, description
- **Schedule Data:** Performer lineup, timing, venue info
- **Financial Data:** Budget transparency, donation links
- **Venue Information:** Location details, directions, accommodation
- **Design System:** Component documentation and examples

### D. Component Inventory

#### Current Web Components
- `<dive-barn-nav>` - Site navigation
- `<db-theme-toggle>` - Dark/light mode switch
- `<db-floating-button>` - RSVP call-to-action
- `<db-heading>` - Consistent heading styling
- `<db-card>` - Content card layout
- `<db-button>` - Button component with variants
- `<db-footer>` - Site footer
- `<db-timeline-item>` - Schedule timeline entries
- `<db-accordion-item>` - FAQ accordion sections
- `<db-table>` - Financial data tables

#### Proposed Astro Components
All existing components will be converted to Astro components with enhanced:
- TypeScript prop validation
- Server-side rendering optimization
- Improved accessibility features
- Better integration with design token system

### E. Performance Baseline

#### Current Site Performance (Lighthouse)
- **Performance:** 98/100
- **Accessibility:** 95/100
- **Best Practices:** 92/100
- **SEO:** 91/100

#### Areas for Improvement
- Automatic image optimization
- Enhanced meta tag generation
- Structured data implementation
- Better caching strategies
- Bundle size optimization

---

**Document Status:** Complete  
**Next Steps:** Begin Phase 1 implementation following approval  
**Review Date:** Weekly during implementation phases