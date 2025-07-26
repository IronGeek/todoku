'use client';

import clsx from 'clsx';

import { Intro } from '@/components/intro';
import { Main } from '@/components/main';

import styles from './page.module.css';

const Page = () => (
  <Main className={clsx(styles.main, "justify-center min-h-[100vh]!")}>
    <Intro />
  </Main>
);

export default Page;
