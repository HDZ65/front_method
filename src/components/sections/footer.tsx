"use client"

import * as React from "react"
import Link from "next/link"
import { Icon } from "@/components/ui/icon"
import type { FooterSection } from "@/types"

interface FooterProps {
  data: FooterSection
}

export function Footer({ data }: FooterProps) {
  return (
    <footer className="border-t border-white/5 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Logo & Tagline */}
          <div className="col-span-2">
            <Link href="/" className="text-xl font-semibold text-zinc-50">
              {data.logo.text}
            </Link>
            <p className="text-sm text-zinc-500 mt-2 max-w-xs">
              {data.logo.tagline}
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {data.social.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                  aria-label={social.label}
                >
                  <Icon name={social.icon} size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {data.columns.map((column) => (
            <div key={column.title}>
              <h4 className="font-medium text-zinc-50 mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
                      {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      {link.label}
                      {link.icon && <Icon name={link.icon} size={12} className="text-violet-400" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-600">{data.bottom.copyright}</p>
          <div className="flex gap-6">
            {data.bottom.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
