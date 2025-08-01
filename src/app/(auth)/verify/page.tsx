'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

import { Spinner } from '@/components/spinner';
import { Alert } from '@/components/alert';

import styles from './page.module.scss';
import { cx } from '@/ui/utils';
import { Button } from '@/ui/forms/button';
import Link from 'next/link';

export default function Page(){
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({
    type: '',
    message: '',
    isShow: false
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const { value } =e.target;
    if (/^\d*$/u.test(value)) { setOtp(value) }
  }

  const verifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, otp }),
    });

    const data = await res.json();

    if (res.ok){
      setAlert({
        type: 'success',
        message: 'Verification successful, you can now login',
        isShow: true
      });
      setIsLoading(false);
      localStorage.removeItem('pendingVerifyEmail');

      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    }else{
      setAlert({
        type: 'error',
        message: data.error || 'Verification failed',
        isShow: true
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const pendingVerifyEmail = localStorage.getItem('pendingVerifyEmail');
    setEmail(pendingVerifyEmail || '');
    setIsLoading(false);
  }, [])

  const sendOtp = async () => {
    setIsLoading(true);
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok){
      setAlert({
        type: 'success',
        message: `OTP resent, please check your email (${email})`,
        isShow: true
      })
    }else{
      setAlert({
        type: 'error',
        message: data.error || 'OTP resend failed',
        isShow: true
      });
    }
    setIsLoading(false);
  };

  return (
    <section className={cx(styles.section, "h-screen flex items-center justify-center")}>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
        <form className="" onSubmit={verifyOtp}>
            <div className="mb-3">
              <h5 className="text-xl font-medium text-gray-900 text-center mb-2">Masukkan verifikasi OTP</h5>
              <p className="text-center text-[14px] text-gray-500 mb-2">Kami sudah mengirim kode ke <span className="font-bold text-gray-700">{email}</span></p>
              { alert.isShow && (
                <Alert type={alert.type}  message={alert.message} />
              )}
            </div>
            <div className="mb-6">
                <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900">OTP</label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-center tracking-widest"
                  placeholder="______"
                  value={otp}
                  maxLength={6}
                  onChange={handleChange}
                  required
                />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full button primary"
            >
              { isLoading ? 'Loading' : 'Verifikasi' }
              { isLoading && (<Spinner />) }
            </Button>

            <div className="text-sm font-medium text-gray-500 mt-4 mb-2">
                Tidak menerima kode? <button onClick={sendOtp} className="text-blue-700 hover:underline cursor-pointer">Kirim ulang OTP</button>
            </div>
            <div className="text-sm font-medium text-gray-500">
            Kembali ke <Link href="/" className="text-blue-700 hover:underline">Homepage</Link>
          </div>
        </form>
      </div>
    </section>
  )
}
