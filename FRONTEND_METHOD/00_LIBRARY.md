# Design System - Librairie UI

Ce fichier sert de guide pour creer des composants UI coherents.
Utiliser ces patterns lors de la creation de nouveaux composants.

**Stack** : shadcn/ui + Radix UI + Tailwind CSS + class-variance-authority

---

## Sommaire des Composants

| #  | Composant       | Fichier                          | Dependances                     |
|----|-----------------|----------------------------------|---------------------------------|
| 1  | Utils & Hooks   | `lib/utils.ts`, `hooks/use-mobile.tsx` | clsx, tailwind-merge      |
| 2  | Button          | `components/ui/button.tsx`       | @radix-ui/react-slot            |
| 3  | Badge           | `components/ui/badge.tsx`        | @radix-ui/react-slot            |
| 4  | HoverCard       | `components/ui/hover-card.tsx`   | @radix-ui/react-hover-card      |
| 5  | Input           | `components/ui/input.tsx`        | -                               |
| 6  | NavigationMenu  | `components/ui/navigation-menu.tsx` | @radix-ui/react-navigation-menu |
| 7  | Pagination      | `components/ui/pagination.tsx`   | lucide-react                    |
| 8  | Sidebar         | `components/ui/sidebar.tsx`      | Sheet, Tooltip, Skeleton...     |
| 9  | Slider          | `components/ui/slider.tsx`       | @radix-ui/react-slider          |
| 10 | Switch          | `components/ui/switch.tsx`       | @radix-ui/react-switch          |
| 11 | Tabs            | `components/ui/tabs.tsx`         | @radix-ui/react-tabs            |
| 12 | Textarea        | `components/ui/textarea.tsx`     | -                               |
| 13 | ToggleGroup     | `components/ui/toggle-group.tsx` | @radix-ui/react-toggle-group    |
| 14 | Toggle          | `components/ui/toggle.tsx`       | @radix-ui/react-toggle          |
| 15 | Tooltip         | `components/ui/tooltip.tsx`      | @radix-ui/react-tooltip         |
| 16 | Card            | `components/ui/card.tsx`         | -                               |

---

<!-- ============================================================ -->
<!--                    1. UTILITAIRES & HOOKS                     -->
<!-- ============================================================ -->

## 1. Utilitaires & Hooks

### `lib/utils.ts`

```typescript
// #region Utils
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Fusionne les classes Tailwind en gerant les conflits.
 * @param inputs - Liste de classes CSS (strings, objets, tableaux)
 * @returns Une string de classes fusionnees sans conflits
 * @example cn("px-2 py-1", condition && "bg-primary", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// #endregion
```

### `hooks/use-mobile.tsx`

```typescript
// #region useIsMobile
import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Hook pour detecter si l'ecran est en mode mobile.
 * @returns true si la largeur de l'ecran est < 768px
 * @example const isMobile = useIsMobile()
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
// #endregion
```

<!-- ============================================================ -->
<!--                         2. BUTTON                             -->
<!-- ============================================================ -->

## 2. Button

| Prop      | Type                                           | Default     |
|-----------|------------------------------------------------|-------------|
| variant   | `"default"` \| `"secondary"` \| `"destructive"` \| `"outline"` | `"default"` |
| asChild   | `boolean`                                      | `false`     |
| className | `string`                                       | -           |

### `components/ui/button.tsx`

```typescript
// #region Button
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
        destructive: "",
        outline: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

/**
 * Composant Button avec variants.
 * @param variant - Style du bouton (default, secondary, destructive, outline)
 * @param asChild - Si true, rend le composant enfant comme bouton
 */
function Button({ className, variant, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
// #endregion
```

<!-- ============================================================ -->
<!--                          3. BADGE                             -->
<!-- ============================================================ -->

## 3. Badge

| Prop      | Type                                           | Default     |
|-----------|------------------------------------------------|-------------|
| variant   | `"default"` \| `"secondary"` \| `"destructive"` \| `"outline"` | `"default"` |
| asChild   | `boolean`                                      | `false`     |

### `components/ui/badge.tsx`

```typescript
// #region Badge
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "",
        secondary: "",
        destructive: "",
        outline: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

/**
 * Composant Badge pour afficher des etiquettes/tags.
 * @param variant - Style du badge
 * @param asChild - Si true, rend le composant enfant comme badge
 */
function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span"
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
// #endregion
```

