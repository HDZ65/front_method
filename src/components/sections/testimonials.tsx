"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { fadeInUp } from "@/lib/animations"
import type { TestimonialsSection, Testimonial } from "@/types"

interface TestimonialsProps {
  data: TestimonialsSection
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={cn(testimonial.featured && "md:col-span-2")}
    >
      <Card className="h-full relative" glow={testimonial.featured}>
        {/* Quote Icon */}
        <Quote size={32} className="absolute top-6 right-6 text-violet-500/10" />

        {/* Rating */}
        {testimonial.rating && (
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < testimonial.rating! ? "fill-yellow-500 text-yellow-500" : "text-zinc-700"}
              />
            ))}
          </div>
        )}

        {/* Quote */}
        <blockquote className="text-zinc-300 mb-6 leading-relaxed">
          "{testimonial.quote}"
        </blockquote>

        {/* Metrics */}
        {testimonial.metrics && (
          <div className="flex items-center gap-4 mb-6 p-3 bg-violet-500/5 rounded-lg border border-violet-500/10">
            <div className="text-center">
              <div className="text-xs text-zinc-500 mb-1">Before</div>
              <div className="text-sm font-medium text-zinc-400">{testimonial.metrics.before}</div>
            </div>
            <div className="text-violet-400 font-bold">→</div>
            <div className="text-center">
              <div className="text-xs text-zinc-500 mb-1">After</div>
              <div className="text-sm font-medium text-zinc-50">{testimonial.metrics.after}</div>
            </div>
            <div className="ml-auto">
              <Badge variant="success">{testimonial.metrics.improvement}</Badge>
            </div>
          </div>
        )}

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          <Image
            src={testimonial.author.avatar}
            alt={testimonial.author.name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-medium text-zinc-50">{testimonial.author.name}</div>
            <div className="text-sm text-zinc-500">
              {testimonial.author.role}
              {testimonial.author.company && ` @ ${testimonial.author.company}`}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export function Testimonials({ data }: TestimonialsProps) {
  return (
    <section className="py-24 bg-zinc-950/50">
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

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {data.testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
