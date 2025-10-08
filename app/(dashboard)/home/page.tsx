'use client'

import React from 'react'
import PostFeed from '@/pages/postFeed'
import { RightHome } from '@/components/rightHome'
export default function Page() {

  return (
    <div className='relative w-[100%] h-full flex justify-center'>
      <PostFeed />
      <RightHome />
    </div>
  );
}

