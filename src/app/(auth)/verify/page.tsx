'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

import { Spinner } from '@/components/spinner';
import { Alert } from '@/components/alert';

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
    <section className="h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
        <form className="" onSubmit={verifyOtp}>
            <div className="mb-3">
              <h5 className="text-xl font-medium text-gray-900 text-center mb-2">Enter verification OTP</h5>
              <p className="text-center text-[14px] text-gray-500 mb-2">We&apos;ve send a code to <span className="font-bold text-gray-700">{email}</span></p>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="______"
                  value={otp}
                  maxLength={6}
                  onChange={handleChange}
                  required
                />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center gap-3 cursor-pointer"
            >
              { isLoading ? 'Loading' : 'Verify' }
              { isLoading && (<Spinner />) }
            </button>

            <div className="text-sm font-medium text-gray-500 mt-4">
                Didn&apos;t receive the code? <button onClick={sendOtp} className="text-blue-700 hover:underline cursor-pointer">Resend OTP</button>
            </div>
        </form>
      </div>
    </section>
  )
}
