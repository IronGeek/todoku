import { clsx } from 'clsx';
import { fonts } from '@/ui/fonts';

import '@/app/globals.scss';

const RootLayout = ({ children }) => (
  <html
    className={clsx(fonts.variable, 'antialiased')}
    lang="en"
    dir="ltr">
    <body>
      {children}
    </body>
  </html>
)

export default RootLayout;
