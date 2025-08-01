'use client';

import clsx from 'clsx';

import { Intro } from '@/components/intro';
import { Main } from '@/components/main';
import { CustomersSection } from '@/components/customers-section';
import { FeaturesSection } from '@/components/features-section';
import { ShowcaseSection } from '@/components/showcase-section';
import { BenefitsSection } from '@/components/benefits-section';
import { TestimoniesSection } from '@/components/testimonies-section';
import { PricingSection } from '@/components/pricing-section';
import { FooterSection } from '@/components/footer-section';

import styles from './page.module.css';
import { LandingNavbar } from '@/components/landing-navbar';

const Page = () => (
  <>
    <LandingNavbar />
    <Main className={clsx(styles.main, "fullscreen")}>
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
