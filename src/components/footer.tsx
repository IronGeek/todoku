import { Logo } from '@/components/logo.tsx';
import { cx } from '@/ui/utils.ts';

import styles from './footer.module.scss';

import type { FC, HTMLProps, JSX } from 'react';

type FooterProps = HTMLProps<HTMLDivElement>;

const Footer: FC<FooterProps> = ({ className, ...props }): JSX.Element => (
  <div {...props} className={cx(styles.footer, 'footer', className)}>
    <div>Made with 💖 by Jakka Prihatna</div>

    <div className="footer-copyright">
      Copyright &copy; {new Date().getFullYear()} <Logo className="footer-logo" />. All rights reserved
    </div>
  </div>
);

Footer.displayName = 'Footer';

export { Footer };
