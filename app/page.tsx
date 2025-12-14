import { siteContent } from "@/data/content"
import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { Logos } from "@/components/sections/logos"
import { Features } from "@/components/sections/features"
import { Testimonials } from "@/components/sections/testimonials"
import { Pricing } from "@/components/sections/pricing"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar data={siteContent.nav} />
      <Hero data={siteContent.hero} />
      <Logos data={siteContent.logos} />
      <Features data={siteContent.features} />
      <Testimonials data={siteContent.testimonials} />
      <Pricing data={siteContent.pricing} />
      <CTA data={siteContent.cta} />
      <Footer data={siteContent.footer} />
    </main>
  )
}
