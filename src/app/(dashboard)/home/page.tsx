'use client'

import React from 'react'
import PostFeed from '@/src/pages/postFeed'
import { RightHome } from '@/src/components/rightHome'
export default function Page() {

  return (
    <div className='relative w-[100%] h-full flex justify-center'>
      <PostFeed />
      <RightHome />
    </div>
  );
}

