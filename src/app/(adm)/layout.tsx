import { AdminLayout } from '@/components/admin-layout.tsx';

import type { JSX, PropsWithChildren } from 'react';

const RootLayout = async ({ children }: PropsWithChildren): Promise<JSX.Element> => (
  <AdminLayout>
    {children}
  </AdminLayout>
);

RootLayout.displayName = 'RootLayout';

export default RootLayout;
