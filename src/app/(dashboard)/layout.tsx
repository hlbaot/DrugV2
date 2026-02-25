"use client";

import Navbar from '@/src/components/navbar';
import Header from '@/src/components/header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white dark:bg-black">
        <Header />
        <Navbar />
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}

