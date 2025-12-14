"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Badge } from "@/components/ui/badge"
import type { NavData } from "@/types"

interface NavbarProps {
  data: NavData
}

export function Navbar({ data }: NavbarProps) {
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-zinc-950/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white font-semibold text-lg">
          {data.logo.icon && <Icon name={data.logo.icon} size={24} className="text-violet-500" />}
          <span>{data.logo.text}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {data.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
            >
              {item.label}
              {item.badge && (
                <Badge variant="primary" className="text-[10px] py-0 px-1.5">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button size="sm" asChild>
            <Link href={data.cta.href}>{data.cta.label}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-white/5"
        >
          <div className="px-6 py-4 space-y-4">
            {data.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm text-zinc-400 hover:text-white py-2"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button className="w-full" asChild>
              <Link href={data.cta.href}>{data.cta.label}</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
