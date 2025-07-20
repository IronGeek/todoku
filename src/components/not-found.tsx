import clsx from 'clsx';
import Link from 'next/link';

import styles from './not-found.module.scss';

const NotFound = () => (
  <div className={styles.container}>
    <div className={styles.greetings}>Hey, Uhmm...!</div>
    <h1 className={styles.not_found_shrug}>¯\_(ツ)_/¯</h1>
    <h1 className={clsx(styles.not_found_text, "gradient-text sm:text-center")}>Sorry, this is not the page you're looking for!</h1>
    <div className={styles.not_found_desc}>
      The resource you requested may have been permanently removed, or moved to another location,
      or temporarily unavailable at this time, or it never existed in the first place.
      Please, check back again later!
    </div>
    <div className={clsx(styles.not_found_actions, "flex-col sm:flex-row items-stretch sm:items-center text-center")}>
      <Link className="button primary" href="/">
        Return to Homepage
      </Link>
      <div className="separator">OR</div>
      <Link className="button secondary" href="https://nextjs.org/learn">
        Learn Next.js, maybe...?
      </Link>
    </div>
  </div>
)

export { NotFound }
