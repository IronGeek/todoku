import { AppStateProvider } from '@/state/provider'
import { fonts } from '@/ui/fonts';
import { cx } from '@/ui/utils';

import '@/app/globals.css';

const RootLayout = ({ children }) => (
  <html
    className={cx(fonts.variable, 'antialiased')}
    lang="en"
    dir="ltr">
    <body>
      <AppStateProvider>{children}</AppStateProvider>
    </body>
  </html>
)

export default RootLayout;
