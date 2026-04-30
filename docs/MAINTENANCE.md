# Website Maintenance Guide

**For Non-Technical Users**

This guide helps you manage the Autio Strategies website without needing technical knowledge. Follow these instructions carefully to avoid breaking the website.

---

## ⚠️ Important Warnings

- **Always backup content** before making changes
- **Never delete files** unless you're absolutely sure they're not needed
- **Test changes** on a staging environment first (if available)
- **Contact a developer** if you're unsure about any step

---

## 📝 Content Management

### How to Update Text Content

**All website text is now centralized in one file** - `src/data/content.ts`. This makes it much easier to update content without touching code.

#### **Main Content File Location:**
```
src/data/
├── content.ts      (ALL website text content - main file)
├── services.ts     (Service-specific content)
├── resources.ts    (Articles, case studies, resources)
└── metadata.ts     (SEO and page metadata)

src/lib/
└── constants.ts    (Site-wide constants and configuration)
```

#### **Step-by-Step Text Updates:**

1. **Open the main content file:** `src/data/content.ts`
2. **Find the section** you want to edit (use Ctrl+F or Cmd+F to search)
3. **Edit the text** between the quotes `'your text here'`
4. **Save the file**
5. **Test the changes** by refreshing the website

#### **Content Organization in content.ts:**

The content is organized by page/section:

```javascript
export const siteContent = {
  // Global site information
  site: { ... },
  
  // Navigation menu
  navigation: { ... },
  
  // Homepage sections
  hero: { ... },
  services: { ... },
  valueProposition: { ... },
  contactCTA: { ... },
  
  // About page
  about: { ... },
  
  // Footer
  footer: { ... },
  
  // Forms
  forms: { ... },
};
```

#### **Common Text Updates:**

**Company Information** (`src/data/content.ts` - `site` section):
- Company name, taglines, contact information
- Social media links
- Website URLs

**Navigation** (`src/data/content.ts` - `navigation` section):
- Menu item names and links
- Mobile menu text

**Homepage Sections** (`src/data/content.ts` - `hero`, `services`, etc.):
- Hero title and subtitle
- Service descriptions
- Button text
- Section titles

**About Page** (`src/data/content.ts` - `about` section):
- Team member bios and information
- Page titles and descriptions

**Forms** (`src/data/content.ts` - `forms` section):
- Form labels and placeholders
- Error messages
- Success messages
- Button text

**Footer** (`src/data/content.ts` - `footer` section):
- Footer links and text
- Contact information

### How to Change Images

#### **Image File Locations:**
```
public/images/
├── headshot/       (Profile photos)
├── logo/          (Company logos)
├── partner_logos/ (Client/partner logos)
└── stocks/        (Background and content images)
```

#### **Image Requirements:**
- **Formats:** JPG, PNG, WebP (recommended)
- **Profile photos:** 400x400 pixels minimum
- **Logos:** PNG with transparent background
- **Background images:** 1920x1080 pixels minimum
- **File size:** Keep under 2MB for fast loading

#### **Upload Process:**

1. **Prepare your image:**
   - Resize to recommended dimensions
   - Optimize file size (use tools like TinyPNG)
   - Use descriptive filename (e.g., `new-headshot-2024.jpg`)

2. **Upload to correct folder:**
   - Profile photos → `public/images/headshot/`
   - Logos → `public/images/logo/`
   - Content images → `public/images/stocks/`

3. **Update image references:**
   - Open `src/data/content.ts`
   - Find the image path you want to update
   - Change the path to match your new image name

#### **Example: Updating a Profile Photo**

1. Save your new photo as `chloe-autio-2024.jpg` in `public/images/headshot/`
2. Open `src/data/content.ts`
3. Find the `about.team.chloe.image` field and update:
   ```javascript
   about: {
     team: {
       chloe: {
         image: '/images/headshot/chloe-autio-2024.jpg',
         // ... other fields
       }
     }
   }
   ```

### How to Modify Navigation Menus

#### **Main Navigation** (`src/data/content.ts` - `navigation` section):

The main menu items are defined in the `navigation.items` array:

```javascript
navigation: {
  items: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Resources', href: '/resources' },
    { name: 'Contact', href: '/contact' },
  ],
}
```

**To add a new menu item:**
1. Add a new object to the `items` array
2. Create the corresponding page file (contact developer)
3. Test the navigation

