import { notFound } from 'next/navigation';
import { isValidListOrCategory } from '@/services/todo';

const RootLayout = async ({ params, children }) => {
  const { slug } = await params

  return isValidListOrCategory(slug) ? children : notFound();
};

export default RootLayout;
