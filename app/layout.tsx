import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { siteContent } from '@/data/content'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: siteContent.meta.title,
  description: siteContent.meta.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased grain`}>{children}</body>
    </html>
  )
}
