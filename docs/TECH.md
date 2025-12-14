# TECHNICAL SPECIFICATION — NEXUS

## 1. INSTALLATION STRATEGY

### Core
```bash
npm install clsx tailwind-merge lucide-react
```

### UX Polish
```bash
npm install @radix-ui/react-tooltip @radix-ui/react-slot
```

### Animation (SPA Moderne)
```bash
npm install framer-motion
```

### High-End Utils
```bash
npm install date-fns class-variance-authority
```

### Full Install Command
```bash
npm install clsx tailwind-merge lucide-react @radix-ui/react-tooltip @radix-ui/react-slot framer-motion date-fns class-variance-authority
```

---

## 2. TAILWIND CONFIGURATION GUIDELINES

### Colors & Fonts
Mappage strict vers `DESIGN.md`. Aucune valeur HEX en dur dans les composants.

```typescript
// tailwind.config.ts - Extension du theme
{
  theme: {
    extend: {
      colors: {
        // Surfaces - voir DESIGN.md Section 2
        surface: {
          DEFAULT: 'rgba(255,255,255,0.02)',
          hover: 'rgba(255,255,255,0.04)',
          active: 'rgba(255,255,255,0.06)',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          hover: 'rgba(255,255,255,0.15)',
        },
        glow: {
          primary: 'rgba(139,92,246,0.4)',
          secondary: 'rgba(99,102,241,0.3)',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'Consolas', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 8s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    }
  }
}
```

### Spacing Dense
Echelle fine pour gerer la densite :
- `gap-1` (4px) - Tags, inline elements
- `gap-2` (8px) - Metadonnees, small groups
- `gap-3` (12px) - Related content
- `gap-4` (16px) - Standard spacing
- `gap-6` (24px) - Section internal
- `gap-8` (32px) - Major separations

---

## 3. DATA ARCHITECTURE (Rich Types)

> **PHILOSOPHIE** : Chaque interface doit permettre de raconter une histoire complete. Pas de champs simples quand on peut avoir des objets riches.

### src/types/index.ts

```typescript
// ============================================
// PRIMITIVES ENRICHIS
// ============================================

export interface RichText {
  text: string
  highlight?: string  // Partie a mettre en couleur accent
}

export interface RichDate {
  raw: string         // ISO string
  formatted: string   // "15 Janvier 2024"
  relative: string    // "Il y a 3 jours"
}

export interface RichAuthor {
  name: string
  avatar: string      // URL (Picsum ou UI Avatars)
  role: string
  company?: string
  href?: string       // Lien vers profil
}

export interface RichImage {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface RichLink {
  label: string
  href: string
  icon?: string       // Nom icone Lucide
  external?: boolean
}

export interface RichStat {
  value: string       // "98.4%" pas "98%"
  label: string
  icon?: string
  trend?: 'up' | 'down' | 'neutral'
}

// ============================================
// NAVIGATION
// ============================================

export interface NavItem {
  label: string
  href: string
  icon?: string
  badge?: string      // "New", "Beta"
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

// ============================================
// HERO SECTION
// ============================================

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
    avatars: string[]           // URLs des avatars
    text: string                // "Rejoint par 2,000+ equipes"
    rating?: {
      value: number             // 4.9
      count: string             // "500+ avis"
    }
  }
  metrics?: RichStat[]          // Stats hero optionnelles
}

// ============================================
// LOGOS / TRUST BAR
// ============================================

export interface LogoItem {
  name: string
  src: string         // URL du logo
  href?: string
}

export interface LogosSection {
  title?: string      // "Ils nous font confiance"
  logos: LogoItem[]
}

// ============================================
// FEATURES
// ============================================

export interface Feature {
  id: string
  icon: string        // Nom icone Lucide
  title: string
  description: string
  benefits?: string[] // Liste de points cles (3-4 max)
  stat?: RichStat     // "99.9% uptime"
  link?: RichLink     // "En savoir plus ->"
  image?: RichImage   // Illustration optionnelle
  size: 'default' | 'large' | 'wide'
  highlight?: boolean // Mise en avant visuelle
}

export interface FeaturesSection {
  badge?: string
  title: RichText
  subtitle: string
  features: Feature[]
  layout: 'bento' | 'grid' | 'list'
}

// ============================================
// TESTIMONIALS
// ============================================

export interface Testimonial {
  id: string
  quote: string       // Le temoignage complet
  highlight?: string  // Phrase cle a mettre en avant
  author: RichAuthor
  rating?: number     // 1-5 etoiles
  date?: RichDate
  metrics?: {
    label: string     // "Productivite"
    before: string    // "2h/jour"
    after: string     // "15min/jour"
    improvement: string // "+87%"
  }
  featured?: boolean
}

export interface TestimonialsSection {
  badge?: string
  title: RichText
  subtitle: string
  testimonials: Testimonial[]
}

// ============================================
// PRICING
// ============================================

export interface PricingFeature {
  text: string
  included: boolean
  tooltip?: string    // Info supplementaire
  highlight?: boolean // Feature mise en avant
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
    currency: string  // "$", "EUR"
  }
  period: string      // "/mois", "/utilisateur/mois"
  features: PricingFeature[]
  cta: RichLink
  badge?: string      // "Populaire", "Meilleur rapport"
  highlighted?: boolean
  trial?: string      // "14 jours gratuits"
}

export interface PricingSection {
  badge?: string
  title: RichText
  subtitle: string
  billingToggle?: boolean  // Switch mensuel/annuel
  plans: PricingPlan[]
  guarantee?: string  // "Satisfait ou rembourse 30 jours"
}

// ============================================
// CTA SECTION
// ============================================

export interface CTASection {
  title: RichText
  subtitle: string
  ctas: {
    primary: RichLink
    secondary?: RichLink
  }
  features?: string[] // Points cles rapides
  image?: RichImage
}

// ============================================
// FOOTER
// ============================================

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

// ============================================
// PAGE DATA (Agregation)
// ============================================

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
```

