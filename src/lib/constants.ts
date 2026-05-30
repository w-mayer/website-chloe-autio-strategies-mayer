// Site metadata
type SiteMeta = {
  title: string;
  description: string;
  url: string;
};

export const siteMeta: SiteMeta = {
  title: "Autio Strategies",
  description: "Professional tech policy consulting for the digital age.",
  url: "https://autiostrategies.com",
};

// Navigation menu
type NavItem = {
  label: string;
  href: string;
};

export const navMenu: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

// Social media links
type SocialLink = {
  platform: string;
  url: string;
};

export const socialLinks: SocialLink[] = [
  { platform: "Email", url: "mailto:info@autiostrategies.com" },
];

// Contact information
type ContactInfo = {
  email: string;
  phone?: string;
  address?: string;
};

export const contactInfo: ContactInfo = {
  email: "info@autiostrategies.com",
}; 