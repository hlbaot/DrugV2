'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/interfaces/user'

export default function RightHome({ user }: { user: User }) {
  const router = useRouter()

  const [avatar, setAvatar] = useState('/avatar_default.jpg')
  const [username, setUsername] = useState(user.username)

  useEffect(() => {
    const storedAvatar = localStorage.getItem('avatar') ?? sessionStorage.getItem('avatar');
    const storedUsername = localStorage.getItem('userName') ?? sessionStorage.getItem('userName');

    setAvatar(storedAvatar || user.avatarUrl || '/avatar_default.jpg');
    setUsername(storedUsername || user.username);
  }, [user]);

  const handleInfo = () => {
    router.push('/profile')
  } 

  const handleLogout = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
    router.push('/signin')
  }

  return (
    <div className="fixed hidden lg:flex right-2 top-12 rounded-full border bg-white shadow-lg items-center gap-14 py-2 px-4">
      <div onClick={handleInfo} className="flex items-center gap-2 cursor-pointer">
        <img
          src={avatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className='font-bold'>{username}</span>
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
