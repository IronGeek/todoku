import { notFound } from 'next/navigation';
import { isValidType } from '@/services/todo';

const RootLayout = async ({ params, children }) => {
  const { type } = await params

  return isValidType(type) ? children : notFound();
};

export default RootLayout;
