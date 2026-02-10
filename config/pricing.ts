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
      name: 'Free Forever',
      description: 'Everything you need to start sending professional quotes',
      price: { monthly: 0 },
      limits: {
        entities: 5
      },
      features: [
        'Up to 5 active quotes per month',
        'All core templates included',
        'Shareable quote links',
        'Real-time open & acceptance notifications',
        'Basic dashboard with status tracking',
        'QuoteDrop branding on quotes'
      ],
      cta: 'Get Started Free',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For freelancers who are serious about winning more work',
      price: { monthly: 15, yearly: 144 },
      priceId: process.env.STRIPE_PRICE_PRO,
      limits: {
        entities: -1
      },
      features: [
        'Unlimited quotes',
        'Remove QuoteDrop branding',
        'Custom branding (logo, colors)',
        'Win/loss analytics dashboard',
        'Quote-to-invoice conversion',
        'Stripe & PayPal payment links',
        'Revision tracking & version history',
        'Custom domain for quote links',
        'Priority email support'
      ],
      highlighted: true,
      cta: 'Start Pro — 14 Days Free',
    },
    {
      id: 'studio',
      name: 'Studio',
      description: 'For freelancers growing into small agencies',
      price: { monthly: 35, yearly: 336 },
      priceId: process.env.STRIPE_PRICE_STUDIO,
      limits: {
        entities: -1
      },
      features: [
        'Everything in Pro',
        'Up to 5 team members included',
        'AI-powered pricing suggestions',
        'Advanced analytics (close rate by service, client, period)',
        'Client portal with proposal history',
        'API access & Zapier integration',
        'Advanced template design editor',
        'Phone support'
      ],
      cta: 'Start Studio Trial',
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
