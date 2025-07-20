import { clsx } from 'clsx';

import { fonts } from '@/ui/fonts';
import { AppStateProvider } from '@/state/provider'

import '@/app/globals.scss';

const RootLayout = ({ children }) => (
  <html
    className={clsx(fonts.variable, 'antialiased')}
    lang="en"
    dir="ltr">
    <body>
      <AppStateProvider>{children}</AppStateProvider>
    </body>
  </html>
)

export default RootLayout;
