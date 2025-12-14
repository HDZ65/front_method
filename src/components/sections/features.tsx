"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Icon } from "@/components/ui/icon"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import type { FeaturesSection, Feature } from "@/types"

interface FeaturesProps {
  data: FeaturesSection
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={cn(
        feature.size === "large" && "md:col-span-2 md:row-span-2",
        feature.size === "wide" && "md:col-span-2"
      )}
    >
      <Card
        glow={feature.highlight}
        className={cn(
          "h-full flex flex-col",
          feature.highlight && "border-violet-500/20"
        )}
      >
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
          <Icon name={feature.icon} size={20} className="text-violet-400" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-zinc-50 mb-2">{feature.title}</h3>

        {/* Description */}
        <p className="text-sm text-zinc-400 mb-4 flex-grow">{feature.description}</p>

        {/* Benefits */}
        {feature.benefits && feature.benefits.length > 0 && (
          <ul className="space-y-2 mb-4">
            {feature.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="text-violet-400 mt-0.5">-</span>
                {benefit}
              </li>
            ))}
          </ul>
        )}

        {/* Stat */}
        {feature.stat && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-white/[0.02] rounded-lg border border-white/5">
            {feature.stat.icon && <Icon name={feature.stat.icon} size={16} className="text-violet-400" />}
            <span className="text-lg font-bold text-zinc-50">{feature.stat.value}</span>
            <span className="text-sm text-zinc-500">{feature.stat.label}</span>
          </div>
        )}

        {/* Image */}
        {feature.image && (
          <div className="relative mt-4 rounded-lg overflow-hidden border border-white/5">
            <Image
              src={feature.image.src}
              alt={feature.image.alt}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent" />
          </div>
        )}

        {/* Link */}
        {feature.link && (
          <Link
            href={feature.link.href}
            className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 mt-4 transition-colors group"
          >
            {feature.link.label}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </Card>
    </motion.div>
  )
}

export function Features({ data }: FeaturesProps) {
  return (
    <section id="features" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {data.badge && (
            <Badge variant="default" className="mb-4">
              {data.badge}
            </Badge>
          )}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-zinc-50">{data.title.text} </span>
            {data.title.highlight && (
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                {data.title.highlight}
              </span>
            )}
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">{data.subtitle}</p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {data.features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
