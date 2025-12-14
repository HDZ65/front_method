"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, X, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import type { PricingSection, PricingPlan } from "@/types"

interface PricingProps {
  data: PricingSection
}

function PricingCard({ plan, isYearly, index }: { plan: PricingPlan; isYearly: boolean; index: number }) {
  const price = isYearly ? plan.price.yearly : plan.price.monthly

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={cn(plan.highlighted && "md:-mt-4 md:mb-4")}
    >
      <Card
        className={cn(
          "h-full flex flex-col relative",
          plan.highlighted && "border-violet-500/30 shadow-[0_0_40px_rgba(139,92,246,0.15)]"
        )}
        glow={plan.highlighted}
      >
        {/* Badge */}
        {plan.badge && (
          <Badge variant="primary" className="absolute -top-3 left-1/2 -translate-x-1/2">
            {plan.badge}
          </Badge>
        )}

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-zinc-50 mb-2">{plan.name}</h3>
          <p className="text-sm text-zinc-400">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-zinc-50">
              {price === 0 ? "Free" : `${plan.price.currency}${price}`}
            </span>
            {price > 0 && <span className="text-zinc-500">{plan.period}</span>}
          </div>
          {plan.trial && (
            <p className="text-sm text-zinc-500 mt-2">{plan.trial}</p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-3 mb-8 flex-grow">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              {feature.included ? (
                <Check size={18} className={cn("mt-0.5 shrink-0", feature.highlight ? "text-violet-400" : "text-emerald-400")} />
              ) : (
                <X size={18} className="text-zinc-600 mt-0.5 shrink-0" />
              )}
              <span className={cn(
                "text-sm",
                feature.included ? (feature.highlight ? "text-zinc-50" : "text-zinc-300") : "text-zinc-600"
              )}>
                {feature.text}
              </span>
              {feature.tooltip && (
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle size={14} className="text-zinc-600 hover:text-zinc-400" />
                  </TooltipTrigger>
                  <TooltipContent>{feature.tooltip}</TooltipContent>
                </Tooltip>
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          variant={plan.highlighted ? "default" : "secondary"}
          className="w-full"
          asChild
        >
          <Link href={plan.cta.href}>{plan.cta.label}</Link>
        </Button>
      </Card>
    </motion.div>
  )
}

export function Pricing({ data }: PricingProps) {
  const [isYearly, setIsYearly] = React.useState(true)

  return (
    <section id="pricing" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
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

        {/* Billing Toggle */}
        {data.billingToggle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <span className={cn("text-sm", !isYearly ? "text-zinc-50" : "text-zinc-500")}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={cn(
                "relative w-12 h-6 rounded-full transition-colors",
                isYearly ? "bg-violet-600" : "bg-zinc-700"
              )}
            >
              <span
                className={cn(
                  "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                  isYearly ? "left-7" : "left-1"
                )}
              />
            </button>
            <span className={cn("text-sm", isYearly ? "text-zinc-50" : "text-zinc-500")}>
              Yearly <Badge variant="success" className="ml-2">Save 20%</Badge>
            </span>
          </motion.div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {data.plans.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} isYearly={isYearly} index={i} />
          ))}
        </div>

        {/* Guarantee */}
        {data.guarantee && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-zinc-500 mt-12"
          >
            {data.guarantee}
          </motion.p>
        )}
      </div>
    </section>
  )
}
