import { Logo } from '@/components/logo.tsx';
import { LinkButton } from '@/ui/forms/link-button.tsx';
import { CurrencyIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import styles from './pricing-section.module.scss';

import type { ComponentProps, JSX } from 'react';

interface Pricing {
  readonly features: string[]
  readonly price: string | number
  readonly recommended?: boolean
  readonly tier: string
}

const pricings: Pricing[] = [
  {
    features: [
      '1 Workspace',
      '5 list per workspace',
      '100 items per list',
      '—',
      '—',
      '—',
      'No support'
    ],
    price: '—',
    tier : 'Free'
  },
  {
    features: [
      '5 Workspaces',
      '10 list per workspace',
      '500 items per list',
      'Dark Mode',
      '—',
      '—',
      'Gold support'
    ],
    price      : 9.99,
    recommended: true,
    tier       : 'Personal'
  },
  {
    features: [
      '25 Workspaces',
      '50 list per workspace',
      '1000 items per list',
      'Dark Mode',
      'Collaboration',
      '—',
      'Platinum support'
    ],
    price: 49.99,
    tier : 'Professional'
  },
  {
    features: [
      'Unlimited Workspaces',
      'Unlimited list',
      'Unlimited items',
      'Dark Mode',
      'Collaboration',
      'API Access',
      'Diamond support'
    ],
    price: 99.99,
    tier : 'Enterprise'
  }
];

type PricingCardProps = ComponentProps<'div'> & {
  readonly data: Pricing
};

const PricingCard = ({ className, data, ...props }: PricingCardProps): JSX.Element => (
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
        // eslint-disable-next-line @react/no-array-index-key
        data.features.map((feature, i) => <li key={i} className="2xl:px-16">{feature}</li>)
      }
    </ul>

    <div className="basis-full xl:basis-auto h-0" />

    <div className="pricing-actions xl:basis-auto basis-full">
      <LinkButton>
        <button className={cx(data.recommended ? 'primary' : 'secondary', 'w-full')} type="button">Pilih paket</button>
      </LinkButton>
    </div>
  </div>
);

PricingCard.displayName = 'PricingCard';

const PricingSection = (): JSX.Element => (
  <section className={cx(styles.section)}>
    <div className="section-container relative">
      <div className="mb-4">
        <h1 className="gradient-text text-center">Pilih paket <Logo />-mu?</h1>
        <p className="text-muted-foreground text-center!">Sesuai dengan kemampuan-mu, ya! Dimana ada kemampuan disitu ada yang mau</p>
      </div>

      <div className="grid gap-8 grid-cols-1 md:gap-4 md:grid-cols-2 xl:gap-1 xl:grid-cols-4">
        {
          pricings.map((pricing) => <PricingCard key={pricing.tier} data={pricing} />)
        }
      </div>
    </div>
  </section>
);

PricingSection.displayName = 'PricingSection';

export { PricingSection };
