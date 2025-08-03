import { Link } from '@/components/link.tsx';
import { Logo } from '@/components/logo.tsx';
import { InputButton } from '@/ui/forms/input-button.tsx';
import { FacebookIcon, GithubIcon, GitlabIcon, InstagramIcon, TwitterXIcon, YoutubeIcon } from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import styles from './footer-section.module.scss';

import type { JSX } from 'react';

const FooterSection = (): JSX.Element => (
  <section className={cx(styles.section)}>
    <div className="section-container relative">
      <div className="footer-socials">
        <div>Ikuti kami</div>
        <Link className="text-[#0866FF]" href="https://www.facebook.com/"><FacebookIcon className="social-icon" /></Link>
        <Link className="text-[#000000]" href="https://www.x.com/"><TwitterXIcon className="social-icon" /></Link>
        <Link className="text-[#FF0069]" href="https://www.instagram.com/"><InstagramIcon className="social-icon" /></Link>
        <Link className="text-[#FF0000]" href="https://www.youtube.com/"><YoutubeIcon className="social-icon" /></Link>
        <Link className="text-[#181717]" href="https://www.github.com/"><GithubIcon className="social-icon" /></Link>
        <Link className="text-[#FC6D26]" href="https://www.gitlab.com/"><GitlabIcon className="social-icon" /></Link>

        <div className="ml-auto">
          <InputButton
            buttonText="Subscribe"
            label="Berlangganan"
            name="email"
            placeholder="username@example.com"
            required={true}
            type="email"
            variant="primary" />
        </div>
      </div>
    </div>

    <div className="section-container section-container-about relative">
      <div className="footer-about">
        <div>Made with 💖 by Jakka Prihatna</div>

        <div className="footer-copyright">
          Copyright &copy; {new Date().getFullYear()} <Logo className="footer-logo" />. All rights reserved
        </div>
      </div>
    </div>
  </section>
);

FooterSection.displayName = 'FooterSection';

export { FooterSection };
