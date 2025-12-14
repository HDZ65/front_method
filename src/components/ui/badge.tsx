import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-white/[0.05] text-zinc-300 border border-white/10",
        primary: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
        secondary: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
        success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        outline: "border border-white/10 text-zinc-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
