# Dive Barn Design System - Deployment Guide

## 🚀 Production Deployment

### Prerequisites

1. **Node.js 18+** - Required for Style Dictionary
2. **NPM or Yarn** - Package manager
3. **Git** - Version control

### Build Process

The design system uses a build step to generate CSS from JSON tokens:

```bash
# Install dependencies
npm install

# Build design tokens (generates CSS files)
npm run build-tokens

# Deploy generated files
# Make sure tokens/build/*.css files are included in deployment
```

### Files to Deploy

**Essential files:**
- `tokens/build/tokens.css` - All design tokens
- `tokens/build/theme-system.css` - Light/dark theme system
- `styles.css` - Main stylesheet (existing)
- `theme-switcher.js` - Theme switching functionality (optional)

**Source files (optional for debugging):**
- `tokens/` directory - JSON source files
- `style-dictionary.config.js` - Build configuration
- `package.json` - Dependencies and build scripts

## 📦 Netlify Deployment

### Build Settings

Add to your `netlify.toml`:

```toml
[build]
  command = "npm run build-tokens"
  publish = "."

[build.environment]
  NODE_VERSION = "18"

# Optional: Build tokens on deploy
[[plugins]]
  package = "netlify-plugin-run-local-install-core"
  
[plugins.netlify-plugin-run-local-install-core]
  commands = [
    "npm run build-tokens"
  ]
```

### Environment Variables

No special environment variables needed. The build process is self-contained.

## 🔄 CI/CD Integration

### GitHub Actions

Create `.github/workflows/build.yml`:

```yaml
name: Build Design System
on:
  push:
    paths:
      - 'tokens/**'
      - 'style-dictionary.config.js'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build-tokens
      - name: Commit generated files
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add tokens/build/
          git commit -m "Update generated design tokens" || exit 0
          git push
```

### Pre-commit Hook

Install husky for automated building:

```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "npm run build-tokens"
```

## 🔧 Development Workflow

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   # Build tokens and watch for changes
   npm run dev
   ```

3. **Make changes to tokens:**
   - Edit files in `tokens/` directory
   - Tokens automatically rebuild
   - Refresh browser to see changes

### Team Development

1. **Token changes:**
   - Edit JSON files in `tokens/` directory
   - Run `npm run build-tokens`
   - Commit both source and generated files

2. **CSS changes:**
   - Prefer using existing tokens
   - Add new tokens if needed
   - Update `styles.css` or component files

## 📋 Production Checklist

### Before Deployment

- [ ] Run `npm run build-tokens`
- [ ] Verify generated CSS files exist in `tokens/build/`
- [ ] Test theme switching works correctly
- [ ] Validate HTML with new CSS includes
- [ ] Check browser compatibility (Chrome 88+, Firefox 87+, Safari 14+)
- [ ] Verify accessibility (contrast ratios, focus states)
- [ ] Test responsive design on mobile/tablet/desktop

### Files to Include

```
Essential:
✓ tokens/build/tokens.css
✓ tokens/build/theme-system.css
✓ styles.css
✓ theme-switcher.js (if using themes)

Optional:
- tokens/ (source files)
- style-dictionary.config.js
- package.json
- DESIGN-SYSTEM.md
```

### Performance Optimization

1. **CSS Optimization:**
   ```bash
   # Optional: Minify CSS for production
   npx csso tokens/build/tokens.css --output tokens/build/tokens.min.css
   ```

2. **Gzip Compression:**
   - Enable gzip compression on server
   - CSS files compress well (~70% size reduction)

3. **Caching:**
   - Set long cache headers for `tokens/build/*.css`
   - Use content hash in filenames if needed

## 🐛 Troubleshooting

### Build Issues

**"Style Dictionary not found"**
```bash
npm install style-dictionary --save-dev
```

**"Config file not found"**
```bash
# Ensure file exists and is named correctly
ls -la style-dictionary.config.js
```

**"Tokens not updating"**
```bash
# Clear build directory and rebuild
rm -rf tokens/build/
npm run build-tokens
```

### Runtime Issues

**"CSS variables not working"**
- Check browser support (requires Chrome 88+, Firefox 87+, Safari 14+)
- Verify CSS files are loading correctly
- Check for typos in variable names

**"Theme switching not working"**
- Ensure `theme-switcher.js` is loaded
- Check browser console for errors
- Verify `data-theme` attribute is being set

**"Styles look broken"**
- Ensure correct load order: tokens.css → theme-system.css → styles.css
- Check for CSS conflicts with existing styles
- Verify all required files are deployed

### Performance Issues

**"Page loading slowly"**
- Optimize CSS delivery (inline critical CSS)
- Use CSS containment for better performance
- Consider lazy loading non-critical styles

**"Layout shifts on theme change"**
- Ensure smooth transitions are defined
- Use `transition-duration: 0` for instant changes
- Test with various content lengths

## 📊 Monitoring

### Analytics

Track theme usage:
```javascript
// Google Analytics example
gtag('event', 'theme_change', {
  'theme': themeSwitcher.theme,
  'method': 'toggle_button'
});
```

### Error Tracking

Monitor CSS loading errors:
```javascript
// Check if design tokens loaded
if (!getComputedStyle(document.documentElement).getPropertyValue('--color-primary')) {
  console.error('Design tokens failed to load');
  // Report to error tracking service
}
```

## 🔗 Resources

- [Style Dictionary Documentation](https://amzn.github.io/style-dictionary/)
- [Netlify Build Settings](https://docs.netlify.com/configure-builds/overview/)
- [CSS Custom Properties Support](https://caniuse.com/css-variables)
- [Design System Best Practices](https://designsystemchecklist.com/)