"use client";

import Cookies from "js-cookie";
import Navbar from '@/src/components/navbar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/src/components/header';
import { PostProvider } from '@/src/context/PostContext';
import { SavePostProvider } from '@/src/context/SavePostContext';
import { ProfileProvider } from '@/src/context/ProfileContext';
import { SocketProvider } from '@/src/context/SocketContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // const router = useRouter();
  // const [authChecked, setAuthChecked] = useState(false);

  // useEffect(() => {
  //   const token = Cookies.get('token');
  //   if (!token) {
  //     router.push('/signin');
  //   } else {
  //     setAuthChecked(true);
  //   }
  // }, []);

  // if (!authChecked) return null;

  return (
    <>
      <ProfileProvider>
        <SocketProvider>
          < PostProvider >
            <SavePostProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <Navbar />
                <main className="flex-1">{children}</main>
              </div>
            </SavePostProvider>
          </PostProvider >
        </SocketProvider>
      </ProfileProvider>
    </>
  );
}

// import Navbar from '@/src/components/navbar';
// import Header from '@/src/components/header';
// import { PostProvider } from '@/src/context/PostContext';
// import { SavePostProvider } from '@/src/context/SavePostContext';
// import { ProfileProvider } from '@/src/context/ProfileContext';
// import { SocketProvider } from '@/src/context/SocketContext';

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <ProfileProvider>
//       <SocketProvider>
//         <PostProvider>
//           <SavePostProvider>
//             <div className="flex flex-col min-h-screen">
//               <Header />
//               <Navbar />
//               <main className="flex-1">{children}</main>
//             </div>
//           </SavePostProvider>
//         </PostProvider>
//       </SocketProvider>
//     </ProfileProvider>
//   );
// }
