'use client';

import { BenefitsSection } from '@/components/benefits-section.tsx';
import { CustomersSection } from '@/components/customers-section.tsx';
import { FeaturesSection } from '@/components/features-section.tsx';
import { FooterSection } from '@/components/footer-section.tsx';
import { Intro } from '@/components/intro.tsx';
import { LandingNavbar } from '@/components/landing-navbar.tsx';
import { Main } from '@/components/main.tsx';
import { PricingSection } from '@/components/pricing-section.tsx';
import { ShowcaseSection } from '@/components/showcase-section.tsx';
import { TestimoniesSection } from '@/components/testimonies-section.tsx';
import { cx } from '@/ui/utils.ts';

import styles from './page.module.css';

import type { JSX } from 'react';

const Page = (): JSX.Element => (
  <>
    <LandingNavbar />

    <Main className={cx(styles.main, 'fullscreen')}>
      <Intro />
      <CustomersSection />
      <FeaturesSection />
      <ShowcaseSection />
      <BenefitsSection />
      <TestimoniesSection />
      <PricingSection />
      <FooterSection />
    </Main>
  </>
);

Page.displayName = 'Page';

export default Page;
