'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Alert } from '@/components/alert.tsx';
import { Logo } from '@/components/logo.tsx';
import { Spinner } from '@/components/spinner.tsx';
import { Button } from '@/ui/forms/button.tsx';
import { cx } from '@/ui/utils.ts';

import styles from './page.module.scss';

import type { FormEvent, JSX } from 'react';

const Page = (): JSX.Element => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [alert, setAlert] = useState({
    isShow : false,
    message: '',
    type   : ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setIsLoading(true);
    const res = await fetch('/api/auth/signup', {
      body: JSON.stringify({
        email   : registerEmail,
        name    : registerName,
        password: registerPassword
      }),
      headers: { 'Content-Type': 'application/json' },
      method : 'POST'
    });

    const data = await res.json();
    if (res.ok) {
      setAlert({
        isShow : true,
        message: 'Register success, please check your email to verify your account',
        type   : 'success'
      });
      setIsLoading(false);
      localStorage.setItem('pendingVerifyEmail', registerEmail);
      setTimeout(() => {
        router.push('/verify');
      }, 1000);
    } else {
      setAlert({
        isShow : true,
        message: data.error || 'Register failed',
        type   : 'error'
      });
      setIsLoading(false);
    }
  };

  return (
    <section className={cx(styles.section, 'h-screen flex items-center justify-center')}>
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleRegister}>
          <h5 className="flex gap-1 text-2xl font-medium text-gray-900">Daftar ke <Logo className="mb-[-.25rem]" /></h5>
          {alert.isShow ? <Alert message={alert.message} type={alert.type} /> : null}

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="name">Nama</label>

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="name"
              maxLength={64}
              name="name"
              placeholder="John Doe"
              required={true}
              type="text"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)} />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="email">Email</label>

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              id="email"
              maxLength={255}
              name="email"
              placeholder="john.doe@example.com"
              required={true}
              type="email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)} />
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
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)} />
          </div>

          <Button
            className="w-full primary"
            type="submit"
          >
            {isLoading ? 'Loading' : 'Daftarkan akunmu'}
            {isLoading ? <Spinner /> : null}
          </Button>

          <div className="text-sm font-medium text-gray-500 mb-2">
            Sudah punya akun? <Link className="text-blue-700 hover:underline" href="/signin">Masuk ke akunmu</Link>
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
