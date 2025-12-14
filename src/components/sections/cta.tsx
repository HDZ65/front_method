"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { fadeInUp } from "@/lib/animations"
import type { CTASection } from "@/types"

interface CTAProps {
  data: CTASection
}

export function CTA({ data }: CTAProps) {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-violet-950/20 to-zinc-950" />

      {/* Glow Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/15 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-zinc-50">{data.title.text} </span>
            {data.title.highlight && (
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                {data.title.highlight}
              </span>
            )}
          </h2>

          <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
            {data.subtitle}
          </p>

          {/* Features */}
          {data.features && data.features.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {data.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                  <Check size={16} className="text-emerald-400" />
                  {feature}
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href={data.ctas.primary.href} className="gap-2">
                {data.ctas.primary.label}
                {data.ctas.primary.icon && <Icon name={data.ctas.primary.icon} size={18} />}
              </Link>
            </Button>
            {data.ctas.secondary && (
              <Button size="lg" variant="secondary" asChild>
                <Link href={data.ctas.secondary.href}>
                  {data.ctas.secondary.label}
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
