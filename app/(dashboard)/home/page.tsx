'use client'

import React from 'react'
import PostFeed from '@/components/postFeed'
import LeftHome from '@/components/leftHome'
import { User } from '@/interfaces/user'

function Page() {
  const user: User = {
    id: parseInt(localStorage.getItem("userId") ?? sessionStorage.getItem("userId") ?? "0"),
    email: "",
    username: localStorage.getItem("userName") ?? sessionStorage.getItem("userName") ?? "",
    roles: [],
    avatarUrl: localStorage.getItem("avatar") ?? sessionStorage.getItem("avatar") ?? null
  };

  return (
    <div className='relative w-[100%] h-full flex justify-center'>
      <PostFeed />
      <LeftHome user={user} />
    </div>
  );
}

export default Page;
