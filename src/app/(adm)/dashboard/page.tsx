
import { Main } from '@/components/main';
import { cx } from '@/ui/utils';

import styles from './page.module.css';
// import { LandingNavbar } from '@/components/landing-navbar';

const Page = () => (
  <>
    {/* <LandingNavbar /> */}
    <Main className={cx(styles.main, "fullscreen")}>

    </Main>
  </>
);

export default Page;
