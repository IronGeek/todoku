import { cx } from "@/ui/utils";

import { Logo } from "@/components/logo";

import styles from './pricing-section.module.scss';

import type { ComponentProps } from 'react';
import { Button } from "@/ui/forms/button";
import { LinkButton } from "@/ui/forms/link-button";
import { CurrencyIcon } from "@/ui/icons";

interface Pricing {
  readonly tier: string
  readonly price: string | number
  readonly features: string[]
  readonly recommended?: boolean
}

const pricings: Pricing[] = [
  {
    tier: 'Free',
    price: '—',
    features: [
      '1 Workspace',
      '5 list per workspace',
      '100 items per list',
      '—',
      '—',
      '—',
      'No support'
    ]
  },
  {
    tier: 'Personal',
    price: 9.99,
    features: [
      '5 Workspaces',
      '10 list per workspace',
      '500 items per list',
      'Dark Mode',
      '—',
      '—',
      'Gold support'
    ],
    recommended: true
  },
  {
    tier: 'Professional',
    price: 49.99,
    features: [
      '25 Workspaces',
      '50 list per workspace',
      '1000 items per list',
      'Dark Mode',
      'Collaboration',
      '—',
      'Platinum support'
    ]
  },
  {
    tier: 'Enterprise',
    price: 99.99,
    features: [
      'Unlimited Workspaces',
      'Unlimited list',
      'Unlimited items',
      'Dark Mode',
      'Collaboration',
      'API Access',
      'Diamond support'
    ]
  }
]

type PricingCardProps = ComponentProps<'div'> & {
  readonly data: Pricing
}

const PricingCard = ({ className, data, ...props }: PricingCardProps) => {
  return (
    <div
      {...props}
      className={cx('pricing-card shadow-sm flex-wrap flex-row items-start gap-4 xl:flex-col xl:items-center', { 'pricing-recommended': data.recommended }, className)}
    >
      <div className="pricing-header min-w-1/3 flex-auto">
        <h2 className="pricing-tier">{data.tier}</h2>
        <div className="pricing-price">{ typeof data.price === 'number' ? <CurrencyIcon /> : null }{data.price}</div>
      </div>
      <ul className={cx('pricing-content', className)}>
        {
          data.features.map((feature, i) => (<li key={i} className="2xl:px-16">{feature}</li>))
        }
      </ul>
      <div className="basis-full xl:basis-auto h-0"></div>
      <div className="pricing-actions xl:basis-auto basis-full">
        <LinkButton>
            <button type="button" className={cx(data.recommended ? 'primary' : 'secondary', 'w-full')}>Pilih paket</button>
        </LinkButton>
      </div>
    </div>
  )
};

const PricingSection = () => {
  return (
    <section className={cx(styles.section)}>
      <div className="section-container relative">
        <div className="mb-4">
          <h1 className="gradient-text text-center">Pilih paket <Logo />-mu?</h1>
          <p className="text-muted-foreground text-center!">Sesuai dengan kemampuan-mu, ya! Dimana ada kemampuan disitu ada yang mau</p>
        </div>
        <div className="grid gap-8 grid-cols-1 md:gap-4 md:grid-cols-2 xl:gap-1 xl:grid-cols-4">
          {
            pricings.map((pricing) => (
              <PricingCard key={pricing.tier} data={pricing} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export { PricingSection }
