# Dive Barn Design System

A modern, scalable design system built with design tokens and Style Dictionary for the Dive Barn festival website.

## 🌟 Features

- **Token-based architecture** - Centralized design decisions using JSON tokens
- **Automatic CSS generation** - Style Dictionary compiles tokens to CSS custom properties
- **Theme system** - Light/dark mode with system preference detection
- **Component tokens** - Semantic tokens for buttons, cards, forms, navigation
- **Responsive design** - Fluid typography and spacing using CSS clamp()
- **Accessibility first** - WCAG compliant colors, focus states, reduced motion support
- **Modern CSS** - CSS custom properties, grid, flexbox, and modern selectors

## 📁 Structure

```
tokens/
├── global/           # Base design tokens
│   ├── colors.json
│   ├── typography.json
│   ├── spacing.json
│   └── effects.json
├── semantic/         # Contextual tokens
│   ├── colors.json
│   └── components.json
├── themes/           # Theme-specific overrides
│   ├── light.json
│   └── dark.json
└── build/           # Generated CSS files
    ├── tokens.css
    ├── theme-light.css
    ├── theme-dark.css
    └── theme-system.css
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Build Tokens

```bash
npm run build-tokens
```

### 3. Use in HTML

```html
<link rel="stylesheet" href="tokens/build/tokens.css">
<link rel="stylesheet" href="tokens/build/theme-system.css">
<link rel="stylesheet" href="styles-tokens.css">
```

### 4. Add Theme Switching (Optional)

```html
<script src="theme-switcher.js"></script>
<script>
  // Add theme toggle button
  themeSwitcher.createToggleButton();
</script>
```

## 🎨 Design Tokens

### Color System

The color system uses a hierarchical approach:

1. **Primitive tokens** - Base colors with 50-900 scales
2. **Semantic tokens** - Contextual meanings (primary, success, error)
3. **Component tokens** - Specific use cases (button-primary-background)

```css
/* Primitive */
--color-coral-500: #FF6B6B;

/* Semantic */
--color-primary: var(--color-coral-500);

/* Component */
--component-button-primary-background: var(--color-primary);
```

### Typography Scale

Fluid typography that scales between viewport sizes:

```css
--typography-font-size-base: clamp(1rem, 2vw, 1.125rem);
--typography-font-size-lg: clamp(1.125rem, 2.5vw, 1.5rem);
--typography-font-size-xl: clamp(1.5rem, 3vw, 2rem);
```

### Spacing System

Consistent spacing using fluid values:

```css
--spacing-xs: clamp(0.5rem, 1vw, 0.75rem);
--spacing-sm: clamp(1rem, 2vw, 1.5rem);
--spacing-md: clamp(1.5rem, 3vw, 2rem);
--spacing-lg: clamp(2rem, 4vw, 3rem);
```

## 🔧 Usage Examples

### Using Design Tokens

```css
.my-component {
  background: var(--color-surface);
  padding: var(--spacing-md);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--effects-shadow-md);
  transition: all var(--effects-transition-duration-normal) var(--effects-transition-easing-ease-out);
}
```

### Button Components

```html
<button class="btn btn--primary">Primary Action</button>
<button class="btn btn--secondary">Secondary Action</button>
```

### Card Components

```html
<div class="card">
  <div class="card__icon">🎨</div>
  <h3 class="card__title">Card Title</h3>
  <p class="card__text">Card description text.</p>
</div>
```

### Grid Layouts

```html
<div class="grid grid--3">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

## 🌙 Theme System

### Automatic Theme Detection

The theme system automatically detects and applies the user's system preference:

```css
/* Light theme (default) */
:root {
  --color-background: var(--color-white);
  --color-text-primary: var(--color-gray-900);
}

/* Dark theme */
[data-theme="dark"] {
  --color-background: var(--color-gray-900);
  --color-text-primary: var(--color-gray-50);
}

/* System preference */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --color-background: var(--color-gray-900);
    --color-text-primary: var(--color-gray-50);
  }
}
```

### JavaScript Theme Control

```javascript
// Toggle theme
themeSwitcher.toggleTheme();

// Set specific theme
themeSwitcher.setTheme('dark');

// Get current theme
const currentTheme = themeSwitcher.theme;

// Clear stored preference (use system)
themeSwitcher.clearStoredTheme();
```

## 🛠 Development Workflow

### 1. Modify Tokens

Edit JSON files in the `tokens/` directory:

```json
{
  "color": {
    "primary": { "value": "#FF6B6B" },
    "secondary": { "value": "#FF9F43" }
  }
}
```