<!-- ============================================================ -->
<!--                        4. HOVERCARD                           -->
<!-- ============================================================ -->

## 4. HoverCard

| Export            | Description                          |
|-------------------|--------------------------------------|
| HoverCard         | Conteneur racine                     |
| HoverCardTrigger  | Element declencheur (hover)          |
| HoverCardContent  | Contenu affiche au survol            |

### `components/ui/hover-card.tsx`

```typescript
// #region HoverCard
"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { cn } from "@/lib/utils"

/**
 * Conteneur racine du HoverCard.
 */
function HoverCard({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}

/**
 * Element qui declenche l'affichage du contenu au survol.
 */
function HoverCardTrigger({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

/**
 * Contenu affiche dans la carte au survol.
 * @param align - Alignement du contenu (center, start, end)
 * @param sideOffset - Distance du trigger en pixels
 */
function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
// #endregion
```

<!-- ============================================================ -->
<!--                          5. INPUT                             -->
<!-- ============================================================ -->

## 5. Input

| Prop      | Type     | Description                    |
|-----------|----------|--------------------------------|
| type      | `string` | Type de l'input (text, email...) |
| className | `string` | Classes CSS additionnelles      |
| ...props  | -        | Tous les props natifs `<input>` |

### `components/ui/input.tsx`

```typescript
// #region Input
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Composant Input stylise.
 * Accepte tous les props natifs de l'element input HTML.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
// #endregion
```

<!-- ============================================================ -->
<!--                     6. NAVIGATIONMENU                         -->
<!-- ============================================================ -->

## 6. NavigationMenu

| Export                    | Description                              |
|---------------------------|------------------------------------------|
| NavigationMenu            | Conteneur racine                         |
| NavigationMenuList        | Liste des items de navigation            |
| NavigationMenuItem        | Item individuel                          |
| NavigationMenuTrigger     | Bouton declencheur avec chevron          |
| NavigationMenuContent     | Contenu du dropdown                      |
| NavigationMenuLink        | Lien de navigation                       |
| NavigationMenuViewport    | Zone d'affichage du contenu              |
| NavigationMenuIndicator   | Indicateur visuel                        |
| navigationMenuTriggerStyle| Style CVA pour le trigger                |

### `components/ui/navigation-menu.tsx`

```typescript
// #region NavigationMenu
import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Conteneur racine du menu de navigation.
 * @param viewport - Afficher le viewport (default: true)
 */
function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

/**
 * Liste des elements du menu.
 */
function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      )}
      {...props}
    />
  )
}

/**
 * Item individuel du menu.
 */
function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium disabled:pointer-events-none disabled:opacity-50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
)

/**
 * Bouton declencheur avec chevron anime.
 */
function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

/**
 * Contenu du dropdown avec animations.
 */
function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        className
      )}
      {...props}
    />
  )
}

/**
 * Zone d'affichage du contenu du menu.
 */
function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className={cn("absolute top-full left-0 isolate z-50 flex justify-center")}>
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
          className
        )}
        {...props}
      />
    </div>
  )
}

/**
 * Lien de navigation stylise.
 */
function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Indicateur visuel anime.
 */
function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
// #endregion
```

<!-- ============================================================ -->
<!--                       7. PAGINATION                           -->
<!-- ============================================================ -->

## 7. Pagination

| Export              | Description                        |
|---------------------|------------------------------------|
| Pagination          | Conteneur nav                      |
| PaginationContent   | Liste ul des items                 |
| PaginationItem      | Item li                            |
| PaginationLink      | Lien de page                       |
| PaginationPrevious  | Bouton precedent                   |
| PaginationNext      | Bouton suivant                     |
| PaginationEllipsis  | Indicateur "..."                   |

### `components/ui/pagination.tsx`

```typescript
// #region Pagination
import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants, type Button } from "@/components/ui/button"

/**
 * Conteneur de navigation pour la pagination.
 */
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

/**
 * Liste des elements de pagination.
 */
function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

/**
 * Item de pagination.
 */
function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

/**
 * Lien de pagination.
 * @param isActive - Si true, indique la page courante
 */
function PaginationLink({ className, isActive, size = "icon", ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({ variant: isActive ? "outline" : "ghost", size }),
        className
      )}
      {...props}
    />
  )
}

/**
 * Bouton page precedente.
 */
function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

/**
 * Bouton page suivante.
 */
function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

/**
 * Indicateur d'ellipsis (...).
 */
function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
// #endregion
```

