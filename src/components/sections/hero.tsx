"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@/components/ui/icon"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import type { HeroSection } from "@/types"

interface HeroProps {
  data: HeroSection
}

export function Hero({ data }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Glow Orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-[120px] animate-glow-pulse" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16 text-center"
      >
        {/* Badge */}
        <motion.div variants={fadeInUp}>
          <Badge variant="primary" className="mb-6">
            {data.badge.icon && <Icon name={data.badge.icon} size={14} />}
            {data.badge.text}
          </Badge>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeInUp}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-zinc-50">{data.title.text}</span>
          {data.title.highlight && (
            <>
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                {data.title.highlight}
              </span>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          {data.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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
        </motion.div>

        {/* Social Proof */}
        {data.socialProof && (
          <motion.div variants={fadeInUp} className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              {/* Avatars */}
              <div className="flex -space-x-2">
                {data.socialProof.avatars.slice(0, 5).map((avatar, i) => (
                  <Image
                    key={i}
                    src={avatar}
                    alt=""
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full border-2 border-zinc-950"
                  />
                ))}
              </div>

              {/* Rating */}
              {data.socialProof.rating && (
                <div className="flex items-center gap-1 ml-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(data.socialProof!.rating!.value) ? "fill-yellow-500 text-yellow-500" : "text-zinc-600"}
                    />
                  ))}
                  <span className="text-sm text-zinc-400 ml-1">{data.socialProof.rating.count}</span>
                </div>
              )}
            </div>
            <p className="text-sm text-zinc-500">{data.socialProof.text}</p>
          </motion.div>
        )}

        {/* Metrics */}
        {data.metrics && data.metrics.length > 0 && (
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-white/5"
          >
            {data.metrics.map((metric, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  {metric.icon && <Icon name={metric.icon} size={16} className="text-violet-400" />}
                  <span className="text-2xl font-bold text-zinc-50">{metric.value}</span>
                </div>
                <span className="text-sm text-zinc-500">{metric.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
