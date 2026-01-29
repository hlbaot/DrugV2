'use client';
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import CreateModal from "./modal_create";
import ModalMore from "./modal_more";
import SearchDrawer from "./modal_search";
import NotificationDrawer from "./modal_notification";
import { useUser } from '@/src/context/UserContext';
import '@/src/styles/navbar.scss'

export default function Navbar() {
  const pathname = usePathname();
  if (!pathname) return null;
  const active = pathname.split('/')[1] || "home";
  const [modalCreate, setmodalCreate] = useState(false);
  const [modalMore, setModalMore] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const [modalNoti, setModalNoti] = useState(false);
  const { user } = useUser();
  if (!user) return null;

  const isActive = (nameRouter: string) =>
    `menu-link p-2 rounded-[30px] flex items-center gap-4 
   text-black dark:text-white                        
   ${active === nameRouter ? 'bg-rose-400 text-white' :
      'hover:bg-gray-100 dark:hover:bg-neutral-700'
    }`;

  // Close others when one opens
  const handleOpenSearch = () => {
    setModalSearch(!modalSearch);
    setModalMore(false);
    setModalNoti(false);
  }

  const handleOpenMore = () => {
    setModalMore(!modalMore);
    setModalSearch(false);
    setModalNoti(false);
  }

  const handleOpenNoti = () => {
    setModalNoti(!modalNoti);
    setModalSearch(false);
    setModalMore(false);
  }

  return (
    <>
      <div className={`
        navbar group fixed z-50 
        ${(modalSearch || modalNoti) ? "w-[72px]" : (modalMore ? "w-[220px]" : "w-[72px] hover:w-[220px]")}
        h-screen 
        border-r border-gray-300           
        flex flex-col items-start py-6 px-3
        bg-white                           
        dark:border-neutral-800        
        dark:bg-black
        transition-all duration-300 ease-in-out
        overflow-visible
      `}>

        {/* Logo */}
        <div className="w-full flex items-center justify-center mb-4 h-10">
          <span className={`text-2xl font-bold text-rose-500 ${modalSearch ? "" : (modalMore ? "hidden" : "group-hover:hidden")}`}>D</span>
          <img
            src="/logo.png"
            alt="logo"
            className={`${modalSearch ? "hidden" : (modalMore ? "block" : "hidden group-hover:block")} w-[140px] h-auto invert-0 dark:invert`}
          />
        </div>

        {/* Menu items */}
        <div className="menu flex flex-col gap-2 w-full flex-1 justify-center">
          {/* Home */}
          <Link href="/home" className={isActive("home")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" strokeWidth="1.5" stroke={active === "home" ? "white" : "currentColor"}
              className="icon w-7 h-7 min-w-[28px] stroke-black dark:stroke-white">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 
                1.152-.439 1.591 0L21.75 12M4.5 
                9.75v10.125c0 .621.504 1.125 1.125 
                1.125H9.75v-4.875c0-.621.504-1.125 
                1.125-1.125h2.25c.621 0 1.125.504 
                1.125 1.125V21h4.125c.621 0 
                1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span className={`nav-text whitespace-nowrap transition-opacity duration-200 text-lg ${modalSearch ? "hidden" : (modalMore ? "opacity-100" : "opacity-0 group-hover:opacity-100")} ${active === "home" ? "text-white" : ""}`}>Home</span>
          </Link>

          {/* Search - Desktop only */}
          <div data-search-trigger onClick={handleOpenSearch} className={`hidden lg:flex ${isActive("search")} cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`icon w-7 h-7 min-w-[28px] stroke-black dark:stroke-white ${modalSearch ? "stroke-[3px]" : ""}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <span className={`nav-text whitespace-nowrap transition-opacity duration-200 text-lg ${modalSearch ? "hidden" : (modalMore ? "opacity-100" : "opacity-0 group-hover:opacity-100")}`}>Search</span>
          </div>

          {/* Message */}
          <Link href="/message" className={isActive("message")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" strokeWidth="1.5" stroke={active === "message" ? "white" : "currentColor"}
              className="icon w-7 h-7 min-w-[28px] stroke-black dark:stroke-white">
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
            <span className={`nav-text whitespace-nowrap transition-opacity duration-200 text-lg ${modalSearch ? "hidden" : (modalMore ? "opacity-100" : "opacity-0 group-hover:opacity-100")}`}>Message</span>
          </Link>

          {/* Save */}
          <Link href="/save" className={isActive("save")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
              className="icon w-7 h-7 min-w-[28px] stroke-black dark:stroke-white">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 
                1.907 1.077 1.907 2.185V21L12 17.25 
                4.5 21V5.507c0-1.108.806-2.057 
                1.907-2.185a48.507 48.507 0 0 1 
                11.186 0Z" />
            </svg>
            <span className={`nav-text whitespace-nowrap transition-opacity duration-200 text-lg ${modalSearch ? "hidden" : (modalMore ? "opacity-100" : "opacity-0 group-hover:opacity-100")}`}>Save</span>
          </Link>

          {/* Create */}
          <div
            onClick={() => setmodalCreate(true)}
            className="
              menu-link p-2 rounded-[30px] flex items-center gap-4 cursor-pointer
              text-black dark:text-white
              hover:bg-gray-100 dark:hover:bg-neutral-700
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
              className="icon w-7 h-7 min-w-[28px] stroke-black dark:stroke-white">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 
                1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span className={`nav-text whitespace-nowrap transition-opacity duration-200 text-lg ${modalSearch ? "hidden" : (modalMore ? "opacity-100" : "opacity-0 group-hover:opacity-100")}`}>Create</span>
          </div>
          <CreateModal open={modalCreate} onClose={() => setmodalCreate(false)} />

          {/* Profile */}
          <Link href={`/${user.username}`} className={isActive("profile")}>
            <img
              src={user?.avatarUrl ?? "/avatar_default.jpg"}
              alt="User Avatar"
              className="w-7 h-7 min-w-[28px] rounded-full object-cover"
            />
            <span className={`nav-text whitespace-nowrap transition-opacity duration-200 text-lg ${modalSearch ? "hidden" : (modalMore ? "opacity-100" : "opacity-0 group-hover:opacity-100")}`}>Profile</span>
          </Link>

          {/* Notifications - Desktop only */}
          <div
            data-noti-trigger
            onClick={handleOpenNoti}
            className={`hidden lg:flex noti menu-link p-2 rounded-[30px] items-center gap-4 cursor-pointer text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
              className={`icon w-7 h-7 min-w-[28px] stroke-black dark:stroke-white ${modalNoti ? 'stroke-[3px]' : ''}`}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 
                5.454-1.31A8.967 8.967 0 0 1 
                18 9.75V9A6 6 0 0 0 6 9v.75a8.967 
                8.967 0 0 1-2.312 6.022c1.733.64 
                3.56 1.085 5.455 1.31m5.714 0a24.255 
                24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 
                1-5.714 0" />
            </svg>
            <span className={`nav-text whitespace-nowrap transition-opacity duration-200 text-lg ${(modalSearch || modalNoti) ? "hidden" : (modalMore ? "opacity-100" : "opacity-0 group-hover:opacity-100")}`}>Notifications</span>
          </div>
        </div>

        {/* More - Nằm cuối navbar */}
        <div className="
          more relative menu-link p-2 rounded-[30px] hidden lg:flex items-center gap-4 cursor-pointer w-full
          text-black dark:text-white                     
          hover:bg-gray-100 dark:hover:bg-neutral-700  
        "
          onClick={handleOpenMore}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
            className="icon w-7 h-7 min-w-[28px] stroke-black dark:stroke-white">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 
              4.5h16.5m-16.5 4.5h16.5m-16.5 
              4.5h16.5" />
          </svg>
          <span className={`nav-text whitespace-nowrap transition-opacity duration-200 text-lg ${(modalSearch || modalNoti) ? "hidden" : (modalMore ? "opacity-100" : "opacity-0 group-hover:opacity-100")}`}>More</span>
          {modalMore && <ModalMore className="absolute bottom-full mb-2 left-0" />}
        </div>
      </div>

      {/* Search Drawer - placed outside navbar */}
      <SearchDrawer open={modalSearch} onClose={() => setModalSearch(false)} />

      {/* Notification Drawer - placed outside navbar */}
      <NotificationDrawer open={modalNoti} onClose={() => setModalNoti(false)} />
    </>
  );
}
