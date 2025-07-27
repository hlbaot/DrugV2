"use client";

import Navbar from '@/components/navbar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      router.push('/signin');
    } else {
      setAuthChecked(true);
    }
  }, []);

  if (!authChecked) return null;

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

// import Navbar from '@/components/navbar';

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex min-h-screen">
//       <Navbar />
//       <main className='flex-1'>{children}</main>
//     </div>
//   );
// }