# DESIGN SYSTEM SPECIFICATION — NEXUS

## 1. DESIGN MANIFESTO

> **Vision Artistique** : Nexus incarne l'esthetique "Dark SaaS" dans sa forme la plus raffinee — celle que Linear a popularisee et que les meilleurs produits tech adoptent. Un fond noir profond qui ne fatigue pas l'oeil, des accents violets electriques qui guident le regard, et cette sensation de profondeur creee par des lueurs subtiles. L'objectif est de transmettre innovation, precision et confiance. Chaque pixel respire la technologie premium. Le "Delight" vient des micro-interactions fluides et des lueurs qui reagissent au survol.

---

## 2. COLOR PALETTE

### Couleurs Principales
| Role | HEX | Tailwind Class | Usage |
|------|-----|----------------|-------|
| **Background** | `#09090B` | `bg-zinc-950` | Fond principal, sections |
| **Foreground** | `#FAFAFA` | `text-zinc-50` | Texte principal |
| **Primary** | `#8B5CF6` | `text-violet-500` | CTAs, accents, liens |
| **Primary Hover** | `#A78BFA` | `text-violet-400` | Etats hover |
| **Secondary** | `#6366F1` | `text-indigo-500` | Accents secondaires |
| **Muted** | `#71717A` | `text-zinc-500` | Texte secondaire, labels |
| **Muted Foreground** | `#A1A1AA` | `text-zinc-400` | Texte desactive |

### Couleurs de Profondeur (Layering)
| Role | Valeur | Usage |
|------|--------|-------|
| **Surface Level 1** | `#0F0F12` | Cards, navbars |
| **Surface Level 2** | `#18181B` | Modales, dropdowns |
| **Surface Level 3** | `#27272A` | Inputs, elements interactifs |
| **Border Light** | `rgba(255,255,255,0.08)` | Bordures subtiles |
| **Border Hover** | `rgba(255,255,255,0.15)` | Bordures au hover |
| **Glow Primary** | `rgba(139,92,246,0.4)` | Lueurs violettes |
| **Glow Secondary** | `rgba(99,102,241,0.3)` | Lueurs indigo |

### Gradients Signature
```css
--gradient-hero: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.15), transparent);
--gradient-card: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%);
--gradient-glow: radial-gradient(circle at center, rgba(139,92,246,0.25) 0%, transparent 70%);
--gradient-mesh: radial-gradient(at 40% 20%, rgba(139,92,246,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(99,102,241,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(139,92,246,0.1) 0px, transparent 50%);
```

---

## 3. TYPOGRAPHY

### Polices
| Usage | Font | Fallback |
|-------|------|----------|
| **Headings** | Inter | system-ui, sans-serif |
| **Body** | Inter | system-ui, sans-serif |
| **Mono** | JetBrains Mono | Consolas, monospace |

### Echelle Typographique
| Element | Size | Weight | Tracking | Line-Height |
|---------|------|--------|----------|-------------|
| **H1 (Hero)** | 4rem / 64px | 700 (Bold) | -0.02em | 1.1 |
| **H2** | 2.5rem / 40px | 600 (Semibold) | -0.01em | 1.2 |
| **H3** | 1.5rem / 24px | 600 (Semibold) | 0 | 1.3 |
| **Body** | 1rem / 16px | 400 (Regular) | 0 | 1.6 |
| **Body Large** | 1.125rem / 18px | 400 (Regular) | 0 | 1.6 |
| **Small** | 0.875rem / 14px | 500 (Medium) | 0.01em | 1.5 |
| **Tiny** | 0.75rem / 12px | 500 (Medium) | 0.02em | 1.4 |

### Regles Typographiques
- Les titres H1 et H2 utilisent un tracking negatif pour un rendu plus "tight" et premium
- Le texte Muted utilise `text-zinc-400` et non `text-zinc-500` pour une meilleure lisibilite sur fond noir
- Les badges et labels utilisent `uppercase` avec `tracking-wider`
- Max-width pour le body text : `max-w-prose` (65ch) pour une lisibilite optimale

---

## 4. DEPTH & LIGHT SYSTEM

