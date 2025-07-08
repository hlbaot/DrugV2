'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push('/home');
    } else {
      router.push('/signin');
    }
  }, []);

  return null;
}
