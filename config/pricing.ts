export interface PlanLimit {
  [key: string]: number
}

export interface Plan {
  id: string
  name: string
  description: string
  price: { monthly: number; yearly?: number }
  priceId?: string
  yearlyPriceId?: string
  limits: PlanLimit
  features: string[]
  highlighted?: boolean
  cta: string
}

export const pricingConfig: {
  model: 'freemium' | 'free-trial' | 'paid-only'
  trialDays?: number
  defaultLimits: PlanLimit
  plans: Plan[]
} = {
  model: 'freemium',

  defaultLimits: {
    proposals: 5
  },

  plans: [
    {
      id: 'free',
      name: 'Free',
      description: 'Everything you need to start sending professional quotes',
      price: { monthly: 0 },
      limits: {
        proposals: 5
      },
      features: [
        'Up to 5 active quotes per month',
        'All vertical-specific templates',
        'Shareable quote links',
        'Real-time open & acceptance notifications',
        'Pipeline dashboard',
        'QuoteDrop branding on quotes'
      ],
      cta: 'Get Started Free',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For freelancers ready to win more clients and look fully professional',
      price: { monthly: 16, yearly: 144 },
      priceId: process.env.STRIPE_PRICE_PRO,
      limits: {
        proposals: -1
      },
      features: [
        'Unlimited quotes',
        'Remove QuoteDrop branding',
        'Custom branding (logo & colors)',
        'Full win/loss analytics dashboard',
        'Automated follow-up reminders',
        'Custom domain for quote links',
        'PDF export',
        'Stripe & PayPal integrations',
        'Priority email support'
      ],
      highlighted: true,
      cta: 'Start Free Trial',
    },
    {
      id: 'business',
      name: 'Business',
      description: 'For growing freelancers and small agencies scaling up',
      price: { monthly: 29, yearly: 290 },
      priceId: process.env.STRIPE_PRICE_BUSINESS,
      limits: {
        proposals: -1
      },
      features: [
        'Everything in Pro',
        'Team collaboration (up to 5 users)',
        'Client portal',
        'API access',
        'AI-powered close rate insights',
        'White-label capabilities',
        'Dedicated account support'
      ],
      cta: 'Contact Sales',
    }
  ],
}

const planMap = new Map<string, Plan>()
for (const plan of pricingConfig.plans) {
  planMap.set(plan.id, plan)
}

export function getPlan(tier: string): Plan {
  return planMap.get(tier) || pricingConfig.plans[0]
}

export function getPlanByPriceId(priceId: string): string | null {
  for (const plan of pricingConfig.plans) {
    if (plan.priceId === priceId || plan.yearlyPriceId === priceId) {
      return plan.id
    }
  }
  return null
}

export function getLimits(tier: string | null): PlanLimit {
  if (!tier) return pricingConfig.defaultLimits
  const plan = planMap.get(tier)
  return plan?.limits || pricingConfig.defaultLimits
}

export function checkLimit(tier: string | null, limitKey: string, currentUsage: number): boolean {
  const limits = getLimits(tier)
  const limit = limits[limitKey]
  if (limit === undefined) return false
  if (limit === -1) return true
  return currentUsage < limit
}

export function isPaidTier(tier: string | null): boolean {
  if (!tier) return false
  const plan = planMap.get(tier)
  return plan ? plan.price.monthly > 0 : false
}

export function getFreePlan(): Plan | undefined {
  return pricingConfig.plans.find((p) => p.price.monthly === 0)
}

export function getPaidPlans(): Plan[] {
  return pricingConfig.plans.filter((p) => p.price.monthly > 0)
}

export function getHighlightedPlan(): Plan | undefined {
  return pricingConfig.plans.find((p) => p.highlighted)
}

export function getPlanPrice(tier: string | null): number {
  if (!tier) return 0
  const plan = planMap.get(tier)
  return plan?.price.monthly || 0
}
