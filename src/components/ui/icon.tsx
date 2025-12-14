import * as React from "react"
import { icons, type LucideProps } from "lucide-react"
import { cn } from "@/lib/utils"

interface IconProps extends LucideProps {
  name: string
}

function Icon({ name, size = 20, className, ...props }: IconProps) {
  const LucideIcon = icons[name as keyof typeof icons]

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in Lucide icons`)
    return null
  }

  return <LucideIcon size={size} className={cn("shrink-0", className)} {...props} />
}

export { Icon }
