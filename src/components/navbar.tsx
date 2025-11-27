'use client';
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import CreateModal from "./modal_create";
import ModalMore from "./modal_more";
import { useUser } from '@/src/context/UserContext';
import '@/src/styles/navbar.scss'

export default function Navbar() {
  const pathname = usePathname();
  if (!pathname) return null;
  const active = pathname.split('/')[1] || "home";
  const [modalCreate, setmodalCreate] = useState(false);
  const [modalMore, setModalMore] = useState(false);
  const { user } = useUser();
  if (!user) return null;

  const isActive = (nameRouter: string) =>
    `menu-link p-2 rounded-[30px] flex items-center gap-4 
   text-black dark:text-white                        
   ${active === nameRouter ? 'bg-rose-400 text-white' :
      'hover:bg-gray-100 dark:hover:bg-neutral-700'
    }`;



  return (
    <div className="
  navbar fixed z-50 w-[4.5rem] lg:w-[18%] h-screen 
  border-r border-gray-300           
  flex flex-col items-center py-6 gap-8 
  bg-white                           
  dark:border-neutral-700        
  dark:bg-black
">

      {/* Logo */}
      <img
        src="/logo.png"
        alt="logo"
        className="hidden lg:block w-[10rem] h-auto mb-4 invert-0 dark:invert"
      />

      {/* Menu items */}
      <div className="menu flex flex-col justify-center gap-8">
        {/* Home */}
        <Link href="/home" className={isActive("home")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke={active === "home" ? "white" : "currentColor"}
            className="icon w-7 h-7 stroke-black dark:stroke-white">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 
              1.152-.439 1.591 0L21.75 12M4.5 
              9.75v10.125c0 .621.504 1.125 1.125 
              1.125H9.75v-4.875c0-.621.504-1.125 
              1.125-1.125h2.25c.621 0 1.125.504 
              1.125 1.125V21h4.125c.621 0 
              1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className={`text hidden lg:block text-2xl ${active === "home" ? "text-white" : ""}`}>Home</span>
        </Link>

        {/* Message */}
        <Link href="/message" className={isActive("message")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke={active === "message" ? "white" : "currentColor"}
            className="icon w-7 h-7 stroke-black dark:stroke-white">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 
              2.707 3.227 1.068.157 2.148.279 
              3.238.364.466.037.893.281 
              1.153.671L12 21l2.652-3.978c.26-.39.687-.634 
              1.153-.67 1.09-.086 2.17-.208 
              3.238-.365 1.584-.233 2.707-1.626 
              2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 
              48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 
              3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
          <span className="text hidden lg:block text-xl">Message</span>
        </Link>

        {/* Save */}
        <Link href="/save" className={isActive("save")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
            className="icon w-7 h-7 stroke-black dark:stroke-white">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 
              1.907 1.077 1.907 2.185V21L12 17.25 
              4.5 21V5.507c0-1.108.806-2.057 
              1.907-2.185a48.507 48.507 0 0 1 
              11.186 0Z" />
          </svg>
          <span className="text hidden lg:block text-xl">Save</span>
        </Link>

        {/* Create */}
        <div
          onClick={() => setmodalCreate(true)}
          className="
 menu-link p-2 flex items-center gap-4 cursor-pointer
 text-black dark:text-white                // 👈 thêm
 hover:bg-gray-100 dark:hover:bg-neutral-700  
"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
            className="icon w-7 h-7 stroke-black dark:stroke-white">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 
              1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span className="text hidden lg:block text-xl">Create</span>
        </div>
        <CreateModal open={modalCreate} onClose={() => setmodalCreate(false)} />

        {/* Profile */}
        <Link href={`/${user.username}`} className={isActive("profile")}>
          <img
            src={user?.avatarUrl ?? "/avatar_default.jpg"}
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text hidden lg:block text-xl">Profile</span>
        </Link>

        {/* Notifications */}
        <div className="noti menu-link p-2 flex items-center gap-4 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
            className="icon w-7 h-7 stroke-black dark:stroke-white">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 
              5.454-1.31A8.967 8.967 0 0 1 
              18 9.75V9A6 6 0 0 0 6 9v.75a8.967 
              8.967 0 0 1-2.312 6.022c1.733.64 
              3.56 1.085 5.455 1.31m5.714 0a24.255 
              24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 
              1-5.714 0" />
          </svg>
          <span className="text hidden lg:block text-xl">Notifications</span>
        </div>

        {/* More */}
        <div className="
 more relative menu-link p-2 flex items-center gap-4 cursor-pointer
 text-black dark:text-white                     // 👈 thêm
 hover:bg-gray-100 dark:hover:bg-neutral-700   // 👈 thêm
"
          onClick={() => setModalMore(prev => !prev)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
            className="icon w-7 h-7 stroke-black dark:stroke-white">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 
              4.5h16.5m-16.5 4.5h16.5m-16.5 
              4.5h16.5" />
          </svg>
          <span className="text hidden lg:block text-xl">More</span>
          {modalMore && <ModalMore />}
        </div>
      </div>
    </div>
  );
}

