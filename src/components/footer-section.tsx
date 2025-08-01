import { cx } from "@/ui/utils";

import { FacebookIcon, GithubIcon, GitlabIcon, InstagramIcon, PatchCheckIcon, TwitterXIcon, YoutubeIcon } from "@/ui/icons";

import styles from './footer-section.module.scss';

import { Link } from "@/components/link";
import { Logo } from "@/components/logo";

import { InputButton } from "@/ui/forms/input-button";

const FooterSection = () => {
  return (
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
              required
              label="Berlangganan"
              type="email"
              name="email"
              placeholder="username@example.com"
              buttonText="Subscribe"
              variant="primary" />
          </div>
        </div>
      </div>
      <div className="section-container section-container-about relative">
        <div className="footer-about">
          <div>Made with 💖 by Jakka Prihatna</div>
          <div className="footer-copyright">
            Copyright &copy; {new Date().getFullYear()} <Logo className="footer-logo" />. All rights reserved</div>
        </div>
      </div>
    </section>
  )
}

export { FooterSection }
