import { Zap, Link, Bell, BarChart3, Palette, Copy } from 'lucide-react'
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
  tagline: 'Professional quotes sent in seconds, not hours',
  description: 'A fast proposal and quote builder for freelancers with shareable links, instant notifications, and win/loss analytics.',
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
    badge: 'Built for freelancers',
    headline: 'Send Professional Client Quotes',
    headlineHighlight: 'In Under 60 Seconds',
    subheadline: 'Stop wrestling with Google Docs and overpriced tools. QuoteDrop lets you create beautiful, trackable proposals via a shareable link — and get notified the instant a client accepts. Simple, fast, and built for how freelancers actually work.',
    primaryCta: { text: 'Start Sending Quotes Free', href: '/register' },
    secondaryCta: { text: 'See How It Works', href: '/features' },
    socialProof: { text: 'Trusted by 2,500+ freelancers worldwide', rating: '4.9/5' },
  },

  features: [
    {
      icon: Zap,
      title: '60-Second Quote Builder',
      description: 'Pick a template, fill in the details, and send — professional proposals created faster than you can brew a coffee.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Link,
      title: 'Shareable Link Delivery',
      description: 'Every quote is a beautiful, mobile-responsive web page with a unique URL. Share it via email, Slack, WhatsApp, or DM.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: Bell,
      title: 'Instant Accept Notifications',
      description: 'Get notified the moment a client opens, views, or accepts your quote — no more anxious inbox refreshing.',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      icon: BarChart3,
      title: 'Win/Loss Analytics',
      description: 'Track acceptance rates, average time-to-close, and revenue trends so you can refine your pricing strategy over time.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Palette,
      title: 'Custom Branding',
      description: 'Add your logo, brand colors, and personal touch to every quote — look polished without needing a designer.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Copy,
      title: 'Duplicate & Reuse',
      description: 'Clone any past quote in one click, tweak the details, and send. Build a library of templates tailored to your services.',
      gradient: 'from-fuchsia-500 to-violet-500',
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
        { title: 'Terms of Service', href: '/terms' }
      ],
    }
  ],

  footerCopyright: '2026 QuoteDrop. All rights reserved.',

  social: {
    github: 'https://github.com/quotedrop',
    twitter: 'https://twitter.com/quotedrop'
  },
}
