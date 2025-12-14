import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circle" | "card"
}

function Skeleton({ className, variant = "text", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-skeleton bg-white/[0.08] rounded",
        variant === "circle" && "rounded-full",
        variant === "card" && "rounded-2xl",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
