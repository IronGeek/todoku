'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { Alert } from '@/components/alert.tsx';
import { Logo } from '@/components/logo.tsx';
import { Spinner } from '@/components/spinner.tsx';
import { Button } from '@/ui/forms/button.tsx';
import { cx } from '@/ui/utils.ts';

import styles from './page.module.scss';

import type { FormEvent, JSX } from 'react';

const Page = (): JSX.Element => {
  const router = useRouter(); // Tambahkan ini
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({
    isShow : false,
    message: '',
    type   : ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setIsLoading(true);
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (res?.error) {
      const message = res.error === 'CredentialsSignin'
        ? 'Invalid username or password.'
        : `An unexpected error occurred: ${res.error}`;

      setAlert({ message, isShow: true, type: 'error' });
    } else {
      router.push('/');
    }

    setIsLoading(false);
  };

  return (
    <section className={cx(styles.section, 'h-screen flex items-center justify-center')}>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleLogin}>
          <h5 className="flex gap-1 text-2xl font-medium text-gray-900">Sign in ke <Logo className="mb-[-.25rem]" /></h5>
          {alert.isShow ? <Alert message={alert.message} type={alert.type} /> : null}

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="email">Email</label>

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="email"
              name="email"
              placeholder="john.doe@example.com"
              required={true}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="password">Password</label>

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="password"
              maxLength={60}
              minLength={6}
              name="password"
              placeholder="••••••••"
              required={true}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>

          <Button
            className="w-full button primary"
            disabled={isLoading}
            type="submit"
          >
            { isLoading ? 'Loading' : 'Login ke akunmu' }
            { isLoading ? <Spinner /> : null }
          </Button>

          <div className="text-sm font-medium text-gray-500 mb-2">
            Belum terdaftar? <Link className="text-blue-700 hover:underline" href="/signup">Buat akun</Link>
          </div>

          <div className="text-sm font-medium text-gray-500">
            Kembali ke <Link className="text-blue-700 hover:underline" href="/">Homepage</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

Page.displayName = 'Page';

export default Page;
