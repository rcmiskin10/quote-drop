import { Zap, Globe, Bell, BarChart, Palette, Receipt } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  external?: boolean
}

export interface FooterLink {
  title: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
}

export interface HeroContent {
  badge: string
  headline: string
  headlineHighlight: string
  subheadline: string
  primaryCta: { text: string; href: string }
  secondaryCta: { text: string; href: string }
  socialProof?: { text: string; rating: string }
}

export interface SiteConfig {
  name: string
  tagline: string
  description: string
  url: string
  company: string
  mainNav: NavItem[]
  dashboardNav: NavItem[]
  hero: HeroContent
  features: Feature[]
  techStack: Array<{ name: string; color: string }>
  footerSections: FooterSection[]
  footerCopyright: string
  social: {
    twitter?: string
    github?: string
    discord?: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'QuoteDrop',
  tagline: 'Professional quotes in seconds, not hours',
  description: 'A client proposal and quote builder for freelancers with shareable links, instant notifications, and win/loss analytics.',
  url: process.env.NEXT_PUBLIC_APP_URL
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
    || 'http://localhost:3000',
  company: 'QuoteDrop',

  mainNav: [
    { title: 'Features', href: '/features' },
    { title: 'Pricing', href: '/pricing' },
    { title: 'FAQ', href: '/#faq' }
  ],

  dashboardNav: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Proposals', href: '/dashboard/proposals' },
    { title: 'Analytics', href: '/dashboard/analytics' },
    { title: 'Settings', href: '/dashboard/settings' }
  ],

  hero: {
    badge: 'Built for freelancers, not sales teams',
    headline: 'Create stunning client quotes',
    headlineHighlight: 'In under 90 seconds',
    subheadline: 'Stop losing deals to ugly Google Doc estimates. QuoteDrop lets you build professional, trackable proposals, send them as beautiful shareable links, and get notified the instant a client says yes — at 1/3 the cost of existing tools.',
    primaryCta: { text: 'Start Free — No Card Required', href: '/register' },
    secondaryCta: { text: 'See How It Works', href: '/features' },
    socialProof: { text: 'Trusted by 2,000+ freelancers worldwide', rating: '4.9/5' },
  },

  features: [
    {
      icon: Zap,
      title: '90-Second Quote Builder',
      description: 'Pick a template, add your line items, set your terms, and generate a shareable link — all in under 90 seconds flat.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Globe,
      title: 'Shareable Quote Links',
      description: 'Every quote is a beautiful, mobile-responsive web page your clients can view, accept, or comment on — no login required.',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Bell,
      title: 'Real-Time Notifications',
      description: 'Get instant alerts when a client opens, views, or accepts your quote. No more awkward follow-up guessing games.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: BarChart,
      title: 'Win/Loss Analytics',
      description: 'Track your close rate, average quote value, and time-to-decision so you can refine your pricing and win more work.',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      icon: Palette,
      title: 'Professional Templates',
      description: 'Choose from clean, conversion-optimized templates designed for designers, developers, copywriters, and consultants.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Receipt,
      title: 'Quote-to-Invoice Conversion',
      description: 'When a client accepts, convert your quote to an invoice with one click and get paid via Stripe or PayPal instantly.',
      gradient: 'from-indigo-500 to-blue-500',
    }
  ],

  techStack: [
    { name: 'Next.js', color: 'bg-black text-white' },
    { name: 'Supabase', color: 'bg-emerald-600 text-white' },
    { name: 'Stripe', color: 'bg-purple-600 text-white' },
    { name: 'Tailwind CSS', color: 'bg-sky-500 text-white' },
    { name: 'Resend', color: 'bg-gray-800 text-white' }
  ],

  footerSections: [
    {
      title: 'Product',
      links: [
        { title: 'Features', href: '/features' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'Templates', href: '/features#templates' },
        { title: 'Changelog', href: '/changelog' }
      ],
    },
    {
      title: 'Company',
      links: [
        { title: 'About', href: '/about' },
        { title: 'Blog', href: '/blog' },
        { title: 'Contact', href: '/contact' }
      ],
    },
    {
      title: 'Legal',
      links: [
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms of Service', href: '/terms' },
        { title: 'Cookie Policy', href: '/cookies' }
      ],
    }
  ],

  footerCopyright: '2026 QuoteDrop. All rights reserved.',

  social: {
    discord: 'https://discord.gg/quotedrop',
    twitter: 'https://twitter.com/quotedrop'
  },
}
