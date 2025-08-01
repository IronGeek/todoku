'use client';

import { Intro } from '@/components/intro';
import { Main } from '@/components/main';
import { CustomersSection } from '@/components/customers-section';
import { FeaturesSection } from '@/components/features-section';
import { ShowcaseSection } from '@/components/showcase-section';
import { BenefitsSection } from '@/components/benefits-section';
import { TestimoniesSection } from '@/components/testimonies-section';
import { PricingSection } from '@/components/pricing-section';
import { FooterSection } from '@/components/footer-section';
import { LandingNavbar } from '@/components/landing-navbar';
import { cx } from '@/ui/utils';

import styles from './page.module.css';

const Page = () => (
  <>
    <LandingNavbar />
    <Main className={cx(styles.main, "fullscreen")}>
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

export default Page;