### Philosophie
Approche **"Layered Dark"** — la profondeur est creee par des variations subtiles de noir/gris et des bordures semi-transparentes. Les ombres sont remplacees par des **lueurs (glow)** sur les elements importants. Les surfaces sont definies par leurs bordures plutot que par des ombres portees.

### Shadows
```css
--shadow-sm: 0 0 0 1px rgba(255,255,255,0.05);
--shadow-md: 0 0 0 1px rgba(255,255,255,0.08), 0 4px 6px -1px rgba(0,0,0,0.4);
--shadow-lg: 0 0 0 1px rgba(255,255,255,0.1), 0 10px 15px -3px rgba(0,0,0,0.5);
--shadow-glow-sm: 0 0 20px rgba(139,92,246,0.15);
--shadow-glow-md: 0 0 40px rgba(139,92,246,0.2);
--shadow-glow-lg: 0 0 60px rgba(139,92,246,0.25);
```

### Bordures
```css
/* Pattern principal : bordure subtile + fond leger */
.surface {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.08);
}

.surface:hover {
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.15);
}

/* Bordure avec glow pour CTAs */
.glow-border {
  box-shadow: 0 0 20px rgba(139,92,246,0.3), inset 0 0 20px rgba(139,92,246,0.1);
}
```

### Glass/Blur Effects
| Effet | Classes/CSS | Usage |
|-------|-------------|-------|
| **Navbar Glass** | `backdrop-blur-xl bg-zinc-950/80 border-b border-white/5` | Navbar fixe |
| **Card Glass** | `backdrop-blur-md bg-white/[0.02] border border-white/[0.08]` | Cards premium |
| **Modal Overlay** | `backdrop-blur-sm bg-black/60` | Fond de modales |

---

## 5. MICRO-INTERACTIONS

### Etats Interactifs
| State | Transformation | Timing |
|-------|---------------|--------|
| **Hover** | `translateY(-2px)` + border-color change + glow | `200ms ease-out` |
| **Active** | `scale(0.98)` | `100ms ease-in` |
| **Focus** | `ring-2 ring-violet-500/50 ring-offset-2 ring-offset-zinc-950` | `150ms` |
| **Disabled** | `opacity-50 cursor-not-allowed` | - |

### Bouton Primaire
```tsx
className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-violet-600 rounded-lg transition-all duration-200 hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed"
```

### Bouton Secondaire (Ghost)
```tsx
className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-zinc-300 bg-transparent border border-white/10 rounded-lg transition-all duration-200 hover:bg-white/5 hover:border-white/20 hover:text-white active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/20"
```

### Carte Standard
```tsx
className="group relative p-6 bg-white/[0.02] border border-white/[0.08] rounded-2xl transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.15] hover:-translate-y-1"
```

### Lien avec Fleche
```tsx
className="inline-flex items-center gap-2 text-violet-400 font-medium transition-all duration-200 hover:text-violet-300 hover:gap-3"
```

---

## 6. COMPONENT PHYSICS

### Border Radius
| Element | Valeur | Classe Tailwind |
|---------|--------|-----------------|
| **Boutons** | 8px | `rounded-lg` |
| **Cartes** | 16px | `rounded-2xl` |
| **Inputs** | 8px | `rounded-lg` |
| **Modales** | 24px | `rounded-3xl` |
| **Pills/Tags** | 9999px | `rounded-full` |
| **Avatars** | 9999px | `rounded-full` |

### Spacing Philosophy
Grille **8pt** avec approche **aeree**. Le whitespace genereux est crucial pour le style Dark SaaS — il cree une sensation de luxe et de clarte.

### Spacing Tokens
| Usage | Valeur |
|-------|--------|
| **Card padding** | `p-6` (24px) ou `p-8` (32px) |
| **Section padding Y** | `py-24` (96px) ou `py-32` (128px) |
| **Section padding X** | `px-6` mobile, `px-8` desktop |
| **Container max-width** | `max-w-6xl` (1152px) |
| **Element gaps** | `gap-4` (16px) standard, `gap-6` (24px) large |
| **Between sections** | `space-y-24` ou `space-y-32` |
| **Grid gaps** | `gap-6` (24px) ou `gap-8` (32px) |

---

## 7. ANIMATION & MOTION

