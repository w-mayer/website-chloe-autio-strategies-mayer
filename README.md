# Autio Strategies

A professional AI policy consulting, technology governance, and regulatory compliance advisory website built with Next.js 14, TypeScript, and Tailwind CSS.

## Project Overview

Autio Strategies provides expert guidance for government and enterprise leaders navigating the complex landscape of AI policy, technology governance, and regulatory compliance. This website serves as the digital presence for our consulting services, showcasing our expertise and facilitating client engagement.

### Key Features
- **Service Showcase**: Comprehensive display of consulting services including insight analysis, research, policy development, and events facilitation
- **Content Management**: Centralized content system for easy non-technical updates
- **Form Handling**: Netlify-powered forms with spam protection and email notifications
- **Interactive Animations**: Sophisticated text animations and hover effects for enhanced user experience
- **Responsive Design**: Mobile-first approach with optimized performance across all devices
- **SEO Optimized**: Comprehensive metadata, structured data, and performance optimization
- **Accessibility Focused**: WCAG compliant with ARIA labels and keyboard navigation support

### Target Audience
- Government agencies and policymakers
- Enterprise technology leaders
- Regulatory compliance officers
- Technology governance professionals
- Organizations seeking AI policy guidance

## Technical Stack

### Core Framework
- **Next.js**: 14.2.30 with App Router
- **React**: 18.3.1 with TypeScript 5
- **TypeScript**: For type safety and developer experience

### Styling & UI
- **Tailwind CSS**: 3.4.1 with custom design system
- **Framer Motion**: 12.19.1 for animations
- **React Hook Form**: 7.58.1 with Zod validation
- **Lucide React**: 0.522.0 for icons
- **React Icons**: 5.5.0 for additional icon sets

### Development Tools
- **ESLint**: Code quality and consistency
- **PostCSS**: CSS processing
- **Prettier**: Code formatting

### Deployment & Forms
- **Platform**: Netlify (recommended) with automatic form handling
- **Form Processing**: Netlify Forms with spam protection
- **Database**: Static site - no database required
- **Email Notifications**: Built-in Netlify form notifications

## Project Structure

```
chloe-autio-strategies/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── insights/          # Insights and blog pages
│   │   ├── resources/         # Resources and articles
│   │   ├── services/          # Services pages
│   │   ├── globals.css        # Global styles and CSS variables
│   │   ├── layout.tsx         # Root layout component
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   │   ├── content/           # Content display components
│   │   ├── forms/             # Netlify-enabled form components
│   │   ├── layout/            # Layout components
│   │   ├── sections/          # Page sections
│   │   └── ui/                # Base UI components
│   ├── data/                  # Centralized content and data
│   │   ├── content.ts         # ALL website text content (main file)
│   │   ├── insights.ts        # Articles, policy briefs, case studies
│   │   ├── services.ts        # Services data
│   │   └── metadata.ts        # SEO and page metadata
│   ├── lib/                   # Utility functions and constants
│   │   ├── constants.ts       # Site constants and metadata
│   │   ├── hooks/             # Custom React hooks
│   │   └── utils.ts           # Common utilities
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
│   ├── images/               # Image assets
│   └── forms.html            # Netlify form detection file
├── scripts/                   # Build and utility scripts
├── docs/                      # Documentation files
├── netlify.toml              # Netlify configuration
└── docs/NETLIFY_FORMS.md     # Form configuration guide
```

### Key Configuration Files
- **`next.config.mjs`**: Next.js configuration with image optimization
- **`tailwind.config.ts`**: Tailwind CSS configuration with custom design system
- **`tsconfig.json`**: TypeScript configuration
- **`.eslintrc.json`**: ESLint rules and configuration
- **`netlify.toml`**: Netlify deployment and form configuration
- **`public/forms.html`**: Static HTML forms for Netlify detection

## Getting Started

### Prerequisites
- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher (or yarn)
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/w-mayer/website-chloe-autio-strategies-mayer.git
   cd website-chloe-autio-strategies-mayer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

This project operates as a static site with Netlify form handling. No environment variables are required for basic functionality. However, if you plan to integrate additional services, create a `.env.local` file in the root directory:

```bash
# Example environment variables (not currently required)
# NEXT_PUBLIC_SITE_URL=https://yourdomain.com
# NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
# NEXT_PUBLIC_CONTACT_EMAIL=contact@yourdomain.com
```

### First-Time Setup Checklist

- [ ] Install Node.js 18+ and npm
- [ ] Clone the repository
- [ ] Install dependencies with `npm install`
- [ ] Start development server with `npm run dev`
- [ ] Verify the site loads at http://localhost:3000
- [ ] Test form functionality (contact, newsletter)
- [ ] Run `npm run type-check` to verify TypeScript
- [ ] Run `npm run lint` to check code quality

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm run type-check` | TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run analyze-images` | Analyze image optimization |

## Key Integrations

### Current Integrations
- **Netlify Forms**: Automatic form handling with spam protection
- **Email Notifications**: Built-in Netlify form notifications
- **Content Centralization**: All text content in `src/data/content.ts`

