'use client'
import React from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useTheme } from "next-themes";

const ModalMore = ({ className }: { className?: string }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.clear();
    router.push("/signin");
  };

  return (
    <div
      className={`
        ${className || 'absolute bottom-full mb-2 left-0'}
        flex flex-col min-w-max rounded-xl overflow-hidden
        bg-white dark:bg-neutral-900
        text-black dark:text-white
        shadow-lg 
        border border-gray-300 dark:border-neutral-800
        ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10
      `}
    >

      {/* 🌙 Toggle Theme */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="
          p-3 text-left font-medium
          text-black dark:text-white
          hover:bg-gray-100 dark:hover:bg-neutral-700
        "
      >
        {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
      </button>

      {/* ⚙ Settings */}
      <button
        className="
          flex items-center w-full px-4 py-3 gap-3 text-base
          text-gray-700 dark:text-gray-300
          hover:bg-gray-100 dark:hover:bg-neutral-700
          cursor-pointer
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="w-6 h-6 stroke-black dark:stroke-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317a1.724 1.724 0 013.35 0 1.724 1.724 
            0 002.591 1.099 1.724 1.724 0 012.42 2.42 1.724 1.724 
            0 001.098 2.59 1.724 1.724 0 010 3.351 1.724 1.724 
            0 00-1.098 2.59 1.724 1.724 0 01-2.42 2.42 1.724 
            1.724 0 00-2.59 1.098 1.724 1.724 0 01-3.351 0 
            1.724 1.724 0 00-2.59-1.098 1.724 1.724 0 01-2.42-2.42 
            1.724 1.724 0 00-1.098-2.59 1.724 1.724 0 010-3.351 
            1.724 1.724 0 001.098-2.59 1.724 1.724 0 012.42-2.42 
            1.724 1.724 0 002.59-1.098z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>

        <span>Settings</span>
      </button>

      <hr className="border-gray-300 dark:border-neutral-700" />

      <button
        className="
          flex items-center w-full px-4 py-3 gap-3 text-base
          text-gray-700 dark:text-gray-300
          hover:bg-gray-100 dark:hover:bg-neutral-700
          cursor-pointer
        "
        onClick={handleLogout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="w-6 h-6 stroke-black dark:stroke-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 
            2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 
            2.25 0 002.25-2.25V15m-6 0l3-3m0 0l-3-3m3 3H3"
          />
        </svg>

        <span className="text-red-600">Logout</span>
      </button>
    </div>
  );
};

export default ModalMore;
