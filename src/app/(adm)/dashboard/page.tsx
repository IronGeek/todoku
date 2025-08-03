import { Main } from '@/components/main.tsx';
import { cx } from '@/ui/utils.ts';

import styles from './page.module.css';

import type { JSX } from 'react';

const Page = (): JSX.Element => <Main className={cx(styles.main, 'fullscreen')} />;

Page.displayName = 'Page';

export default Page;
