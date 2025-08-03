import { AppStateProvider } from '@/state/provider.tsx';
import { fonts } from '@/ui/fonts.ts';
import { cx } from '@/ui/utils.ts';

import '@/app/globals.css';

import type { ComponentProps, JSX } from 'react';

const RootLayout = ({ children }: ComponentProps<'html'>): JSX.Element => (
  <html
    className={cx(fonts.variable, 'antialiased')}
    dir="ltr"
    lang="en"
  >
    <body>
      <AppStateProvider>{children}</AppStateProvider>
    </body>
  </html>
);

RootLayout.displayName = 'RootLayout';

export default RootLayout;
