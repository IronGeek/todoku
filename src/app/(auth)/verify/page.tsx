'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Alert } from '@/components/alert.tsx';
import { Spinner } from '@/components/spinner.tsx';
import { Button } from '@/ui/forms/button.tsx';
import { cx } from '@/ui/utils.ts';

import styles from './page.module.scss';

import type { ChangeEvent, FormEvent, JSX } from 'react';

const Page = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({
    isShow : false,
    message: '',
    type   : ''
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    const { value } = e.target;
    if ((/^\d*$/u).test(value)) { setOtp(value) }
  };

  const verifyOtp = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setIsLoading(true);
    const res = await fetch('/api/auth/verify-otp', {
      body   : JSON.stringify({ email, otp }),
      headers: { 'Content-Type': 'application/json' },
      method : 'POST'
    });

    const data = await res.json();

    if (res.ok) {
      setAlert({
        isShow : true,
        message: 'Verification successful, you can now login',
        type   : 'success'
      });
      setIsLoading(false);
      localStorage.removeItem('pendingVerifyEmail');

      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    } else {
      setAlert({
        isShow : true,
        message: data.error || 'Verification failed',
        type   : 'error'
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const pendingVerifyEmail = localStorage.getItem('pendingVerifyEmail');

    setEmail(pendingVerifyEmail || '');
    setIsLoading(false);
  }, []);

  const sendOtp = async (): Promise<void> => {
    setIsLoading(true);
    const res = await fetch('/api/auth/send-otp', {
      body   : JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
      method : 'POST'
    });

    const data = await res.json();

    if (res.ok) {
      setAlert({
        isShow : true,
        message: `OTP resent, please check your email (${email})`,
        type   : 'success'
      });
    } else {
      setAlert({
        isShow : true,
        message: data.error || 'OTP resend failed',
        type   : 'error'
      });
    }

    setIsLoading(false);
  };

  return (
    <section className={cx(styles.section, 'h-screen flex items-center justify-center')}>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
        <form className="" onSubmit={verifyOtp}>
          <div className="mb-3">
            <h5 className="text-xl font-medium text-gray-900 text-center mb-2">Masukkan verifikasi OTP</h5>
            <p className="text-center text-[14px] text-gray-500 mb-2">Kami sudah mengirim kode ke <span className="font-bold text-gray-700">{email}</span></p>
            { alert.isShow ? <Alert message={alert.message} type={alert.type} /> : null}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="otp">OTP</label>

            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-center tracking-widest"
              id="otp"
              maxLength={6}
              name="otp"
              placeholder="______"
              required={true}
              type="text"
              value={otp}
              onChange={handleChange} />
          </div>

          <Button
            className="w-full button primary"
            disabled={isLoading}
            type="submit"
          >
            { isLoading ? 'Loading' : 'Verifikasi' }
            { isLoading ? <Spinner /> : null }
          </Button>

          <div className="text-sm font-medium text-gray-500 mt-4 mb-2">
            Tidak menerima kode? <button className="text-blue-700 hover:underline cursor-pointer" type="submit" onClick={sendOtp}>Kirim ulang OTP</button>
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
