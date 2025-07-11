import "../styles/navbar.module.scss";
import Link from "next/link";

function Navbar() {
  return (
    <div className="w-[4.5rem] lg:w-[20%] h-screen border-r border-gray-300 flex flex-col items-center py-6 gap-8">
      {/* Logo */}
      <img className="w-25 h-20" src="/logo.png" alt="logo" />

      {/* Menu items */}
      <div className="flex flex-col items-center gap-8">
        {/* Home */}
        <Link href="/home" className="flex flex-col items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
            className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 
          1.152-.439 1.591 0L21.75 12M4.5 
          9.75v10.125c0 .621.504 1.125 1.125 
          1.125H9.75v-4.875c0-.621.504-1.125 
          1.125-1.125h2.25c.621 0 1.125.504 
          1.125 1.125V21h4.125c.621 0 
          1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className="hidden lg:block text-sm">Home</span>
        </Link>

        {/* Message */}
        <Link href="/message" className="flex flex-col items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
            className="w-6 h-6">
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
          <span className="hidden lg:block text-sm">Message</span>
        </Link>

        {/* Save */}
        <Link href="/save" className="flex flex-col items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
            className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 
          1.907 1.077 1.907 2.185V21L12 17.25 
          4.5 21V5.507c0-1.108.806-2.057 
          1.907-2.185a48.507 48.507 0 0 1 
          11.186 0Z" />
          </svg>
          <span className="hidden lg:block text-sm">Save</span>
        </Link>

        {/* Create */}
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
            className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 
          1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span className="hidden lg:block text-sm">Create</span>
        </div>

        {/* Profile */}
        <Link href="/profile" className="flex flex-col items-center gap-1">
          <img className="w-6 h-6 rounded-full border border-black" src="/usser_icon.png" alt="avatar" />
          <span className="hidden lg:block text-sm">Profile</span>
        </Link>

        {/* Notifications */}
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
            className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 
          5.454-1.31A8.967 8.967 0 0 1 
          18 9.75V9A6 6 0 0 0 6 9v.75a8.967 
          8.967 0 0 1-2.312 6.022c1.733.64 
          3.56 1.085 5.455 1.31m5.714 0a24.255 
          24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 
          1-5.714 0" />
          </svg>
          <span className="hidden lg:block text-sm">Notifications</span>
        </div>

        {/* More */}
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
            className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 
          4.5h16.5m-16.5 4.5h16.5m-16.5 
          4.5h16.5" />
          </svg>
          <span className="hidden lg:block text-sm">More</span>
        </div>
      </div>
    </div>

  );
}

export default Navbar;