<!-- ============================================================ -->
<!--                         8. SIDEBAR                            -->
<!-- ============================================================ -->

## 8. Sidebar

| Export              | Description                              |
|---------------------|------------------------------------------|
| SidebarProvider     | Provider avec context et state           |
| Sidebar             | Conteneur principal                      |
| SidebarTrigger      | Bouton toggle                            |
| SidebarRail         | Zone cliquable pour toggle               |
| SidebarInset        | Zone de contenu principal                |
| SidebarHeader       | En-tete de la sidebar                    |
| SidebarFooter       | Pied de la sidebar                       |
| SidebarContent      | Zone de contenu scrollable               |
| SidebarGroup        | Groupe de menu                           |
| SidebarGroupLabel   | Label du groupe                          |
| SidebarMenu         | Liste ul de menu                         |
| SidebarMenuItem     | Item li de menu                          |
| SidebarMenuButton   | Bouton de menu avec variants             |
| useSidebar          | Hook pour acceder au context             |

| Prop (Sidebar) | Type                                    | Default      |
|----------------|-----------------------------------------|--------------|
| side           | `"left"` \| `"right"`                   | `"left"`     |
| variant        | `"sidebar"` \| `"floating"` \| `"inset"` | `"sidebar"` |
| collapsible    | `"offcanvas"` \| `"icon"` \| `"none"`   | `"offcanvas"`|

### `components/ui/sidebar.tsx`

```typescript
// #region Sidebar
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeftIcon } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

/**
 * Hook pour acceder au context de la sidebar.
 * @returns { state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }
 */
function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

/**
 * Provider de la sidebar avec gestion du state et raccourci clavier (Ctrl+B).
 * @param defaultOpen - Etat initial (default: true)
 */
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({ state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={{ "--sidebar-width": SIDEBAR_WIDTH, "--sidebar-width-icon": SIDEBAR_WIDTH_ICON, ...style } as React.CSSProperties}
          className={cn("group/sidebar-wrapper flex min-h-svh w-full", className)}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

/**
 * Conteneur principal de la sidebar.
 * @param side - Cote d'affichage (left, right)
 * @param variant - Style (sidebar, floating, inset)
 * @param collapsible - Mode de collapse (offcanvas, icon, none)
 */
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div data-slot="sidebar" className={cn("flex h-full w-(--sidebar-width) flex-col", className)} {...props}>
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="w-(--sidebar-width) p-0 [&>button]:hidden"
          style={{ "--sidebar-width": SIDEBAR_WIDTH_MOBILE } as React.CSSProperties}
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--sidebar-width) transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

/** Bouton pour toggle la sidebar. */
function SidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()
  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => { onClick?.(event); toggleSidebar() }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()
  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return <Input data-slot="sidebar-input" data-sidebar="input" className={cn("h-8 w-full shadow-none", className)} {...props} />
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-header" data-sidebar="header" className={cn("flex flex-col gap-2 p-2", className)} {...props} />
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-footer" data-sidebar="footer" className={cn("flex flex-col gap-2 p-2", className)} {...props} />
}

function SidebarSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator data-slot="sidebar-separator" data-sidebar="separator" className={cn("mx-2 w-auto", className)} {...props} />
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className)}
      {...props}
    />
  )
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-group" data-sidebar="group" className={cn("relative flex w-full min-w-0 flex-col p-2", className)} {...props} />
}

function SidebarGroupLabel({ className, asChild = false, ...props }: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupAction({ className, asChild = false, ...props }: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-group-content" data-sidebar="group-content" className={cn("w-full text-sm", className)} {...props} />
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="sidebar-menu" data-sidebar="menu" className={cn("flex w-full min-w-0 flex-col gap-1", className)} {...props} />
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="sidebar-menu-item" data-sidebar="menu-item" className={cn("group/menu-item relative", className)} {...props} />
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-[width,height,padding] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: { default: "", outline: "shadow-[0_0_0_1px_hsl(var(--sidebar-border))]" },
      size: { default: "h-8 text-sm", sm: "h-7 text-xs", lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!" },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

/**
 * Bouton de menu avec support tooltip en mode collapsed.
 * @param isActive - Indique si le bouton est actif
 * @param tooltip - Texte ou props du tooltip
 */
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) return button
  if (typeof tooltip === "string") tooltip = { children: tooltip }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile} {...tooltip} />
    </Tooltip>
  )
}

function SidebarMenuAction({ className, asChild = false, showOnHover = false, ...props }: React.ComponentProps<"button"> & { asChild?: boolean; showOnHover?: boolean }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1 peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuBadge({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-data-[size=sm]/menu-button:top-1 peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuSkeleton({ className, showIcon = false, ...props }: React.ComponentProps<"div"> & { showIcon?: boolean }) {
  const width = React.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, [])
  return (
    <div data-slot="sidebar-menu-skeleton" data-sidebar="menu-skeleton" className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)} {...props}>
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton className="h-4 max-w-(--skeleton-width) flex-1" data-sidebar="menu-skeleton-text" style={{ "--skeleton-width": width } as React.CSSProperties} />
    </div>
  )
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5 group-data-[collapsible=icon]:hidden", className)}
      {...props}
    />
  )
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="sidebar-menu-sub-item" data-sidebar="menu-sub-item" className={cn("group/menu-sub-item relative", className)} {...props} />
}

function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean; size?: "sm" | "md"; isActive?: boolean }) {
  const Comp = asChild ? Slot : "a"
  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

export {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton,
  SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider,
  SidebarRail, SidebarSeparator, SidebarTrigger, useSidebar,
}
// #endregion
```

