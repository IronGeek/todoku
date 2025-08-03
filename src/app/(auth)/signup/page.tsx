'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Alert } from '@/components/alert.tsx';
import { Logo } from '@/components/logo.tsx';
import { Spinner } from '@/components/spinner.tsx';
import { Button } from '@/ui/button.tsx';
import { LinkButton } from '@/ui/forms/link-button.tsx';
import { Form } from '@/ui/forms.tsx';
import { ReturnIcon } from '@/ui/icons.ts';
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
    <section className={styles.section}>
      <div className="section-container max-w-lg shadow-sm p-4 sm:p-6 md:p-8">
        <Form
          actions={
            <LinkButton as={Link} href="/"><ReturnIcon /></LinkButton>
          }
          loading={isLoading}
          title={
            <>Daftar ke <Logo className="mb-[-.25rem]" /></>
          }
          onSubmit={handleRegister}
        >
          {alert.isShow ? <Alert message={alert.message} type={alert.type} /> : null}

          <Form.Group>
            <Form.InputText
              id="name"
              label="Nama"
              maxLength={64}
              name="name"
              placeholder="John Doe"
              required={true}
              type="text"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)} />
          </Form.Group>

          <Form.Group>
            <Form.InputText
              id="email"
              label="Email"
              maxLength={255}
              name="email"
              placeholder="john.doe@example.com"
              required={true}
              type="email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)} />
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
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)} />
          </Form.Group>

          <Form.Separator />

          <Form.Group>
            <Button
              className="w-full"
              type="submit"
            >
              {isLoading ? 'Loading' : 'Daftarkan akunmu'}
              {isLoading ? <Spinner /> : null}
            </Button>
          </Form.Group>

          <Form.Group>
            Sudah punya akun? <Link className="text-blue-700 hover:underline" href="/signin">Masuk ke akunmu</Link>
          </Form.Group>
        </Form>
      </div>
    </section>
  );
};

Page.displayName = 'Page';

export default Page;