**To change menu text:**
1. Edit the `name` property
2. Keep the `href` the same (unless you're changing the page URL)

### How to Update Contact Information

#### **Primary Contact Details** (`src/data/content.ts` - `site` section):

Update these values for company-wide contact information:
- Email addresses
- Social media links
- Website URLs

#### **Footer Contact** (`src/data/content.ts` - `footer` section):

The footer contact information is managed in the `footer` section:
- Email link
- LinkedIn link
- Other social media links

**To update contact information:**
1. Find the appropriate section in `src/data/content.ts`
2. Update the values
3. Test all links work correctly

### How to Add/Remove Pages or Sections

#### **Adding a New Page:**

1. **Add navigation item** in `src/data/content.ts`:
   ```javascript
   navigation: {
     items: [
       // ... existing items
       { name: 'New Page', href: '/new-page' },
     ],
   }
   ```

2. **Add metadata** in `src/data/metadata.ts`:
   ```javascript
   pages: {
     // ... existing pages
     newPage: {
       title: 'New Page | Autio Strategies',
       description: 'Description of the new page',
       keywords: ['relevant', 'keywords'],
       url: 'https://autiostrategies.com/new-page',
     },
   }
   ```

3. **Create the page component** (contact developer for this step)
4. **Test the navigation** and page functionality

#### **Removing a Page:**

1. **Remove navigation item** from `src/data/content.ts`
2. **Remove metadata** from `src/data/metadata.ts`
3. **Delete the page component** (contact developer)
4. **Test navigation** to ensure no broken links

### How to Update SEO Information

#### **Page Metadata** (`src/data/metadata.ts`):

Each page has its own metadata section:

```javascript
pages: {
  home: {
    title: 'Autio Strategies | AI Policy Consulting & Technology Governance',
    description: 'Professional technology governance and regulatory compliance advisory...',
    keywords: ['AI policy consulting', 'technology governance', 'regulatory compliance'],
    url: 'https://autiostrategies.com',
  },
  about: {
    title: 'Our Team | AI Policy Consulting & Technology Governance',
    description: 'Meet the Autio Strategies team...',
    keywords: ['AI policy consulting', 'team', 'about us'],
    url: 'https://autiostrategies.com/about',
  },
  // ... other pages
}
```

**To update SEO information:**
1. Find the page section in `src/data/metadata.ts`
2. Update the title, description, and keywords
3. Keep titles under 60 characters
4. Keep descriptions under 160 characters
5. Use relevant keywords naturally

### How to Update Service Information

#### **Service Details** (`src/data/services.ts`):

Each service has detailed information:

```javascript
{
  slug: 'insight-analysis',
  title: 'Insight & Analysis',
  overview: 'Receive tailored insights and analysis...',
  benefits: [
    'Data-driven insights for decision-making',
    'Early identification of policy and regulatory trends',
    'Actionable recommendations for your organization',
  ],
  methodology: 'We combine proprietary data, expert analysis...',
  caseStudies: [
    {
      title: 'AI Risk Monitoring for Federal Agency',
      description: 'Developed a real-time dashboard...',
    },
  ],
  related: ['research', 'policy-development'],
  backgroundImage: '/images/stocks/insights-analysis.jpg',
}
```

**To update service information:**
1. Find the service in `src/data/services.ts`
2. Update the title, overview, benefits, or methodology
3. Add or modify case studies
4. Update related services if needed
5. Test the service page displays correctly

### How to Update Resource Information

#### **Articles and Resources** (`src/data/resources.ts`):

Resources include articles, policy briefs, case studies, and general resources:

```javascript
// Articles
{
  slug: 'article-slug',
  title: 'Article Title',
  summary: 'Brief summary of the article',
  content: '<p>Article content in HTML format</p>',
  date: '2024-01-15',
  author: authors[0], // Reference to author array
  tags: ['AI Policy', 'Technology'],
  featured: true, // Show on homepage
  externalUrl: 'https://external-site.com/article', // For external articles
}

// Policy Briefs
{
  slug: 'policy-brief-slug',
  title: 'Policy Brief Title',
  summary: 'Brief summary',
  content: '<p>Policy brief content</p>',
  date: '2024-01-15',
  author: authors[0],
  tags: ['Policy Brief', 'AI Regulation'],
}

// Case Studies
{
  slug: 'case-study-slug',
  title: 'Case Study Title',
  summary: 'Brief summary',
  content: '<p>Case study content</p>',
  date: '2024-01-15',
  organization: 'Organization Name',
  author: authors[0],
  tags: ['Case Study', 'AI Governance'],
}

// General Resources
{
  slug: 'resource-slug',
  title: 'Resource Title',
  url: 'https://external-site.com/resource',
  description: 'Description of the resource',
  type: 'report', // 'report', 'toolkit', 'dataset', 'guideline'
}
```

**To add a new resource:**
1. Choose the appropriate array (articles, policyBriefs, caseStudies, or resources)
2. Add a new object following the existing format
3. Use a unique slug (lowercase, hyphens instead of spaces)
4. Set the date in YYYY-MM-DD format
5. Use existing authors from the authors array
6. Add relevant tags for categorization

**To update existing resources:**
1. Find the resource in the appropriate array
2. Update the title, summary, content, or other fields
3. Keep the slug the same (unless you want to change the URL)
4. Test the resource page displays correctly

### How to Update Author Information

#### **Authors** (`src/data/resources.ts`):

Authors are defined at the top of the resources file:

```javascript
export const authors: Author[] = [
  {
    name: 'Chloe Autio',
    title: 'Founder, Autio Strategies',
    bio: 'Chloe Autio is a leading expert in AI policy...',
    avatarUrl: '/profile-placeholder.jpg',
  },
  {
    name: 'External Source',
    title: 'External News Outlet',
    bio: 'This article is featured as a resource...',
    avatarUrl: '/profile-placeholder.jpg',
  },
];
```

**To update author information:**
1. Find the author in the authors array
2. Update the name, title, bio, or avatar URL
3. All resources using that author will automatically update
4. Test that author information displays correctly

### How to Update Site Constants

#### **Site Constants** (`src/lib/constants.ts`):

Site-wide constants are stored in the lib directory:

```javascript
export const siteMeta: SiteMeta = {
  title: "Autio Strategies",
  description: "Professional tech policy consulting for the digital age.",
  url: "https://autiostrategies.com",
};

export const contactInfo: ContactInfo = {
  email: "chloe@autiostrategies.com",
};
```

**To update site constants:**
1. Find the constant in `src/lib/constants.ts`
2. Update the value
3. Test that the change appears across the site
4. Note: These are used for site-wide configuration

### How to Update Form Configuration

#### **Form Settings** (`src/data/content.ts` - `forms` section):

Forms are configured with labels, placeholders, and messages:

```javascript
forms: {
  contact: {
    title: 'Contact Form',
    netlifyName: 'contact',
    fields: {
      name: {
        label: 'Full Name',
        placeholder: 'Enter your full name',
        error: 'Name is required',
      },
      email: {
        label: 'Email Address',
        placeholder: 'Enter your email address',
        error: 'Please enter a valid email address',
      },
      // ... other fields
    },
    buttons: {
      submit: {
        text: 'Send Message',
        loading: 'Sending...',
      },
    },
    messages: {
      success: 'Thank you for your message! We\'ll get back to you soon.',
      error: 'There was an error sending your message. Please try again.',
    },
  },
}
```

**To update form configuration:**
1. Find the form in the `forms` section
2. Update field labels, placeholders, or error messages
3. Update button text or loading states
4. Update success or error messages
5. Test the form to ensure it works correctly

### How to Update Navigation and Menus

#### **Navigation Items** (`src/data/content.ts` - `navigation` section):

The main navigation menu is configured here:

```javascript
navigation: {
  items: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Resources', href: '/resources' },
    { name: 'Contact', href: '/contact' },
  ],
}
```

**To add a new menu item:**
1. Add a new object to the `items` array
2. Use a descriptive name
3. Use the correct href (page URL)
4. Test the navigation works correctly

**To change menu item text:**
1. Update the `name` property
2. Keep the `href` the same (unless changing the page URL)
3. Test the navigation displays correctly

**To reorder menu items:**
1. Move the objects in the array to the desired order
2. Test the navigation order is correct

### How to Update Footer Information

#### **Footer Content** (`src/data/content.ts` - `footer` section):

Footer links and information are configured here:

```javascript
footer: {
  builtBy: { text: 'Built by', href: 'https://github.com/w-mayer' },
  sourceCode: { text: 'The source code is available on', href: 'https://github.com/w-mayer/website-chloe-autio-strategies-mayer' },
  links: [
    { text: 'Privacy', href: '/privacy' },
    { text: 'Terms', href: '/terms' },
  ],
  contact: {
    email: { text: 'Email', href: 'mailto:chloe@autiostrategies.com' },
    linkedin: { text: 'LinkedIn', href: 'https://linkedin.com/in/chloeautio' },
  },
  logo: {
    image: '/images/logo/AutioStrategies_Logo_FullColor_JustMark.png',
    alt: 'Autio Strategies Logo',
  },
}
```

**To update footer information:**
1. Find the footer section in `src/data/content.ts`
2. Update links, contact information, or logo
3. Test the footer displays correctly
4. Verify all links work properly

### How to Update Header Information

#### **Header Content** (`src/data/content.ts` - `header` section):

Header logo and mobile menu are configured here:

```javascript
header: {
  logo: {
    image: '/images/logo/AutioStrategies_Logo_FullColor_Horz (1).png',
    alt: 'Autio Strategies Logo',
  },
  mobileMenu: {
    openButton: 'Open menu',
    closeButton: 'Close menu',
  },
}
```

**To update header information:**
1. Find the header section in `src/data/content.ts`
2. Update logo image or alt text
3. Update mobile menu button text
4. Test the header displays correctly

### How to Update Client Logos

#### **Client Logos** (`src/data/content.ts` - `clientLogos` section):

Client and partner logos are configured here:

```javascript
clientLogos: {
  title: 'Trusted by Leading Organizations',
  logos: [
    { 
      name: 'Cohere', 
      image: '/images/partner_logos/Cohere-Logo.png',
      alt: 'Cohere Logo'
    },
    { 
      name: 'Department of Defense', 
      image: '/images/partner_logos/DoD-Logo-Stacked.png',
      alt: 'Department of Defense Logo'
    },
    // ... other logos
  ],
}
```

**To add a new client logo:**
1. Add a new object to the `logos` array
2. Use a descriptive name
3. Reference the correct image path
4. Provide meaningful alt text
5. Test the logo displays correctly

**To update existing logos:**
1. Find the logo in the `logos` array
2. Update the name, image path, or alt text
3. Test the logo displays correctly

**To reorder logos:**
1. Move the objects in the array to the desired order
2. Test the logo order is correct

### How to Update Testimonials

#### **Testimonials** (`src/data/content.ts` - `testimonials` section):

Client testimonials are configured here:

```javascript
testimonials: {
  title: 'What Our Clients Say',
  items: [
    {
      quote: 'Autio Strategies helped us transform our business and achieve record growth. Their insights are invaluable.',
      name: 'Alex Johnson',
      role: 'CEO, Acme Corp',
    },
    {
      quote: 'The leadership workshops were a game changer for our team. Highly recommended!',
      name: 'Maria Lee',
      role: 'Head of People, InnovateX',
    },
    // ... other testimonials
  ],
}
```

**To add a new testimonial:**
1. Add a new object to the `items` array
2. Include a compelling quote
3. Add the person's name and role
4. Test the testimonial displays correctly

**To update existing testimonials:**
1. Find the testimonial in the `items` array
2. Update the quote, name, or role
3. Test the testimonial displays correctly

**To reorder testimonials:**
1. Move the objects in the array to the desired order
2. Test the testimonial order is correct

### How to Update Value Proposition

#### **Value Proposition** (`src/data/content.ts` - `valueProposition` section):

The value proposition cards are configured here:

```javascript
valueProposition: {
  title: 'Why Choose Autio Strategies?',
  cards: [
    {
      title: 'AI Policy Expertise',
      description: 'Decades of experience advising governments, Fortune 500s, and startups on responsible AI, data governance, and emerging tech policy.',
    },
    {
      title: 'Global Perspective',
      description: 'Experience working with international organizations (OECD, NIST, DOD, Meta, DeepMind, Google Cloud, Cohere) to shape global standards and best practices.',
    },
    {
      title: 'Proven Results',
      description: 'Trusted by leading organizations to deliver actionable insights, drive compliance, and enable responsible innovation in AI and technology.',
    },
  ],
}
```

**To update value proposition:**
1. Find the valueProposition section in `src/data/content.ts`
2. Update the title or card content
3. Test the value proposition displays correctly

**To add a new value proposition card:**
1. Add a new object to the `cards` array
2. Include a compelling title and description
3. Test the card displays correctly

### How to Update Contact CTA

#### **Contact CTA** (`src/data/content.ts` - `contactCTA` section):

The contact call-to-action section is configured here:

```javascript
contactCTA: {
  title: 'Ready to Transform Your Organization?',
  description: "Let's discuss how our expertise in AI policy, technology governance, and regulatory compliance can help your organization navigate the complexities of the digital age.",
  buttons: {
    primary: { text: 'Contact Us', href: '/contact' },
    secondary: { text: 'Learn More', href: '/services' },
  },
  background: {
    image: '/images/stocks/cta-background.jpg',
    alt: 'Professional consulting background',
  },
  logo: {
    image: '/images/logo/AutioStrategies_Logo_AllWhite_Horz.png',
    alt: 'Autio Strategies Logo',
  },
}
```

**To update contact CTA:**
1. Find the contactCTA section in `src/data/content.ts`
2. Update the title, description, or button text
3. Update background image or logo if needed
4. Test the CTA displays correctly

### How to Update About Page Content

#### **About Page** (`src/data/content.ts` - `about` section):

Team information and about page content is configured here:

```javascript
about: {
  hero: {
    title: 'Our Team',
    subtitle: 'Meet the experts behind Autio Strategies - dedicated professionals committed to advancing AI policy and technology governance.',
  },
  team: {
    chloe: {
      name: 'Chloe Autio',
      title: 'Founder & CEO',
      description: 'Chloe Autio is a recognized expert in AI policy, governance, and technology strategy...',
      image: '/images/headshot/autio_headshot.jpg',
      // ... other fields
    },
    samuel: {
      name: 'Samuel Wells',
      title: 'Policy Manager',
      description: 'Samuel Wells brings extensive experience in policy analysis and stakeholder engagement...',
      image: '/images/headshot/wells_headshot.jpeg',
      // ... other fields
    },
  },
  cta: {
    title: 'Partner with Our Team',
    description: 'Ready to work with our expert team?',
    button: { text: 'Contact Us', href: '/contact' },
  },
}
```

**To update team member information:**
1. Find the team member in the `team` section
2. Update the name, title, description, or image
3. Test the about page displays correctly

**To update about page hero:**
1. Find the hero section in the about configuration
2. Update the title or subtitle
3. Test the hero displays correctly

**To update about page CTA:**
1. Find the cta section in the about configuration
2. Update the title, description, or button
3. Test the CTA displays correctly

### How to Update Newsletter Configuration

#### **Newsletter** (`src/data/content.ts` - `newsletter` section):

Newsletter signup configuration is here:

```javascript
newsletter: {
  title: 'Stay Updated',
  description: 'Get the latest insights on AI policy, technology governance, and regulatory compliance delivered to your inbox.',
  placeholder: 'Enter your email address',
  button: {
    text: 'Subscribe',
    loading: 'Subscribing...',
  },
  messages: {
    success: 'Thank you for subscribing!',
    error: 'There was an error. Please try again.',
  },
}
```

**To update newsletter configuration:**
1. Find the newsletter section in `src/data/content.ts`
2. Update the title, description, placeholder, or button text
3. Update success or error messages
4. Test the newsletter form works correctly

### How to Update Common UI Elements

#### **Common UI** (`src/data/content.ts` - `ui` section):

Common UI elements like buttons and messages are configured here:

```javascript
ui: {
  buttons: {
    learnMore: 'Learn More',
    contactUs: 'Contact Us',
    getStarted: 'Get Started',
    readMore: 'Read More',
  },
  loading: {
    loading: 'Loading...',
    sending: 'Sending...',
    submitting: 'Submitting...',
  },
  errors: {
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    invalidPhone: 'Please enter a valid phone number',
    minLength: 'This field must be at least {min} characters',
  },
  aria: {
    closeMenu: 'Close menu',
    openMenu: 'Open menu',
    learnMore: 'Learn more about',
  },
}
```

**To update common UI elements:**
1. Find the ui section in `src/data/content.ts`
2. Update button text, loading states, error messages, or ARIA labels
3. Test the UI elements display correctly across the site

### How to Update Page-Specific Content

#### **Page Content** (`src/data/content.ts` - `pages` section):

Each page has its own content configuration:

```javascript
pages: {
  home: {
    hero: {
      title: 'AI Policy Consulting',
      subtitle: 'Professional technology governance and regulatory compliance advisory...',
      buttons: {
        primary: { text: 'Our Services', href: '/services' },
        secondary: { text: 'Contact Us', href: '/contact' },
      },
      background: {
        image: '/images/stocks/hero-background.jpg',
        alt: 'Jefferson Memorial night reflection',
      },
    },
  },
  about: {
    hero: {
      title: 'Our Team',
      subtitle: 'Meet the experts behind Autio Strategies...',
      background: {
        image: '/images/stocks/hero-background.jpg',
        alt: 'Team background',
      },
    },
  },
  // ... other pages
}
```

**To update page-specific content:**
1. Find the page in the `pages` section
2. Update the hero title, subtitle, buttons, or background
3. Test the page displays correctly

### How to Update Service-Specific Content

#### **Service Content** (`src/data/services.ts`):

Each service has detailed content configuration:

```javascript
{
  slug: 'insight-analysis',
  title: 'Insight & Analysis',
  overview: 'Receive tailored insights and analysis to inform your organization\'s strategy...',
  benefits: [
    'Data-driven insights for decision-making',
    'Early identification of policy and regulatory trends',
    'Actionable recommendations for your organization',
  ],
  methodology: 'We combine proprietary data, expert analysis, and ongoing monitoring...',
  caseStudies: [
    {
      title: 'AI Risk Monitoring for Federal Agency',
      description: 'Developed a real-time dashboard for a federal agency...',
    },
  ],
  related: ['research', 'policy-development'],
  backgroundImage: '/images/stocks/insights-analysis.jpg',
  detailedContent: [
    '<strong>Overview of Policy Landscape:</strong> Receive tailored reviews...',
    '<strong>Real-Time Policy Updates and Ecosystem Insights:</strong> Stay informed...',
    // ... other detailed content
  ],
}
```

**To update service content:**
1. Find the service in `src/data/services.ts`
2. Update the title, overview, benefits, methodology, or case studies
3. Update related services if needed
4. Update background image or detailed content
5. Test the service page displays correctly

### How to Update Resource-Specific Content

#### **Resource Content** (`src/data/resources.ts`):

Resources include articles, policy briefs, case studies, and general resources:

```javascript
// Articles
{
  slug: 'article-slug',
  title: 'Article Title',
  summary: 'Brief summary of the article',
  content: '<p>Article content in HTML format</p>',
  date: '2024-01-15',
  author: authors[0],
  tags: ['AI Policy', 'Technology'],
  featured: true,
  related: [],
  externalUrl: 'https://external-site.com/article',
}

// Policy Briefs
{
  slug: 'policy-brief-slug',
  title: 'Policy Brief Title',
  summary: 'Brief summary',
  content: '<p>Policy brief content</p>',
  date: '2024-01-15',
  author: authors[0],
  tags: ['Policy Brief', 'AI Regulation'],
  externalUrl: 'https://external-site.com/brief',
}

// Case Studies
{
  slug: 'case-study-slug',
  title: 'Case Study Title',
  summary: 'Brief summary',
  content: '<p>Case study content</p>',
  date: '2024-01-15',
  organization: 'Organization Name',
  author: authors[0],
  tags: ['Case Study', 'AI Governance'],
  externalUrl: 'https://external-site.com/case-study',
}

// General Resources
{
  slug: 'resource-slug',
  title: 'Resource Title',
  url: 'https://external-site.com/resource',
  description: 'Description of the resource',
  type: 'report',
}
```

**To update resource content:**
1. Find the resource in the appropriate array in `src/data/resources.ts`
2. Update the title, summary, content, date, or tags
3. Update external URL if applicable
4. Test the resource page displays correctly

### How to Update Metadata

#### **Page Metadata** (`src/data/metadata.ts`):

Each page has comprehensive metadata configuration:

```javascript
pages: {
  home: {
    title: 'Autio Strategies | AI Policy Consulting & Technology Governance',
    description: 'Professional technology governance and regulatory compliance advisory...',
    keywords: [
      'AI policy consulting',
      'technology governance',
      'regulatory compliance',
      'government consulting',
      'enterprise policy advisory',
    ],
    url: 'https://autiostrategies.com',
  },
  about: {
    title: 'Our Team | AI Policy Consulting & Technology Governance',
    description: "Meet the Autio Strategies team - Chloe Autio (Founder & CEO) and Samuel Wells (Policy Manager)...",
    keywords: [
      'AI policy consulting',
      'technology governance',
      'regulatory compliance',
      'Chloe Autio',
      'Samuel Wells',
      'Autio Strategies team',
    ],
    url: 'https://autiostrategies.com/about',
  },
  // ... other pages
}
```

**To update page metadata:**
1. Find the page in the `pages` section of `src/data/metadata.ts`
2. Update the title, description, keywords, or URL
3. Keep titles under 60 characters for SEO
4. Keep descriptions under 160 characters for SEO
5. Use relevant keywords naturally
6. Test the metadata appears correctly in search results

#### **Service Metadata** (`src/data/metadata.ts`):

Each service also has its own metadata:

```javascript
services: {
  'insight-analysis': {
    title: 'Insight & Analysis Services | AI Policy Consulting',
    description: 'Receive tailored insights and analysis to inform your organization\'s strategy...',
    keywords: [
      'AI policy insights',
      'technology trend analysis',
      'policy monitoring',
      'strategic intelligence',
      'regulatory forecasting',
    ],
    url: 'https://autiostrategies.com/services/insight-analysis',
  },
  // ... other services
}
```

**To update service metadata:**
1. Find the service in the `services` section of `src/data/metadata.ts`
2. Update the title, description, keywords, or URL
3. Test the service page metadata appears correctly

#### **Resource Metadata** (`src/data/metadata.ts`):

Resources also have metadata for SEO:

```javascript
resources: {
  'wsj-trump-ai-kratsios-thiel': {
    title: 'Trump Taps Michael Kratsios for AI Policy Role | Autio Strategies',
    description: 'Wall Street Journal coverage of Trump\'s appointment of Michael Kratsios to lead AI policy...',
    keywords: ['AI Policy', 'Trump', 'Kratsios', 'WSJ'],
    url: 'https://autiostrategies.com/resources/wsj-trump-ai-kratsios-thiel',
  },
  // ... other resources
}
```

**To update resource metadata:**
1. Find the resource in the `resources` section of `src/data/metadata.ts`
2. Update the title, description, keywords, or URL
3. Test the resource page metadata appears correctly

### How to Update Default Metadata

#### **Default Metadata** (`src/data/metadata.ts`):

Default metadata is used as a fallback for pages without specific metadata:

```javascript
default: {
  title: 'Autio Strategies | AI Policy Consulting & Technology Governance',
  description: 'Professional technology governance and regulatory compliance advisory for government and enterprise organizations. Expert AI policy consulting services.',
  keywords: [
    'AI policy consulting',
    'technology governance',
    'regulatory compliance',
    'government consulting',
    'enterprise policy advisory',
    'AI governance',
    'tech policy',
    'compliance consulting',
    'public sector advisory',
    'Autio Strategies',
    'Chloe Autio',
  ],
  url: 'https://autiostrategies.com',
  siteName: 'Autio Strategies',
  locale: 'en_US',
  type: 'website',
  image: {
    url: 'https://autiostrategies.com/og-image.png',
    width: 1200,
    height: 630,
    alt: 'Autio Strategies - AI Policy Consulting & Technology Governance',
  },
}
```

**To update default metadata:**
1. Find the `default` section in `src/data/metadata.ts`
2. Update the title, description, keywords, or other fields
3. Test that the default metadata appears correctly on pages without specific metadata

### How to Update Open Graph Metadata

#### **Open Graph Metadata** (`src/data/metadata.ts`):

Open Graph metadata is used for social media sharing:

```javascript
openGraph: {
  title: 'AI Policy Consulting & Technology Governance',
  description: 'Expert guidance for government and enterprise leaders',
  url: 'https://autiostrategies.com',
  siteName: 'Autio Strategies',
  images: [
    {
      url: 'https://autiostrategies.com/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Autio Strategies - AI Policy Consulting',
    },
  ],
  locale: 'en_US',
  type: 'website',
}
```

**To update Open Graph metadata:**
1. Find the `openGraph` section in `src/data/metadata.ts`
2. Update the title, description, URL, or images
3. Test that social media sharing displays correctly

### How to Update Twitter Metadata

#### **Twitter Metadata** (`src/data/metadata.ts`):

Twitter-specific metadata is used for Twitter sharing:

```javascript
twitter: {
  card: 'summary_large_image',
  title: 'AI Policy Consulting & Technology Governance',
  description: 'Expert guidance for government and enterprise leaders',
  images: ['https://autiostrategies.com/og-image.png'],
  creator: '@chloeautio',
}
```

**To update Twitter metadata:**
1. Find the `twitter` section in `src/data/metadata.ts`
2. Update the card type, title, description, images, or creator
3. Test that Twitter sharing displays correctly

### How to Update JSON-LD Schema

#### **JSON-LD Schema** (`src/data/metadata.ts`):

Structured data for search engines:

```javascript
jsonLd: {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Autio Strategies',
  url: 'https://autiostrategies.com',
  logo: 'https://autiostrategies.com/images/logo/AutioStrategies_Logo_FullColor_Horz.png',
  description: 'Professional technology governance and regulatory compliance advisory...',
  email: 'chloe@autiostrategies.com',
  sameAs: [
    'https://linkedin.com/in/chloeautio',
    'https://github.com/w-mayer/website-chloe-autio-strategies-mayer',
  ],
}
```

**To update JSON-LD schema:**
1. Find the `jsonLd` section in `src/data/metadata.ts`
2. Update the organization information, URLs, or social media links
3. Test that structured data appears correctly in search results

### How to Update Site Constants

#### **Site Constants** (`src/lib/constants.ts`):

Site-wide constants and configuration:

```javascript
export const siteMeta: SiteMeta = {
  title: "Autio Strategies",
  description: "Professional tech policy consulting for the digital age.",
  url: "https://autiostrategies.com",
};

export const navMenu: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { platform: "Email", url: "mailto:chloe@autiostrategies.com" },
];

export const contactInfo: ContactInfo = {
  email: "chloe@autiostrategies.com",
};
```

**To update site constants:**
1. Find the constant in `src/lib/constants.ts`
2. Update the value
3. Test that the change appears across the site
4. Note: These are used for site-wide configuration and may be referenced in multiple places

### Content Backup and Version Control

#### **Before Making Changes:**

1. **Create a backup:**
   ```bash
   cp src/data/content.ts src/data/content.ts.backup
   cp src/data/metadata.ts src/data/metadata.ts.backup
   cp src/data/services.ts src/data/services.ts.backup
   cp src/data/resources.ts src/data/resources.ts.backup
   cp src/lib/constants.ts src/lib/constants.ts.backup
   ```

2. **Check current version:**
   ```bash
   git status
   git log --oneline -5
   ```

3. **Create a new branch (if using Git):**
   ```bash
   git checkout -b content-update-YYYY-MM-DD
   ```

#### **After Making Changes:**

1. **Test your changes:**
   - Start the development server: `npm run dev`
   - Check all pages where you made changes
   - Verify forms still work
   - Test navigation and links

2. **Commit your changes:**
   ```bash
   git add src/data/ src/lib/
   git commit -m "Update content: [describe your changes]"
   ```

3. **Push to remote (if using Git):**
   ```bash
   git push origin content-update-YYYY-MM-DD
   ```

### Content Validation Checklist

#### **After Making Changes, Verify:**

- [ ] **Text displays correctly** on all affected pages
- [ ] **No broken links** in navigation or content
- [ ] **Forms still work** and submit correctly
- [ ] **Images display** with correct paths and alt text
- [ ] **SEO metadata** is updated and accurate
- [ ] **No console errors** in browser developer tools
- [ ] **Mobile responsiveness** is maintained
- [ ] **Accessibility** features still work
- [ ] **Performance** is not degraded
- [ ] **Cross-browser compatibility** is maintained

### Common Content Update Workflows

#### **Regular Content Updates:**

1. **Small text changes:**
   - Edit the appropriate data file
   - Save and test locally
   - Commit and push changes
   - Deploy to production

2. **Adding new content:**
   - Add content to appropriate data file
   - Update metadata if needed
   - Test content displays correctly
   - Commit and push changes
   - Deploy to production

3. **Updating images:**
   - Upload new images to `/public/images/`
   - Update image paths in data files
   - Test images display correctly
   - Commit and push changes
   - Deploy to production

#### **Major Content Updates:**

1. **Content restructuring:**
   - Plan the changes thoroughly
   - Create backup of current content
   - Make changes in stages
   - Test each stage thoroughly
   - Get approval before publishing
   - Deploy with rollback plan

2. **Adding new pages:**
   - Add navigation items
   - Add page metadata
   - Create page components (contact developer)
   - Test navigation and SEO
   - Deploy to production

3. **Updating site structure:**
   - Plan the new structure
   - Update all affected data files
   - Test all pages and navigation
   - Update documentation
   - Deploy to production

### Content Troubleshooting

#### **Common Issues and Solutions:**

**Content not updating:**
- Check if you saved the file
- Clear browser cache
- Restart development server
- Check for syntax errors in the file

**Images not displaying:**
- Verify image file exists in correct location
- Check image path is correct (case-sensitive)
- Ensure image file format is supported
- Check image file size is reasonable

**Forms not working:**
- Check form field names match configuration
- Verify Netlify configuration is correct
- Test form submission process
- Check browser console for errors

**Navigation issues:**
- Verify navigation items are in correct array
- Check href values are correct
- Test all navigation links work
- Ensure no duplicate navigation items

**SEO issues:**
- Check metadata is updated for all pages
- Verify title and description lengths
- Test meta tags appear in page source
- Check structured data is valid

**Performance issues:**
- Optimize image sizes
- Check for unnecessary content loading
- Verify efficient data structures
- Monitor page load times

### Content Security Best Practices

#### **Data Protection:**

1. **Don't include sensitive information:**
   - No passwords or API keys in content files
   - No personal data in content
   - No internal system information

2. **Use environment variables:**
   - Store sensitive configuration in `.env` files
   - Reference environment variables in code
   - Don't commit sensitive data to version control

3. **Validate user input:**
   - Sanitize any user-generated content
   - Validate form inputs
   - Prevent XSS attacks

4. **Regular security audits:**
   - Review content for sensitive information
   - Check for outdated dependencies
   - Monitor for security vulnerabilities

### Content Performance Optimization

#### **Optimization Strategies:**

1. **Image optimization:**
   - Use appropriate image formats (WebP, AVIF)
   - Compress images without quality loss
   - Use responsive images
   - Implement lazy loading

2. **Content structure:**
   - Use efficient data structures
   - Minimize redundant content
   - Optimize for fast loading
   - Use proper caching strategies

3. **SEO optimization:**
   - Optimize meta descriptions
   - Use proper heading structure
   - Include relevant keywords
   - Ensure fast page load times

### Content Analytics and Monitoring

#### **Tracking Content Performance:**

1. **Set up analytics:**
   - Google Analytics for page views
   - Form submission tracking
   - User behavior analysis
   - Conversion tracking

2. **Monitor key metrics:**
   - Page views and time on page
   - Form submission rates
   - Search engine rankings
   - User engagement metrics

3. **Regular reporting:**
   - Weekly performance reviews
   - Monthly content analytics
   - Quarterly strategy assessments
   - Annual comprehensive reports

### Content Collaboration Guidelines

#### **Team Workflow:**

1. **Version control:**
   - Use Git for all content changes
   - Create feature branches for major changes
   - Review content before merging
   - Maintain clear commit messages

2. **Content review process:**
   - Self-review before submission
   - Peer review for accuracy
   - Stakeholder approval
   - Technical validation

3. **Communication:**
   - Document all major changes
   - Communicate updates to team
   - Maintain style guides
   - Regular team meetings

### Emergency Content Procedures

#### **If Content Breaks:**

1. **Immediate response:**
   - Don't panic
   - Identify the issue quickly
   - Assess the impact
   - Communicate to stakeholders

2. **Rollback process:**
   - Revert to last working version
   - Test the rollback thoroughly
   - Document the issue
   - Plan the fix

3. **Recovery:**
   - Implement the fix
   - Test thoroughly
   - Deploy with extra caution
   - Monitor for issues

### Content Training and Documentation

#### **For New Team Members:**

1. **Initial training:**
   - Review this documentation
   - Practice with test content
   - Shadow experienced editors
   - Start with simple changes

2. **Ongoing education:**
   - Stay updated on best practices
   - Attend content strategy workshops
   - Learn from analytics data
   - Share knowledge with team

3. **Documentation maintenance:**
   - Keep documentation updated
   - Add new procedures as needed
   - Regular documentation reviews
   - Version control for documentation

### Content Strategy and Planning

#### **Long-term Planning:**

1. **Content calendar:**
   - Plan content updates in advance
   - Coordinate with business objectives
   - Maintain editorial guidelines
   - Regular content audits

2. **Performance goals:**
   - Set measurable content goals
   - Track progress regularly
   - Optimize based on data
   - Adjust strategy as needed

3. **Continuous improvement:**
   - Regular content audits
   - Performance optimization
   - User experience enhancements
   - Technology integration

---

## 🎯 Summary

This maintenance guide provides comprehensive instructions for managing the Autio Strategies website content. By following these guidelines, you can safely update and maintain the website without technical knowledge while ensuring consistency, quality, and performance.

**Key Principles:**
- Always backup before making changes
- Test thoroughly after updates
- Use version control for all changes
- Follow established patterns and procedures
- Contact developers for technical issues

**Remember:** The goal is to maintain a professional, accurate, and engaging website that effectively communicates Autio Strategies' expertise in AI policy consulting and technology governance. 