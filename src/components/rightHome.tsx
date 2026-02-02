'use client';
import { useUser } from '@/src/store/useUserStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';

export const RightHome = () => {
  const router = useRouter();
  const { user } = useUser();

  if (!user) return null;

  const handleInfo = () => router.push(`/${user.username}`)
  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/signin');
  };

  return (
    <div className="
  fixed hidden lg:flex right-2 top-12 rounded-full 
  border border-gray-200             
  dark:border-white
  bg-white dark:bg-black
  shadow-lg items-center gap-14 py-2 px-4
  text-black dark:text-white          
">

      <div className="flex items-center gap-2 cursor-pointer">
        <Image
          src={user.avatarUrl ?? '/avatar_default.jpg'}
          alt={user.username}
          width={40}
          height={40}
          className="rounded-full object-contain"
          onClick={handleInfo}
        />
        <span onClick={handleInfo} className="font-bold text-black dark:text-white">{user.username}</span>
      </div>
      <span
        onClick={handleLogout}
        className="
  text-blue-500 dark:text-blue-400    
  text-2xs cursor-pointer 
  hover:text-blue-700 dark:hover:text-blue-300  
"

      >
        Switch
      </span>
    </div>
  );
}
