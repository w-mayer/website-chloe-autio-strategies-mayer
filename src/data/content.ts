export const siteContent = {
  // Global site information
  site: {
    name: 'Autio Strategies',
    tagline: 'AI Policy Consulting & Technology Governance',
    description: 'Professional technology governance and regulatory compliance advisory for government and enterprise organizations',
    email: 'chloe@autiostrategies.com',
    github: 'https://github.com/w-mayer/chloe-autio-strategies',
    website: 'https://autiostrategies.com',
  },

  // Navigation
  navigation: {
    items: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Services', href: '/services' },
      { name: 'Insights', href: '/insights' },
      { name: 'Contact', href: '/contact' },
    ],
  },



  // Services section
  services: {
    title: 'Our Services',
    learnMore: 'Learn More',
  },

  // Client logos section
  clientLogos: {
    title: 'Trusted by Leading Organizations',
    logos: [
      { 
        name: 'Cohere', 
        image: '/images/partner_logos/optimized/Cohere-Logo.webp',
        alt: 'Cohere Logo',
        size: 'extra-large'
      },
      { 
        name: 'Department of Defense', 
        image: '/images/partner_logos/optimized/DoD-Logo-Stacked.webp',
        alt: 'Department of Defense Logo',
        size: 'large'
      },
      { 
        name: 'NIST', 
        image: '/images/partner_logos/optimized/f_nist-logo-brand-black.webp',
        alt: 'NIST Logo',
        size: 'extra-large'
      },
      { 
        name: 'Google Cloud Platform', 
        image: '/images/partner_logos/optimized/Google_Cloud_Platform-Logo.webp',
        alt: 'Google Cloud Platform Logo',
        size: 'extra-large'
      },
      { 
        name: 'Google DeepMind', 
        image: '/images/partner_logos/optimized/Google_DeepMind_logo.webp',
        alt: 'Google DeepMind Logo',
        size: 'large'
      },
      { 
        name: 'Meta', 
        image: '/images/partner_logos/optimized/Meta-Logo.webp',
        alt: 'Meta Logo',
        size: 'standard'
      },
      { 
        name: 'OECD', 
        image: '/images/partner_logos/optimized/OCED.webp',
        alt: 'OECD Logo',
        size: 'standard'
      },
      { 
        name: 'Uber', 
        image: '/images/partner_logos/optimized/Uber_logo_2018.webp',
        alt: 'Uber Logo',
        size: 'standard'
      },
    ],
  },

  // Testimonials section
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
      {
        quote: 'Their data analytics expertise unlocked new opportunities for us. Professional and results-driven.',
        name: 'Sam Patel',
        role: 'COO, FinEdge',
      },
    ],
  },

  // Value proposition section
  valueProposition: {
    title: 'Our Value Add',
    cards: [
      {
        title: 'AI Policy Expertise',
        description: 'Proven track record of advising governments, Fortune 500s, and startups on responsible AI, data governance, and emerging tech policy.',
      },
      {
        title: 'Global Perspectives',
        description: 'Experience working with international organizations to shape global standards and best practices.',
      },
      {
        title: 'Demonstrated Outcomes',
        description: 'Trusted by leading organizations to deliver actionable insights, drive compliance, and enable responsible innovation in AI and technology.',
      },
    ],
  },

    // Contact CTA section
    contactCTA: {
      title: 'Ready to Transform Your Organization?',
      description:
        "Let's discuss how our expertise in AI policy, technology governance, and regulatory compliance can help your organization navigate the complexities of the digital age.",
      buttons: {
        primary: { text: 'Contact Us', href: '/contact' },
        secondary: { text: 'Learn More', href: '/services' },
      },
      background: {
        image: '/images/stocks/optimized/cta-background.webp',
        alt: 'Professional consulting background',
        variants: {
          small: '/images/stocks/optimized/cta-background-small.webp',
          medium: '/images/stocks/optimized/cta-background-medium.webp',
          large: '/images/stocks/optimized/cta-background-large.webp',
        },
      },
      logo: {
        image: '/images/logo/optimized/AutioStrategies_Logo_AllWhite_Horz.webp',
        alt: 'Autio Strategies Logo',
      },
    },



  // Footer
  footer: {
    builtBy: 'Built by',
    sourceCode: 'The source code is available on',
    contact: {
      email: { text: 'Email', href: 'mailto:chloe@autiostrategies.com' },
      linkedin: { text: 'LinkedIn', href: 'https://www.linkedin.com/company/autio-strategies' },
      phone: { text: 'Phone', href: 'tel:+12024556599', number: '+1 (202) 455-6599' },
    },
    logo: {
      src: '/images/logo/optimized/AutioStrategies_Logo_FullColor_JustMark.webp',
      alt: 'Autio Strategies Mark',
    },
  },

  // Header
  header: {
    logo: {
      src: '/images/logo/optimized/AutioStrategies_Logo_FullColor_Horz (1).webp',
      alt: 'Autio Strategies Logo',
    },
    mobileMenu: {
      openButton: { text: 'Open menu', ariaLabel: 'Open menu' },
    },
  },

  // Resources
  resources: {
    'us-ai-policy-brief': {
      title: 'U.S. Federal AI Policy Brief',
      subtitle: 'Comprehensive analysis of U.S. federal AI policy developments and regulatory implications',
    },
  },

  // Forms
  forms: {
    contact: {
      title: 'Contact Form',
      netlifyName: 'contact',
      fields: {
        name: { 
          label: 'Full Name', 
          placeholder: 'Enter your full name.',
          error: 'Name must be at least 2 characters and contain only letters, spaces, hyphens, apostrophes, and periods',
          help: 'Enter your first and last name.',
          maxLength: 100,
        },
        email: { 
          label: 'Email Address', 
          placeholder: 'Enter your email address.',
          error: 'Please enter a valid email address (no + addresses)',
          help: 'We\'ll use this to respond to your inquiry.',
          maxLength: 254,
        },
        services: { 
          label: 'Services of Interest', 
          placeholder: 'Select services you\'re interested in.',
          error: 'Please select at least one service (up to 10 services allowed)',
          help: 'You can select multiple services.',
          other: 'Other',
          otherPlaceholder: "Describe the service you're interested in (max 200 characters)",
          maxSelections: 10,
        },
        message: { 
          label: 'Message', 
          placeholder: 'Tell us about your project or inquiry...',
          error: 'Message must be at least 10 characters and less than 2000 characters (no links allowed).',
          help: '',
          minLength: 10,
          maxLength: 2000,
        },
      },
      buttons: {
        submit: { text: 'Send Message', loading: 'Sending...' },
      },
      success: 'Thank you for your message!',
      loading: 'Contact form loading',
    },
    newsletter: {
      title: 'Newsletter Signup',
      netlifyName: 'newsletter',
      description: 'Stay updated with the latest insights in AI policy and technology governance.',
      placeholder: 'Enter your email address.',
      button: { text: 'Subscribe', loading: 'Subscribing...' },
      success: 'Thank you for subscribing!',
      error: 'Please enter a valid email address.',
    },
  },

  // Privacy page
  // (Removed privacy hero section)

  // Common UI elements
  ui: {
    buttons: {
      learnMore: 'Learn More',
      contactUs: 'Contact Us',
      getStarted: 'Get Started',
      readMore: 'Read More',
      exploreAllServices: 'Explore All Services',
      learnAboutTeam: 'Learn About Our Team',
      exploreServices: 'Explore Our Services',
    },
    loading: {
      loading: 'Loading...',
      sending: 'Sending...',
      submitting: 'Submitting...',
    },
    errors: {
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      minLength: 'Must be at least {min} characters',
      maxLength: 'Must be no more than {max} characters',
    },
    aria: {
      closeMenu: 'Close menu',
      openMenu: 'Open menu',
      learnMoreAbout: 'Learn more about',
    },
    cta: {
      readyToGetStarted: 'Ready to Get Started?',
      needExpertGuidance: 'Need Expert Guidance?',
      discussExpertise: "Let's discuss how our expertise can help your organization achieve its goals.",
      discussServices: "Let's discuss how our comprehensive suite of services can help your organization navigate AI policy and governance challenges.",
      putInsightsIntoAction: "Ready to put these insights into action? Let's discuss how our expertise can help your organization navigate AI policy and governance challenges.",
    },
    pages: {
      contact: {
        title: 'Contact Us',
      },
      services: {
        title: 'Our Services',
        description: 'Autio Strategies offers a comprehensive suite of services designed to empower government and enterprise clients to navigate the evolving landscape of AI and technology policy with confidence and clarity.',
      },
      resources: {
        title: 'Insights & Thought Leadership',
        description: 'Explore our featured articles and curated resources on AI policy, governance, and regulatory topics.',
      },

    },
    navigation: {
      backToResources: '← Back to Insights',
    },
    sharing: {
      shareArticle: 'Share this article:',
      shareCaseStudy: 'Share this case study:',
      shareBrief: 'Share this brief:',
      shareOnLinkedIn: 'Share on LinkedIn',
    },
    sections: {
      relatedArticles: 'Related Articles',
      featuredArticles: 'Featured Articles',
      policyBriefs: 'Policy Briefs',
      caseStudies: 'Case Studies',
      resourceLibrary: 'Insights Library',
      serviceDetails: 'Service Details',
      keyBenefits: 'Key Benefits',
      ourMethodology: 'Our Methodology',
      relatedServices: 'Related Services',
    },
  },


}; 