### Style Global
**Snappy & Smooth** — les animations sont rapides mais pas brutales. L'easing `ease-out` domine pour une sensation de reactivite. Les animations de reveal utilisent `spring` via Framer Motion pour un effet naturel.

### Timing Functions
```ts
const easings = {
  default: "cubic-bezier(0.4, 0, 0.2, 1)",    // ease-out doux
  snappy: "cubic-bezier(0.4, 0, 0, 1)",       // plus rapide
  spring: { type: "spring", stiffness: 300, damping: 30 },
  smooth: "cubic-bezier(0.22, 1, 0.36, 1)",   // ease-out-expo
}
```

### Animations Standards
| Animation | Config Framer Motion | Usage |
|-----------|---------------------|-------|
| **Fade In Up** | `{ opacity: 0, y: 20 } -> { opacity: 1, y: 0 }` duration: 0.5 | Reveal sections |
| **Fade In** | `{ opacity: 0 } -> { opacity: 1 }` duration: 0.3 | Elements subtils |
| **Scale In** | `{ opacity: 0, scale: 0.95 } -> { opacity: 1, scale: 1 }` | Modales, cards |
| **Stagger Children** | `staggerChildren: 0.1` | Listes, grilles |
| **Glow Pulse** | `{ opacity: [0.5, 1, 0.5] }` duration: 2, repeat: Infinity | Elements actifs |

### Scroll Animations
```ts
// Configuration IntersectionObserver / Framer Motion
const scrollReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}
```

---

## 8. TEXTURES & MATERIALS

### Texture Choisie
**Noise Grain + Mesh Gradient** — un grain subtil sur le fond ajoute de la texture sans distraire, tandis que les mesh gradients violets/indigo creent une atmosphere immersive dans le hero.

### Implementation
```css
/* Grain overlay */
.grain::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  z-index: 1000;
}

/* Mesh gradient pour hero */
.mesh-gradient {
  background:
    radial-gradient(at 40% 20%, rgba(139,92,246,0.15) 0px, transparent 50%),
    radial-gradient(at 80% 0%, rgba(99,102,241,0.1) 0px, transparent 50%),
    radial-gradient(at 0% 50%, rgba(139,92,246,0.1) 0px, transparent 50%),
    radial-gradient(at 80% 80%, rgba(99,102,241,0.08) 0px, transparent 50%);
}
```

---

## 9. ASSETS & ICONS

### Icons
| Library | Config |
|---------|--------|
| **Lucide React** | `strokeWidth: 1.5`, size: 20px default, 24px large |

### Images
| Propriete | Valeur |
|-----------|--------|
| **Style** | Photos avec overlay sombre, illustrations minimalistes |
| **Traitement** | `brightness(0.9) contrast(1.1)` + overlay gradient |
| **Aspect Ratios** | Hero: 16:9, Cards: 3:2, Thumbnails: 1:1 |
| **Placeholder Service** | Picsum Photos, UI Avatars |

---

## 10. SIGNATURE ELEMENTS (The "Cherry on Top")

### Element 1 : Glow Orb
| Propriete | Specification |
|-----------|---------------|
| **Type** | Gradient orb / Blob anime |
| **Description** | Un orbe lumineux violet/indigo qui pulse doucement en arriere-plan du hero, creant une atmosphere futuriste |
| **Implementation** | CSS radial-gradient avec animation keyframe pour le pulse, ou SVG blur |
| **Ou l'appliquer** | Hero section, CTA section |

```css
.glow-orb {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%);
  filter: blur(80px);
  animation: pulse 8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}
```

### Element 2 : Grid Pattern
| Propriete | Specification |
|-----------|---------------|
| **Type** | Grid overlay / Dot pattern |
| **Description** | Une grille de points ou de lignes tres subtile en arriere-plan, visible surtout dans le hero, qui ajoute de la profondeur sans distraire |
| **Implementation** | CSS background-image avec SVG inline ou gradient repeating |
| **Ou l'appliquer** | Hero background, sections alternees |

```css
.grid-pattern {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}
```

