import clsx from 'clsx';
import Link from 'next/link';

import styles from './intro.module.scss';
import { LinkButton } from '@/ui/forms/link-button';
import { Logo } from './logo';
import { RandomTask } from './random-task';
import { AsteriskIcon } from '@/ui/icons';

const Intro = () => {
  return (
    <div className={clsx(styles.intro, 'flex-col lg:flex-row min-h-[100vh]')}>
      <div className="intro-container">
        <h1 className="intro-title gradient-text">
          Semua tugas terasa ringan jika <del>tidak</del>
          <div className="relative insert"><ins>^sudah</ins></div>dikerjakan
        </h1>
        <h2 className="intro-subtitle">〜 kata orang*</h2>
        <div className="intro-text">
          <div className="-rotate-1">Yuk, mulai rencanakan untuk <RandomTask /> dengan <span className="whitespace-nowrap"><Logo />!</span></div>
        </div>
        <div className="intro-actions flex-col sm:flex-row items-center text-center">
          <LinkButton as={Link} className="accent" href="/signin">
            Mulai
          </LinkButton>
          <span className="text-muted">atau</span>
          <LinkButton as={Link} className="primary" href="/signup">
            Daftar
          </LinkButton>
        </div>
      </div>
      <div className="intro-attribution">
        <AsteriskIcon /> Hak kutip ada pada Fulan bin Fulan
      </div>
    </div>
  )
}

export { Intro }
