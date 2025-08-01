import { Main } from '@/components/main';
import { cx } from '@/ui/utils';

import styles from './page.module.css';

const Page = () => {
  return (
    <Main className={cx(styles.main, "fullscreen")}>
    </Main>
  )
};

export default Page;
