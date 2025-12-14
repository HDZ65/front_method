// Rich Primitives
export interface RichText {
  text: string
  highlight?: string
}

export interface RichLink {
  label: string
  href: string
  icon?: string
  external?: boolean
}

export interface RichStat {
  value: string
  label: string
  icon?: string
  trend?: 'up' | 'down' | 'neutral'
}

export interface RichImage {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface RichAuthor {
  name: string
  avatar: string
  role: string
  company?: string
  href?: string
}

export interface RichDate {
  raw: string
  formatted: string
  relative: string
}

// Navigation
export interface NavItem {
  label: string
  href: string
  icon?: string
  badge?: string
  children?: NavItem[]
}

export interface NavData {
  logo: {
    text: string
    icon?: string
  }
  items: NavItem[]
  cta: {
    label: string
    href: string
  }
}

// Hero Section
export interface HeroBadge {
  text: string
  icon?: string
  variant: 'new' | 'update' | 'announcement'
}

export interface HeroSection {
  badge: HeroBadge
  title: RichText
  subtitle: string
  ctas: {
    primary: RichLink
    secondary?: RichLink
  }
  socialProof?: {
    avatars: string[]
    text: string
    rating?: {
      value: number
      count: string
    }
  }
  metrics?: RichStat[]
}

// Logos Section
export interface LogoItem {
  name: string
  src: string
  href?: string
}

export interface LogosSection {
  title?: string
  logos: LogoItem[]
}

// Features Section
export interface Feature {
  id: string
  icon: string
  title: string
  description: string
  benefits?: string[]
  stat?: RichStat
  link?: RichLink
  image?: RichImage
  size: 'default' | 'large' | 'wide'
  highlight?: boolean
}

export interface FeaturesSection {
  badge?: string
  title: RichText
  subtitle: string
  features: Feature[]
  layout: 'bento' | 'grid' | 'list'
}

// Testimonials Section
export interface Testimonial {
  id: string
  quote: string
  highlight?: string
  author: RichAuthor
  rating?: number
  date?: RichDate
  metrics?: {
    label: string
    before: string
    after: string
    improvement: string
  }
  featured?: boolean
}

export interface TestimonialsSection {
  badge?: string
  title: RichText
  subtitle: string
  testimonials: Testimonial[]
}

// Pricing Section
export interface PricingFeature {
  text: string
  included: boolean
  tooltip?: string
  highlight?: boolean
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
    currency: string
  }
  period: string
  features: PricingFeature[]
  cta: RichLink
  badge?: string
  highlighted?: boolean
  trial?: string
}

export interface PricingSection {
  badge?: string
  title: RichText
  subtitle: string
  billingToggle?: boolean
  plans: PricingPlan[]
  guarantee?: string
}

// CTA Section
export interface CTASection {
  title: RichText
  subtitle: string
  ctas: {
    primary: RichLink
    secondary?: RichLink
  }
  features?: string[]
  image?: RichImage
}

// Footer Section
export interface FooterColumn {
  title: string
  links: RichLink[]
}

export interface FooterSection {
  logo: {
    text: string
    tagline: string
  }
  columns: FooterColumn[]
  social: {
    icon: string
    href: string
    label: string
  }[]
  bottom: {
    copyright: string
    links: RichLink[]
  }
}

// Site Content Aggregation
export interface SiteContent {
  meta: {
    title: string
    description: string
    ogImage?: string
  }
  nav: NavData
  hero: HeroSection
  logos: LogosSection
  features: FeaturesSection
  testimonials: TestimonialsSection
  pricing: PricingSection
  cta: CTASection
  footer: FooterSection
}
