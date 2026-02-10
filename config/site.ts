import { Zap, Link, Bell, BarChart3, LayoutDashboard, Clock } from 'lucide-react'
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
  tagline: 'Professional quotes in 60 seconds. Win more clients.',
  description: 'A fast quote builder for freelancers — create, send, and track professional client proposals in seconds.',
  url: process.env.NEXT_PUBLIC_APP_URL
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
    || 'http://localhost:3000',
  company: 'QuoteDrop',

  mainNav: [
    { title: 'Features', href: '/features' },
    { title: 'Pricing', href: '/pricing' },
    { title: 'Templates', href: '/templates' },
    { title: 'Blog', href: '/blog' }
  ],

  dashboardNav: [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Proposals', href: '/dashboard/proposals' },
    { title: 'Clients', href: '/dashboard/clients' },
    { title: 'Analytics', href: '/dashboard/analytics' },
    { title: 'Settings', href: '/dashboard/settings' }
  ],

  hero: {
    badge: 'Built for freelancers',
    headline: 'Send Professional Quotes',
    headlineHighlight: 'In Under 60 Seconds',
    subheadline: 'Stop wrestling with Google Docs and PDF templates. QuoteDrop lets you create beautiful, trackable client proposals with a shareable link — and get notified the instant a client accepts. Track every quote in one dashboard with win/loss analytics.',
    primaryCta: { text: 'Start Free — No Card Required', href: '/register' },
    secondaryCta: { text: 'See How It Works', href: '/features' },
    socialProof: { text: 'Trusted by 2,500+ freelancers worldwide', rating: '4.9/5' },
  },

  features: [
    {
      icon: Zap,
      title: '60-Second Quote Builder',
      description: 'Pick a template, customize your line items, and send a professional quote before your coffee gets cold. Smart defaults and vertical-specific templates do the heavy lifting.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Link,
      title: 'Shareable Quote Links',
      description: 'Every quote gets a unique, branded link. No more PDF attachments or email chains — clients view, comment, and accept directly from their browser on any device.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Bell,
      title: 'Instant Notifications',
      description: 'Get real-time push and email alerts the moment a client opens your quote or clicks accept. Never miss a deal or wonder if they\'ve seen it.',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      icon: BarChart3,
      title: 'Win/Loss Analytics',
      description: 'See your acceptance rate, average time to close, quote value trends, and which services win the most. Make data-driven decisions to improve your close rate.',
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      icon: LayoutDashboard,
      title: 'Pipeline Dashboard',
      description: 'Track every proposal through a clean Kanban-style pipeline — from Draft to Sent, Viewed, Accepted, or Declined. Your entire sales flow at a glance.',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Clock,
      title: 'Automated Follow-Ups',
      description: 'Set it and forget it. QuoteDrop automatically nudges clients who haven\'t viewed or responded to your quote after a configurable time period.',
      gradient: 'from-indigo-500 to-blue-500',
    }
  ],

  techStack: [
    { name: 'Next.js', color: 'bg-black text-white' },
    { name: 'Supabase', color: 'bg-emerald-600 text-white' },
    { name: 'Stripe', color: 'bg-purple-600 text-white' },
    { name: 'Resend', color: 'bg-blue-600 text-white' },
    { name: 'Tailwind CSS', color: 'bg-cyan-600 text-white' }
  ],

  footerSections: [
    {
      title: 'Product',
      links: [
        { title: 'Features', href: '/features' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'Templates', href: '/templates' },
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
    github: 'https://github.com/quotedrop',
    twitter: 'https://twitter.com/quotedrop'
  },
}