### Element 3 : Hover Glow Cards
| Propriete | Specification |
|-----------|---------------|
| **Type** | Interactive glow effect |
| **Description** | Les cards emettent une lueur violette subtile au hover, avec un gradient qui suit la position de la souris |
| **Implementation** | CSS box-shadow transition + optionnel: JS pour mouse-follow gradient |
| **Ou l'appliquer** | Feature cards, Pricing cards, Testimonial cards |

```tsx
// Classe de base
className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"

// Glow interne (pseudo-element)
<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent" />
```

---

## 11. SECTION BLUEPRINT

### NAVBAR
| Propriete | Specification |
|-----------|---------------|
| **Position** | `fixed top-0 w-full z-50` |
| **Style** | Glass effect: `backdrop-blur-xl bg-zinc-950/80 border-b border-white/5` |
| **Hauteur** | `h-16` (64px) |
| **Elements** | Logo (gauche) / Nav links (centre) / CTA button (droite) |
| **Animation** | Apparait au scroll-up, disparait au scroll-down (hide-on-scroll) |
| **Container** | `max-w-6xl mx-auto px-6` |

### HERO
| Propriete | Specification |
|-----------|---------------|
| **Layout** | Centre, single column, `text-center` |
| **Contenu Principal** | Badge anime (pill) + H1 (64px) + Subtitle (18px, muted) |
| **Contenu Secondaire** | 2 boutons (Primary + Ghost) + Social proof mini (avatars + texte) |
| **Background** | Mesh gradient + Grid pattern + Glow orb anime |
| **Animation** | Stagger reveal: Badge -> H1 -> Subtitle -> Buttons -> Social proof |
| **Height** | `min-h-screen` avec content centre verticalement |

### LOGOS (Trust Bar)
| Propriete | Specification |
|-----------|---------------|
| **Layout** | Horizontal scroll ou grid wrap |
| **Contenu** | 6-8 logos de clients/partenaires en grayscale |
| **Style** | `opacity-40 hover:opacity-70 transition-opacity grayscale` |
| **Animation** | Fade in au scroll, optionnel: infinite scroll marquee |
| **Spacing** | `py-16`, logos `gap-12` |

### FEATURES
| Propriete | Specification |
|-----------|---------------|
| **Layout** | Bento Grid asymetrique (2 grandes + 4 petites) OU 3 colonnes |
| **Contenu** | Icon + Title (H3) + Description + optionnel: illustration |
| **Style** | Cards avec hover glow effect, icones en `text-violet-400` |
| **Animation** | Stagger reveal des cards au scroll |
| **Spacing** | `py-24`, grid `gap-6` |

### TESTIMONIALS
| Propriete | Specification |
|-----------|---------------|
| **Layout** | Grid 3 colonnes (masonry-like avec hauteurs variees) |
| **Contenu** | Quote + Avatar + Nom + Role/Company + optionnel: rating stars |
| **Style** | Cards avec bordure subtile, quote marks en `text-violet-500/20` |
| **Animation** | Fade in up au scroll, stagger |
| **Spacing** | `py-24`, grid `gap-6` |

### PRICING
| Propriete | Specification |
|-----------|---------------|
| **Layout** | 3 colonnes centrees, plan du milieu mis en avant |
| **Contenu** | Plan name + Price + Billing period + Features list + CTA |
| **Style** | Plan populaire: bordure violette + glow + badge "Popular" |
| **Animation** | Scale in au scroll, plan central legerement plus grand |
| **Spacing** | `py-24`, cards `gap-8` |

### CTA (Call to Action Final)
| Propriete | Specification |
|-----------|---------------|
| **Layout** | Pleine largeur, centre |
| **Contenu** | H2 impactant + Subtitle + 1-2 boutons |
| **Background** | Gradient violet subtil + glow orb |
| **Style** | Section qui "pop" visuellement par rapport au reste |
| **Animation** | Parallax subtil sur le glow, fade in du contenu |
| **Spacing** | `py-32` |

### FOOTER
| Propriete | Specification |
|-----------|---------------|
| **Layout** | 4-5 colonnes: Logo+tagline, Product, Company, Resources, Legal |
| **Contenu** | Links organises par categorie + Social icons + Copyright |
| **Style** | Fond `bg-zinc-950` avec bordure top `border-t border-white/5` |
| **Spacing** | `py-16`, colonnes `gap-8` |