### Planned Integrations
- **Analytics**: Google Analytics or similar for user tracking
- **Social Media**: LinkedIn sharing capabilities
- **Content Management**: Headless CMS for dynamic content updates
- **Email Marketing**: Newsletter service integration

## Content Management

### Centralized Content System

**All website text is centralized** in `src/data/content.ts` for easy non-technical updates:

- **Site Information**: Company name, contact details, social links
- **Navigation**: Menu items and links
- **Page Content**: Hero sections, service descriptions, team bios
- **Forms**: Labels, placeholders, error messages, success messages
- **UI Elements**: Button text, loading states, aria labels

### Content Updates

**For Non-Technical Users:**
1. Open `src/data/content.ts` in any text editor
2. Find the section you want to edit (use Ctrl+F to search)
3. Edit text between quotes: `'Your new text here'`
4. Save the file and refresh the website

**For Developers:**
- Follow TypeScript interfaces in `src/types/`
- Maintain content structure and organization
- Test changes locally before deployment

### Form Configuration

## 📝 Forms

The website includes two main forms:

- **Contact Form**: General inquiries and service questions with checkbox selection
- **Newsletter Form**: Email signup for updates and insights

## Development Guidelines

### Code Organization

**Component Structure**
- Use functional components with TypeScript
- Follow the established component hierarchy:
  - `ui/` - Base UI components (Button, Card, Input, etc.)
  - `layout/` - Layout components (Header, Footer, Navigation)
  - `sections/` - Page sections (Hero, ServicesGrid, etc.)
  - `content/` - Content display components (ArticleCard, etc.)
  - `forms/` - Netlify-enabled form components

**File Naming**
- Components: PascalCase (e.g., `AuthorityHeading.tsx`)
- Utilities: camelCase (e.g., `utils.ts`)
- Pages: kebab-case (e.g., `contact/page.tsx`)

### Styling Approach

**Tailwind CSS**
- Use utility classes for styling
- Leverage the custom design system defined in `tailwind.config.ts`
- Follow mobile-first responsive design principles
- Use CSS custom properties for theme values

**Design System**
- **Colors**: Primary green (#6F9C3B), grays, and accent colors
- **Typography**: Inter font family with custom weights
- **Spacing**: Consistent scale (0-128)
- **Components**: Reusable with consistent variants

### State Management

**Current Approach**
- React hooks for local component state
- No global state management required (static site)
- Form state handled by React Hook Form
- Netlify handles form submissions and notifications

**Future Considerations**
- Consider Zustand or Redux Toolkit if global state needed
- Implement React Query for API data fetching

### Animation Guidelines

**Framer Motion**
- Use for complex animations and transitions
- Implement reduced motion support for accessibility
- Follow performance best practices

**CSS Animations**
- Use for simple hover effects and micro-interactions
- Leverage Tailwind's animation utilities
- Ensure 60fps performance

## Troubleshooting

### Common Issues

**Build Failures**
```bash
# Check Node.js version
node --version  # Should be 18+

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run type-check
```

**Form Issues**
- Verify `data-netlify="true"` attributes on forms
- Check `public/forms.html` exists for form detection
- Ensure form names match in `src/data/content.ts`
- Test form submissions in Netlify dashboard

**Development Server Issues**
```bash
# Check if port 3000 is in use
lsof -i :3000

# Use different port
npm run dev -- -p 3001
```

**Styling Issues**
```bash
# Rebuild Tailwind CSS
npm run build

# Check for CSS conflicts
npm run lint
```

### Debug Mode

**Enable Debug Logging**
```bash
# Set debug environment variable
DEBUG=* npm run dev
```

**Component Debugging**
- Add `console.log` statements in components
- Use React Developer Tools browser extension
- Check browser console for errors

### Performance Issues

**Image Optimization**
```bash
# Analyze image optimization
npm run analyze-images

# Check Core Web Vitals
# Use Lighthouse in Chrome DevTools
```

**Bundle Size**
```bash
# Analyze bundle size
npm run build
# Check .next/analyze/ for detailed breakdown
```

### Log Locations

**Development Logs**
- Browser console for client-side errors
- Terminal for server-side errors
- Next.js logs in terminal output

**Production Logs**
- Netlify dashboard for deployment and form logs
- Browser console for client-side errors

## Additional Documentation

For detailed information on specific topics, refer to:

- **[Content Editing Guide](CONTENT_EDITING.md)** - Complete guide for non-technical content updates
- **[Deployment Guide](DEPLOYMENT.md)** - Comprehensive deployment instructions for Netlify
- **[Maintenance Guide](MAINTENANCE.md)** - Non-technical user guide for website management
- **[Netlify Forms Guide](NETLIFY_FORMS.md)** - Form configuration and troubleshooting

## Contributing

1. Follow the existing code style and conventions
2. Use TypeScript for all new code
3. Write meaningful commit messages
4. Test your changes thoroughly
5. Ensure accessibility compliance
6. Update documentation for new features
7. Maintain content centralization approach

## License

This project is proprietary to Autio Strategies.

## Support

For support or questions about this project, please contact the development team.
