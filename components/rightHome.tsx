'use client';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

export default function RightHome() {
  const router = useRouter();
  const { user } = useUser();

  if (!user) return null;

  const handleInfo = () => router.push('/profile');
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/signin');
  };

  return (
    <div className="fixed hidden lg:flex right-2 top-12 rounded-full border bg-white shadow-lg items-center gap-14 py-2 px-4">
      <div onClick={handleInfo} className="flex items-center gap-2 cursor-pointer">
        <img
          src={user.avatarUrl ?? '/avatar_default.jpg'}
          alt={user.username}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-bold">{user.username}</span>
      </div>
      <span
        onClick={handleLogout}
        className="text-blue-500 text-2xs cursor-pointer hover:text-blue-700"
      >
        Switch
      </span>
    </div>
  );
}
