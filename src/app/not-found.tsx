import { Main } from '@/components/main.tsx';
import { NotFound } from '@/components/not-found.tsx';

import type { JSX } from 'react';

const NotFoundPage = (): JSX.Element => (
  <Main className="justify-center" fullscreen={true}>
    <NotFound />
  </Main>
);

NotFoundPage.displayName = 'NotFoundPage';

export default NotFoundPage;
