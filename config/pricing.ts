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
    entities: 5
  },

  plans: [
    {
      id: 'free',
      name: 'Free',
      description: 'Everything you need to start sending professional quotes today',
      price: { monthly: 0 },
      limits: {
        entities: 5
      },
      features: [
        'Up to 5 active quotes',
        'Polished quote templates',
        'Shareable link delivery',
        'Instant accept notifications',
        'Basic branding (name & logo)',
        'QuoteDrop branding on quotes'
      ],
      cta: 'Get Started Free',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Remove limits, add your brand, and track your win rate',
      price: { monthly: 15, yearly: 144 },
      priceId: process.env.STRIPE_PRICE_PRO,
      limits: {
        entities: -1
      },
      features: [
        'Unlimited active quotes',
        'Remove QuoteDrop branding',
        'Custom branding (logo, colors, domain)',
        'Win/loss analytics dashboard',
        'Smart follow-up reminders',
        'All premium templates',
        'Priority email support'
      ],
      highlighted: true,
      cta: 'Upgrade to Pro',
    },
    {
      id: 'growth',
      name: 'Growth',
      description: 'For power users and micro-agencies who want every edge',
      price: { monthly: 35, yearly: 348 },
      priceId: process.env.STRIPE_PRICE_GROWTH,
      limits: {
        entities: -1
      },
      features: [
        'Everything in Pro',
        'AI-powered quote suggestions',
        'Client activity timeline',
        'Quote versioning & A/B testing',
        'Stripe & FreshBooks integrations',
        'Team collaboration (up to 3 seats)',
        'API access & Zapier webhooks',
        'Priority chat support'
      ],
      cta: 'Start Growth Plan',
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
