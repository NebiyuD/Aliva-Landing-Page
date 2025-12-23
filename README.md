# Aliva Landing Page

A modern, interactive landing page for Aliva - an intelligent healthcare platform powered by AI. Built with clean HTML, CSS, and JavaScript featuring smooth animations, responsive design, and a professional blue color scheme.

## Features

- 🎨 Modern AI startup aesthetic with blue undertones
- ✨ Smooth scroll animations and transitions
- 📱 Fully responsive design (desktop, tablet, mobile)
- 🎭 Interactive floating cards and gradient orbs
- 💫 Parallax effects and hover animations
- 🎯 Clean, semantic HTML structure
- ⚡ Lightweight and fast-loading
- 🎪 Engaging call-to-action sections

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties, animations, and grid layouts
- **Vanilla JavaScript** - Smooth interactions without dependencies

## Project Structure

```
aliva-landing/
├── index.html       # Main HTML file
├── styles.css       # All styling and animations
├── script.js        # Interactive functionality
└── README.md        # This file
```

## Getting Started

### Quick Start

1. Clone the repository:
```bash
git clone <your-repo-url>
cd aliva-landing
```

2. Open `index.html` in your browser:
```bash
open index.html
# or
python -m http.server 8000  # Then visit http://localhost:8000
```

### Development

For local development with live reload, you can use any simple HTTP server:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js:**
```bash
npx serve
```

**Using PHP:**
```bash
php -S localhost:8000
```

## Customization

### Colors

The color scheme is defined in CSS custom properties at the top of `styles.css`:

```css
:root {
    --primary-blue: #3B82F6;
    --dark-blue: #1D4ED8;
    --light-blue: #60A5FA;
    /* ... more colors */
}
```

### Content

All content can be edited directly in `index.html`. Key sections include:
- Hero section with main headline and CTA
- Features grid (6 feature cards)
- Technology showcase with code example
- Call-to-action section
- Footer with links

### Animations

Animations are defined in `styles.css` using CSS keyframes. Main animations include:
- `fadeInUp` - Staggered fade-in for hero content
- `float` - Floating effect for cards
- `pulse` - Pulsing indicator dots
- `slideDown` - Navbar entrance animation

## Features Breakdown

### Hero Section
- Gradient text with blue tones
- Animated floating cards showing product features
- Interactive gradient orbs with parallax effect
- Statistics showcase
- Dual CTA buttons

### Features Grid
- 6 responsive feature cards
- Hover effects with elevation
- Icon backgrounds with gradients
- Smooth transitions

### Technology Section
- Animated code window with syntax highlighting
- Feature checklist
- Split layout design

### Interactive Elements
- Smooth scroll navigation
- Ripple effect on button clicks
- Intersection observer for scroll animations
- Parallax scrolling effects
- Responsive mobile menu

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- No external dependencies
- Optimized animations using CSS transforms
- Minimal JavaScript for core interactions
- Fast page load times

## Deployment

This is a static site and can be deployed to:
- **GitHub Pages**: Push to a `gh-pages` branch
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your repository
- **AWS S3**: Upload files and configure static hosting
- **Any static hosting service**

### GitHub Pages Deployment

1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select the branch to deploy (usually `main` or `gh-pages`)
4. Your site will be live at `https://username.github.io/aliva-landing/`

## Future Enhancements

Potential additions for future versions:
- [ ] Contact form integration
- [ ] Blog section
- [ ] Customer testimonials
- [ ] Pricing page
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Analytics integration
- [ ] A/B testing setup

## License

This project is open source and available under the MIT License.

## Credits

Created for Aliva Health - Intelligent Healthcare Platform

---

**Need help?** Feel free to open an issue or reach out!
