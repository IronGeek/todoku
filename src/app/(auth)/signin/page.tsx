'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { Alert } from '@/components/alert.tsx';
import { Logo } from '@/components/logo.tsx';
import { Spinner } from '@/components/spinner.tsx';
import { Button } from '@/ui/button.tsx';
import { LinkButton } from '@/ui/forms/link-button.tsx';
import { Form } from '@/ui/forms.tsx';
import { ReturnIcon } from '@/ui/icons.ts';

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
    <section className={styles.section}>
      <div className="section-container max-w-lg shadow-sm p-4 sm:p-6 md:p-8">
        <Form
          actions={
            <LinkButton as={Link} href="/"><ReturnIcon /></LinkButton>
          }
          loading={isLoading}
          title={<>Sign in ke <Logo className="mb-[-.25rem]" /></>}
          onSubmit={handleLogin}
        >
          {alert.isShow ? <Alert message={alert.message} type={alert.type} /> : null }

          <Form.Group>
            <Form.InputText
              id="email"
              label="Email"
              name="email"
              placeholder="john.doe@example.com"
              required={true}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.InputText
              id="password"
              label="Password"
              maxLength={60}
              minLength={6}
              name="password"
              placeholder="••••••••"
              required={true}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Separator />

          <Form.Group>
            <Button
              className="w-full"
              disabled={isLoading}
              type="submit"
            >
              { isLoading ? 'Loading' : 'Login ke akunmu' }
              { isLoading ? <Spinner /> : null }
            </Button>
          </Form.Group>

          <Form.Group>
            Belum terdaftar? <Link className="text-accent hover:underline" href="/signup">Buat akun</Link>
          </Form.Group>
        </Form>
      </div>
    </section>
  );
};

Page.displayName = 'Page';

export default Page;