### 2. Build Tokens

```bash
npm run build-tokens
```

### 3. Watch for Changes

```bash
npm run watch-tokens
```

### 4. Update Components

Use the new tokens in your CSS:

```css
.component {
  background: var(--color-primary);
}
```

## 📚 Component Library

### Available Components

- **Navigation** (`nav`, `nav__list`, `nav__link`)
- **Buttons** (`btn`, `btn--primary`, `btn--secondary`)
- **Cards** (`card`, `card__icon`, `card__title`, `card__text`)
- **Grid Layouts** (`grid`, `grid--2`, `grid--3`, `grid--4`)
- **Sections** (`section`, `section__header`, `section__title`)

### Component Tokens

Each component has dedicated tokens for consistent styling:

```css
/* Button tokens */
--component-button-primary-background
--component-button-primary-background-hover
--component-button-padding-x
--component-button-border-radius
--component-button-transition

/* Card tokens */
--component-card-background
--component-card-shadow
--component-card-shadow-hover
--component-card-padding
--component-card-border-radius
```

## ♿ Accessibility

### Focus Management

```css
*:focus-visible {
  outline: 3px solid var(--color-interactive-focus);
  outline-offset: 2px;
  border-radius: var(--border-radius-sm);
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Color Contrast

All color combinations meet WCAG AA standards with contrast ratios of 4.5:1 or higher.

## 🔄 Migration Guide

### From Old CSS to Token System

1. **Replace hardcoded values:**
   ```css
   /* Before */
   color: #FF6B6B;
   padding: 24px;
   
   /* After */
   color: var(--color-primary);
   padding: var(--spacing-lg);
   ```

2. **Use semantic tokens:**
   ```css
   /* Before */
   background: #F8F9FA;
   
   /* After */
   background: var(--color-surface);
   ```

3. **Leverage component tokens:**
   ```css
   /* Before */
   .button {
     background: #FF6B6B;
     padding: 12px 24px;
     border-radius: 8px;
   }
   
   /* After */
   .button {
     background: var(--component-button-primary-background);
     padding: var(--component-button-padding-y) var(--component-button-padding-x);
     border-radius: var(--component-button-border-radius);
   }
   ```

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile first approach */
@media (max-width: 768px) { /* Mobile */ }
@media (min-width: 769px) and (max-width: 1024px) { /* Tablet */ }
@media (min-width: 1025px) { /* Desktop */ }
```

### Fluid Sizing

All typography and spacing uses fluid sizing with CSS clamp():

```css
font-size: clamp(1rem, 2vw, 1.125rem);
padding: clamp(1rem, 3vw, 2rem);
```

## 🏗 Build Process

### Style Dictionary Configuration

```javascript
module.exports = {
  source: ['tokens/global/**/*.json', 'tokens/semantic/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'tokens/build/',
      files: [{ destination: 'tokens.css', format: 'css/variables' }]
    }
  }
};
```

### NPM Scripts

```json
{
  "scripts": {
    "build-tokens": "style-dictionary build --config style-dictionary.config.js",
    "watch-tokens": "style-dictionary build --config style-dictionary.config.js --watch"
  }
}
```

## 🚀 Performance

### Optimizations

- **CSS Custom Properties** - Native browser support, no preprocessing
- **Fluid Typography** - Reduces media queries and improves performance
- **Component-based CSS** - Only load what you need
- **Minimal JavaScript** - Theme switching with <2KB of JS

### Bundle Size

- **Base tokens:** ~8KB (gzipped)
- **Theme system:** ~2KB (gzipped)
- **Component styles:** ~12KB (gzipped)
- **Theme switcher JS:** ~2KB (gzipped)

## 📄 Browser Support

- **Modern browsers:** Full support (Chrome 88+, Firefox 87+, Safari 14+)
- **CSS Custom Properties:** Required for token system
- **CSS Clamp:** Required for fluid sizing
- **Prefers-color-scheme:** Enhanced experience in supporting browsers

## 🤝 Contributing

1. **Edit tokens** in JSON files, not generated CSS
2. **Run build process** after token changes
3. **Test in both themes** using the demo page
4. **Verify accessibility** with contrast checkers
5. **Document new tokens** in this README

## 📖 Resources

- [Style Dictionary Documentation](https://amzn.github.io/style-dictionary/)
- [CSS Custom Properties Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Design Tokens W3C Specification](https://tr.designtokens.org/format/)
- [WCAG Color Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)