'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Page() {
  const router = useRouter();
  const token = Cookies.get('token');
  useEffect(() => {
    if (token) {
      router.push('/home');
    } else {
      router.push('/signin');
    }
  }, []);

  // useEffect(() => {
  //   if (token) {
  //     router.push('/signin');
  //   } else {
  //     router.push('/home');
  //   }
  // }, []);

  return null;
}
