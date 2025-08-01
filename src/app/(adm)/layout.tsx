import { AdminLayout } from '@/components/admin-layout';

const RootLayout = async ({ children }) => {

  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
};

export default RootLayout;