<!-- ============================================================ -->
<!--                          9. SLIDER                            -->
<!-- ============================================================ -->

## 9. Slider

| Prop         | Type       | Default | Description                   |
|--------------|------------|---------|-------------------------------|
| min          | `number`   | `0`     | Valeur minimum                |
| max          | `number`   | `100`   | Valeur maximum                |
| value        | `number[]` | -       | Valeur(s) controlee(s)        |
| defaultValue | `number[]` | -       | Valeur(s) par defaut          |

### `components/ui/slider.tsx`

```typescript
// #region Slider
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

/**
 * Composant Slider avec support multi-thumb.
 * @param min - Valeur minimum
 * @param max - Valeur maximum
 */
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track data-slot="slider-track" className="relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5">
        <SliderPrimitive.Range data-slot="slider-range" className="absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
// #endregion
```

<!-- ============================================================ -->
<!--                         10. SWITCH                            -->
<!-- ============================================================ -->

## 10. Switch

| Prop      | Type      | Description              |
|-----------|-----------|--------------------------|
| checked   | `boolean` | Etat controle            |
| onCheckedChange | `(checked: boolean) => void` | Callback |

### `components/ui/switch.tsx`

```typescript
// #region Switch
"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

/**
 * Composant Switch (toggle on/off).
 */
function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
// #endregion
```

<!-- ============================================================ -->
<!--                          11. TABS                             -->
<!-- ============================================================ -->

## 11. Tabs

| Export       | Description                    |
|--------------|--------------------------------|
| Tabs         | Conteneur racine               |
| TabsList     | Liste des onglets              |
| TabsTrigger  | Bouton d'onglet                |
| TabsContent  | Contenu de l'onglet            |

### `components/ui/tabs.tsx`

```typescript
// #region Tabs
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

/**
 * Conteneur racine des tabs.
 */
function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-2", className)} {...props} />
}

/**
 * Liste des onglets.
 */
function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn("inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]", className)}
      {...props}
    />
  )
}

/**
 * Bouton d'onglet individuel.
 */
function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * Contenu de l'onglet.
 */
function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
// #endregion
```

<!-- ============================================================ -->
<!--                        12. TEXTAREA                           -->
<!-- ============================================================ -->

## 12. Textarea

| Prop      | Type     | Description                       |
|-----------|----------|-----------------------------------|
| className | `string` | Classes CSS additionnelles        |
| ...props  | -        | Tous les props natifs `<textarea>` |

### `components/ui/textarea.tsx`

```typescript
// #region Textarea
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Composant Textarea stylise.
 * Accepte tous les props natifs de l'element textarea HTML.
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
// #endregion
```