---

## 4. COMPONENT TREE

### Atoms (src/components/ui/)

| Composant | Fichier | Props | Notes |
|-----------|---------|-------|-------|
| **Button** | `button.tsx` | `variant`, `size`, `loading`, `icon` | CVA variants, loading spinner |
| **Badge** | `badge.tsx` | `variant`, `size`, `icon` | Pour tags, statuts, labels |
| **Card** | `card.tsx` | `variant`, `hover`, `glow` | Avec hover glow effect |
| **Avatar** | `avatar.tsx` | `src`, `fallback`, `size` | Fallback initiales |
| **Skeleton** | `skeleton.tsx` | `variant` | text, circle, card, image |
| **Tooltip** | `tooltip.tsx` | - | Wrapper Radix |
| **Icon** | `icon.tsx` | `name`, `size` | Wrapper Lucide dynamique |

### Molecules (src/components/)

| Composant | Fichier | Usage |
|-----------|---------|-------|
| **MetadataRow** | `metadata-row.tsx` | Auteur + Date + Read time |
| **StatCard** | `stat-card.tsx` | Stat avec icone et trend |
| **AuthorCard** | `author-card.tsx` | Avatar + Nom + Role + Company |
| **FeatureCard** | `feature-card.tsx` | Feature avec variantes de taille |
| **TestimonialCard** | `testimonial-card.tsx` | Quote + Author + Metrics |
| **PricingCard** | `pricing-card.tsx` | Plan complet avec features |
| **LogoMarquee** | `logo-marquee.tsx` | Scroll infini logos |

### Sections (src/components/sections/)

| Section | Fichier | Interface |
|---------|---------|-----------|
| **Navbar** | `navbar.tsx` | `NavData` |
| **Hero** | `hero.tsx` | `HeroSection` |
| **Logos** | `logos.tsx` | `LogosSection` |
| **Features** | `features.tsx` | `FeaturesSection` |
| **Testimonials** | `testimonials.tsx` | `TestimonialsSection` |
| **Pricing** | `pricing.tsx` | `PricingSection` |
| **CTA** | `cta.tsx` | `CTASection` |
| **Footer** | `footer.tsx` | `FooterSection` |

---

## 5. UX & INTERACTION STRATEGY

### Loading States (Skeletons)

```typescript
// Chaque composant avec data async doit avoir son skeleton
// Le skeleton DOIT matcher la forme exacte du contenu final

// Exemple: TestimonialCard Skeleton
<div className="animate-pulse">
  <Skeleton variant="text" className="h-4 w-3/4 mb-2" />
  <Skeleton variant="text" className="h-4 w-full mb-2" />
  <Skeleton variant="text" className="h-4 w-2/3 mb-4" />
  <div className="flex items-center gap-3">
    <Skeleton variant="circle" className="w-10 h-10" />
    <div>
      <Skeleton variant="text" className="h-3 w-24 mb-1" />
      <Skeleton variant="text" className="h-3 w-32" />
    </div>
  </div>
</div>
```

### Micro-interactions (Framer Motion)

```typescript
// src/lib/animations.ts

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export const scaleOnHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98 }
}

export const glowOnHover = {
  rest: { boxShadow: '0 0 0 rgba(139,92,246,0)' },
  hover: { boxShadow: '0 0 30px rgba(139,92,246,0.2)' }
}

// Scroll reveal wrapper
export const scrollReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}
```

### Focus & Accessibilite

```typescript
// Classes standard pour focus visible
const focusClasses = "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"

// Tous les elements interactifs DOIVENT avoir:
// 1. focus-visible ring
// 2. aria-label si icon-only
// 3. Tooltip si tronque ou icon
```

### Tooltips (Obligatoires)

| Element | Tooltip |
|---------|---------|
| Icons sans label | Description de l'action |
| Texte tronque | Texte complet |
| Stats | Explication de la metrique |
| Badges | Signification du badge |

### Smooth Scroll & Navigation

