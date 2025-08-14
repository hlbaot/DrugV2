'use client'

import React from 'react'
import PostFeed from '@/components/postFeed'
import RightHome from '@/components/rightHome'
function Page() {
  
  return (
    <div className='relative w-[100%] h-full flex justify-center'>
      <PostFeed />
      <RightHome/>
    </div>
  );
}

export default Page;
