import { notFound } from 'next/navigation';

import { isValidListOrCategory } from '@/services/todo.ts';

import type { ParamValue } from 'next/dist/server/request/params';
import type { PropsWithChildren, ReactNode } from 'react';

const RootLayout = async ({ params, children }: PropsWithChildren<{ readonly params: Promise<Record<string, ParamValue>> }>): Promise<ReactNode> => {
  const { slug } = await params;

  return isValidListOrCategory(slug) ? <>{children}</> : notFound();
};

RootLayout.displayName = 'RootLayout';

export default RootLayout;