<!-- ============================================================ -->
<!--                       13. TOGGLEGROUP                         -->
<!-- ============================================================ -->

## 13. ToggleGroup

| Prop    | Type                           | Default     |
|---------|--------------------------------|-------------|
| variant | `"default"` \| `"outline"`     | `"default"` |
| size    | `"default"` \| `"sm"` \| `"lg"` | `"default"` |
| spacing | `number`                       | `0`         |

### `components/ui/toggle-group.tsx`

```typescript
// #region ToggleGroup
"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants> & { spacing?: number }>({
  size: "default",
  variant: "default",
  spacing: 0,
})

/**
 * Groupe de toggles mutuellement exclusifs ou multiples.
 * @param variant - Style des toggles
 * @param size - Taille des toggles
 * @param spacing - Espacement entre les toggles (0 = attaches)
 */
function ToggleGroup({
  className, variant, size, spacing = 0, children, ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants> & { spacing?: number }) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn("group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs", className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

/**
 * Item individuel du groupe.
 */
function ToggleGroupItem({
  className, children, variant, size, ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        toggleVariants({ variant: context.variant || variant, size: context.size || size }),
        "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10",
        "data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
// #endregion
```

<!-- ============================================================ -->
<!--                         14. TOGGLE                            -->
<!-- ============================================================ -->

## 14. Toggle

| Prop    | Type                           | Default     |
|---------|--------------------------------|-------------|
| variant | `"default"` \| `"outline"`     | `"default"` |
| size    | `"default"` \| `"sm"` \| `"lg"` | `"default"` |
| pressed | `boolean`                      | -           |

### `components/ui/toggle.tsx`

```typescript
// #region Toggle
"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] whitespace-nowrap",
  {
    variants: {
      variant: { default: "bg-transparent", outline: "border bg-transparent shadow-xs" },
      size: { default: "h-9 px-2 min-w-9", sm: "h-8 px-1.5 min-w-8", lg: "h-10 px-2.5 min-w-10" },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

/**
 * Bouton toggle on/off.
 * @param variant - Style du toggle
 * @param size - Taille du toggle
 */
function Toggle({
  className, variant, size, ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return <TogglePrimitive.Root data-slot="toggle" className={cn(toggleVariants({ variant, size, className }))} {...props} />
}

export { Toggle, toggleVariants }
// #endregion
```

<!-- ============================================================ -->
<!--                         15. TOOLTIP                           -->
<!-- ============================================================ -->

## 15. Tooltip

| Export          | Description                     |
|-----------------|---------------------------------|
| Tooltip         | Conteneur avec provider         |
| TooltipTrigger  | Element declencheur             |
| TooltipContent  | Contenu du tooltip              |
| TooltipProvider | Provider pour config globale    |

### `components/ui/tooltip.tsx`

```typescript
// #region Tooltip
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

/**
 * Provider pour la configuration globale des tooltips.
 * @param delayDuration - Delai avant affichage (default: 0)
 */
function TooltipProvider({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />
}

/**
 * Conteneur du tooltip avec provider integre.
 */
function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

/**
 * Element qui declenche l'affichage du tooltip.
 */
function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

/**
 * Contenu affiche dans le tooltip.
 * @param sideOffset - Distance du trigger en pixels
 */
function TooltipContent({ className, sideOffset = 0, children, ...props }: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
// #endregion
```

<!-- ============================================================ -->
<!--                          16. CARD                             -->
<!-- ============================================================ -->

## 16. Card

| Export          | Description                     |
|-----------------|---------------------------------|
| Card            | Conteneur principal             |
| CardHeader      | En-tete avec grille auto        |
| CardTitle       | Titre de la carte               |
| CardDescription | Description sous le titre       |
| CardAction      | Zone d'action (boutons)         |
| CardContent     | Contenu principal               |
| CardFooter      | Pied de la carte                |

### `components/ui/card.tsx`

```typescript
// #region Card
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Conteneur principal de la carte.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * En-tete de la carte avec support grille.
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Titre de la carte.
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Description de la carte.
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm", className)}
      {...props}
    />
  )
}

/**
 * Zone d'action (positionnee en haut a droite du header).
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Contenu principal de la carte.
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

/**
 * Pied de la carte.
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
// #endregion
```
