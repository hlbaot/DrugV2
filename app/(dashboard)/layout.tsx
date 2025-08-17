"use client";

import Navbar from '@/components/navbar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/header';
import { PostProvider } from '@/context/PostContext';
import { SavePostProvider } from '@/context/SavePostContext';
import { ProfileProvider } from '@/context/ProfileContext';
// import { SocketProvider } from '@/context/SocketContext';

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
    <>
      <ProfileProvider>
        {/* <SocketProvider> */}
        < PostProvider >
          <SavePostProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
          </SavePostProvider>
        </PostProvider >
        {/* </SocketProvider> */}
      </ProfileProvider>
    </>
  );
}

// import Navbar from '@/components/navbar';
// import Header from '@/components/header';
// import { PostProvider } from '@/context/PostContext';
// import { SavePostProvider } from '@/context/SavePostContext';
// import { ProfileProvider } from '@/context/ProfileContext';

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <ProfileProvider>
//       <PostProvider>
//         <SavePostProvider>
//           <div className="flex flex-col min-h-screen">
//             <Header />
//             <Navbar />
//             <main className="flex-1">{children}</main>
//           </div>
//         </SavePostProvider>
//       </PostProvider>
//     </ProfileProvider>
//   );
// }
