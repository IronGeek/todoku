import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import styles from './intro.module.scss';
import { LinkButton } from '@/ui/forms/link-button';
import { Logo } from './logo';

const Intro = () => {
  return (
    <div className={clsx(styles.intro, 'flex-col lg:flex-row')}>
      <div className={styles.container}>
        <div className={styles.greetings}>Hey, it's Me...!</div>
        <h1 className={clsx(styles.intro_name, "gradient-text text-center")}><Logo className="justify-center" /></h1>
        <h2 className={clsx(styles.intro_title, "text-center")}>Organize, Energize, Enjoy!</h2>
        <div className={clsx(styles.intro_bio, "dropcap")}>
          <p>
            Tired of scattered notes and forgotten tasks? Get ready to revolutionize your productivity with our brand-new Todo List application! Designed with an intuitive interface and powerful features, it's the ultimate tool to bring order to your daily chaos. From simple reminders to complex project breakdowns, our app ensures you stay on top of everything, effortlessly transforming your to-do list from a source of stress into a pathway to accomplishment.
          </p>
          <p>
             Our apps makes a world a where every task is accounted for, every deadline is met, and every goal is within reach. Experience seamless organization, intelligent task management, and a sense of calm as you navigate your day with unparalleled clarity. It’s more than just a list; it’s your personal productivity co-pilot, empowering you to achieve more and stress less
          </p>
        </div>
        <div className={clsx(styles.intro_actions, "flex-col sm:flex-row items-center text-center")}>
          <LinkButton as={Link} className="primary" href="/signin">
            Login
          </LinkButton>
          OR
          <LinkButton as={Link} className="secondary" href="/signup">
            Register
          </LinkButton>
        </div>
      </div>
    </div>
  )
}

export { Intro }
