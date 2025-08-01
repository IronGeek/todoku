"use client";

import { FormEvent, useState } from 'react';
import Link from 'next/link'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Spinner } from '@/components/spinner';
import { Alert } from '@/components/alert';
import { Logo } from '@/components/logo';
import { cx } from '@/ui/utils';

import styles from './page.module.scss';
import { Button } from '@/ui/forms/button';

const Page = () => {
  const router = useRouter(); // tambahkan ini
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    isShow: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      const message = res.error === 'CredentialsSignin'
        ? 'Invalid username or password.'
        : `An unexpected error occurred: ${res.error}`;

      setAlert({ type: "error", message, isShow: true });
    } else {
      router.push('/');
    }
    setIsLoading(false);
  };

  return (
    <section className={cx(styles.section, "h-screen flex items-center justify-center")}>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleLogin}>
            <h5 className="flex gap-1 text-2xl font-medium text-gray-900">Sign in ke <Logo className="mb-[-.25rem]" /></h5>
            {alert.isShow && <Alert type={alert.type} message={alert.message} />}
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="john.doe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={password}
                  minLength={6}
                  maxLength={60}
                  onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button
              type="submit"
              className="w-full button primary"
              disabled={isLoading}
            >
              { isLoading ? 'Loading' : 'Login ke akunmu' }
              { isLoading && (<Spinner />) }
            </Button>
            <div className="text-sm font-medium text-gray-500 mb-2">
                Belum terdaftar? <Link href="/signup" className="text-blue-700 hover:underline">Buat akun</Link>
            </div>
            <div className="text-sm font-medium text-gray-500">
                Kembali ke <Link href="/" className="text-blue-700 hover:underline">Homepage</Link>
            </div>
        </form>
      </div>
    </section>
  )
}

export default Page;
