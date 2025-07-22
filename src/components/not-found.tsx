import Link from 'next/link';

import { LinkButton } from '@/ui/forms/link-button';
import { cx } from '@/ui/utils';

import styles from './not-found.module.scss';

const NotFound = () => (
  <div className={styles.container}>
    <div className={styles.greetings}>Hey, Uhmm...!</div>
    <h1 className={styles.not_found_shrug}>¯\_(ツ)_/¯</h1>
    <h1 className={cx(styles.not_found_text, "text-gradient sm:text-center")}>Sorry, this is not the page you're looking for!</h1>
    <div className={styles.not_found_desc}>
      The resource you requested may have been permanently removed, or moved to another location,
      or temporarily unavailable at this time, or it never existed in the first place.
      Please, check back again later!
    </div>
    <div className={cx(styles.not_found_actions, "flex-col sm:flex-row items-stretch sm:items-center text-center")}>
      <LinkButton as={Link} className="primary" href="/">
        Return to Homepage
      </LinkButton>
      <div className="separator">OR</div>
      <LinkButton as={Link} className="secondary" href="https://nextjs.org/learn">
        Learn Next.js, maybe...?
      </LinkButton>
    </div>
  </div>
)

export { NotFound }
