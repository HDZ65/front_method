"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import type { LogosSection } from "@/types"

interface LogosProps {
  data: LogosSection
}

export function Logos({ data }: LogosProps) {
  return (
    <section className="py-16 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        {data.title && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-zinc-500 mb-8"
          >
            {data.title}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8"
        >
          {data.logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="opacity-40 hover:opacity-70 transition-opacity grayscale hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
