
import type { FC, HTMLProps } from 'react';

import { cx } from '@/ui/utils';

import styles from './footer.module.scss';

type FooterProps = HTMLProps<HTMLDivElement>;

const Footer: FC<FooterProps> = ({ className, ...props }) => (
  <div {...props} className={cx(styles.footer, "footer", className)}>
    <div>Made with 💖 by Jakka Prihatna</div>
    <div className="footer-copyright">
      Copyright &copy; {new Date().getFullYear()}. All rights reserved</div>
  </div>
);

export { Footer };
