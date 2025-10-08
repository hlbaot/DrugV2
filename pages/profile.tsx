'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useProfile } from '@/context/ProfileContext';
import IconGear from '../components/moda_gear';
import { ModalAva } from '../components/modal_avaProfile';

export default function Profile() {
  const [modalAva, setModalAva] = useState(false);
  const { userProfile, refreshProfile } = useProfile();
  const {username} = useParams();

  useEffect(() => {
    if(username){
      refreshProfile(username as string);
    }
  }, [username]);

  if (!username || !userProfile) return null;

  return (
    <div className="flex flex-col mx-auto mt-16 sm:mt-12 w-full px-2 max-w-3xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-12 w-full px-4">
        {/* Avatar */}
        <div
          className="relative group flex cursor-pointer justify-center sm:justify-start w-full sm:w-auto"
          onClick={() => setModalAva(true)}
        >
          <Image
            src={userProfile.avatarUrl || '/avatar_default.jpg'}
            alt="Avatar"
            width={150}
            height={150}
            className="aspect-square w-24 sm:w-32 md:w-36 rounded-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" />
        </div>
        <ModalAva open={modalAva} onClose={() => setModalAva(false)} />

        {/* Info */}
        <section className="flex flex-col gap-4 flex-1">
          {/* Username + Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xl sm:text-2xl font-semibold">{userProfile.username}</p>
            <button className="rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-medium hover:bg-gray-200">
              Edit profile
            </button>
            <IconGear />
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm sm:text-base">
            <p>
              <span className="font-semibold">{userProfile.postsCount}</span> posts
            </p>
            <p>
              <span className="font-semibold">{userProfile.followersCount}</span> followers
            </p>
            <p>
              <span className="font-semibold">{userProfile.followingsCount}</span> following
            </p>
          </div>

          {/* Bio */}
          <p className="text-sm sm:text-base">{userProfile.bioText || 'No bio yet'}</p>
        </section>
      </div>

      {/* Divider */}
      <hr className="mt-6 border-t border-gray-200" />

      {/* Grid posts */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2 mt-4 w-full">
        {userProfile.posts.map((post, idx) => {
          const hasImage = post.images.length > 0;
          return (
            <div
              key={post.id ?? `post-${idx}`}
              className="relative bg-gray-100 aspect-square overflow-hidden group"
            >
              {hasImage ? (
                <Image
                  src={post.images[0]}
                  alt={post.caption || 'Post image'}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              ) : (
                <p className="p-2 text-center text-sm text-gray-800">{post.caption}</p>
              )}
              {/* overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-6 text-white text-lg font-semibold">
                <div className="flex items-center gap-1">❤️ {post.likeCount ?? 0}</div>
                <div className="flex items-center gap-1">💬 {post.commentCount ?? 0}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