```typescript
// Smooth scroll pour ancres internes
<Link href="#features" scroll={false} onClick={(e) => {
  e.preventDefault()
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
}}>

// Sticky navbar avec transition
const [scrolled, setScrolled] = useState(false)
useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 20)
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

className={cn(
  "fixed top-0 w-full z-50 transition-all duration-300",
  scrolled ? "bg-zinc-950/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
)}
```

---

## 6. UTILITIES

### src/lib/utils.ts

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### src/lib/formatters.ts

```typescript
import { formatDistanceToNow, format } from "date-fns"
import { fr } from "date-fns/locale"

export function formatDate(date: string | Date): {
  formatted: string
  relative: string
} {
  const d = new Date(date)
  return {
    formatted: format(d, "d MMMM yyyy", { locale: fr }),
    relative: formatDistanceToNow(d, { addSuffix: true, locale: fr })
  }
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
  return num.toString()
}

export function formatCurrency(amount: number, currency = "$"): string {
  return `${currency}${amount.toLocaleString()}`
}
```

---

## 7. IMPLEMENTATION STEPS

### Phase 1 : Setup
1. [ ] `npm install` toutes les dependances
2. [ ] Configurer `tailwind.config.ts` (mappage DESIGN.md)
3. [ ] Setup fonts dans `layout.tsx` (`next/font/google`)
4. [ ] Creer `src/lib/utils.ts` (cn helper)
5. [ ] Creer `src/lib/formatters.ts`
6. [ ] Creer `src/lib/animations.ts`

### Phase 2 : Types & Data
7. [ ] Creer `src/types/index.ts` avec Rich Types complets
8. [ ] Creer `src/data/content.ts` avec donnees DENSES
9. [ ] **AUDIT** : Verifier zero champ vide, zero Lorem Ipsum

### Phase 3 : UI Components
10. [ ] `Button` avec variants CVA
11. [ ] `Badge` avec variants
12. [ ] `Card` avec hover glow
13. [ ] `Avatar` avec fallback
14. [ ] `Skeleton` (text, circle, card)
15. [ ] `Tooltip` wrapper Radix
16. [ ] `Icon` wrapper Lucide

### Phase 4 : Molecules
17. [ ] `MetadataRow`
18. [ ] `StatCard`
19. [ ] `AuthorCard`
20. [ ] `FeatureCard` (3 tailles)
21. [ ] `TestimonialCard`
22. [ ] `PricingCard`

### Phase 5 : Sections
23. [ ] `Navbar` (sticky, glass, scroll-aware)
24. [ ] `Hero` (badge, title, CTAs, social proof)
25. [ ] `Logos` (marquee ou grid)
26. [ ] `Features` (bento grid)
27. [ ] `Testimonials` (masonry-like)
28. [ ] `Pricing` (3 plans, toggle)
29. [ ] `CTA` (glow background)
30. [ ] `Footer` (multi-colonnes)

### Phase 6 : Assembly
31. [ ] Composer `page.tsx`
32. [ ] Ajouter scroll animations (Framer Motion)
33. [ ] Tester responsive (mobile, tablet, desktop)
34. [ ] **AUDIT FINAL** : Aucune zone vide

---

## 8. QUALITY CHECKLIST

### Densite
- [ ] Toutes les cards ont auteur + date + stats
- [ ] Les testimonials ont des metriques (before/after)
- [ ] Les features ont des benefits lists
- [ ] Le pricing a des tooltips sur les features

### UX Polish
- [ ] Skeletons pour tous les composants avec images
- [ ] Tooltips sur tous les icons
- [ ] Focus visible sur tous les interactifs
- [ ] Micro-interactions hover/tap

### Performance
- [ ] Images optimisees (next/image ou URLs externes)
- [ ] Fonts preloaded
- [ ] Animations GPU-accelerated (transform, opacity)

### Accessibilite
- [ ] Contraste suffisant (WCAG AA)
- [ ] aria-labels sur icons
- [ ] Keyboard navigation
- [ ] Focus trapping modales

---

## 9. FILES TO CREATE

```
src/
├── types/
│   └── index.ts              # Rich Types
├── lib/
│   ├── utils.ts              # cn() helper
│   ├── formatters.ts         # Date, number formatters
│   └── animations.ts         # Framer Motion variants
├── data/
│   └── content.ts            # Site content (DENSE)
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── avatar.tsx
│   │   ├── skeleton.tsx
│   │   ├── tooltip.tsx
│   │   └── icon.tsx
│   ├── metadata-row.tsx
│   ├── stat-card.tsx
│   ├── author-card.tsx
│   ├── feature-card.tsx
│   ├── testimonial-card.tsx
│   ├── pricing-card.tsx
│   └── sections/
│       ├── navbar.tsx
│       ├── hero.tsx
│       ├── logos.tsx
│       ├── features.tsx
│       ├── testimonials.tsx
│       ├── pricing.tsx
│       ├── cta.tsx
│       └── footer.tsx
└── app/
    ├── layout.tsx            # Fonts, metadata
    ├── page.tsx              # Assembled sections
    └── globals.css           # Tailwind + custom CSS
```
