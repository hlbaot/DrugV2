'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/src/context/UserContext';
import Image from 'next/image';
import { useProfile } from '@/src/context/ProfileContext';
import IconGearModal from '@/src/components/modal_gearProfile';
import { ModalAva } from '../components/modal_avaProfile';
import { ModalEdit } from '@/src/components/modal_editProfile';
import { ModalShowPost } from '../components/modal_showPost';
import { PostType } from '../interfaces/post';

const fakedb = {
  id: 1,
  username: 'hlbaot',
  email: 'bt@gmail.com',
  avatar_url: '/test.jpg',
  bioText: 'This is a bio',
  followerCount: 100,
  followingCount: 150,
  postCount: 10,
  followerPreview: [],
  followingPreview: [],
  posts: [
    {
    id: 1,
    caption: "Buổi chụp ảnh hoàng hôn 🌅",
    images: ["/test.jpg", "/test2.jpg"],
    createdAt: "2025-10-25T12:00:00Z",
    user: {
      user_id: 1,
      username: "hlbaot",
      avatar_url: "/avatar_default.jpg",
    },
    comments: [
      {
        id: 101,
        content: "Ảnh này đẹp quá 😍",
        userId: 2,
        postId: 1,
        user: {
          id: 2,
          username: "minh",
          avatar_url: "/user2.jpg",
        },
      },
      {
        id: 102,
        content: "Bầu trời rực rỡ quá!",
        userId: 3,
        postId: 1,
        user: {
          id: 3,
          username: "linh",
          avatar_url: "/user3.jpg",
        },
      },
    ],
    commentCount: 2,
    likeCount: 230,
    likedByCurrentUser: true,
    savedByCurrentUser: false,
  },
  {
    id: 2,
    caption: "Concept chụp trong studio 🎬",
    images: ["/studio1.jpg", "/studio2.jpg"],
    createdAt: "2025-10-20T15:30:00Z",
    user: {
      user_id: 2,
      username: "minh",
      avatar_url: "/user2.jpg",
    },
    comments: [
      {
        id: 201,
        content: "Ánh sáng quá đẹp 👌",
        userId: 1,
        postId: 2,
        user: {
          id: 1,
          username: "hlbaot",
          avatar_url: "/avatar_default.jpg",
        },
      },
    ],
    commentCount: 1,
    likeCount: 154,
    likedByCurrentUser: false,
    savedByCurrentUser: true,
  },
  {
    id: 3,
    caption: "Buổi chụp ngoài biển 🌊",
    images: ["/beach1.jpg", "/beach2.jpg", "/beach3.jpg"],
    createdAt: "2025-10-18T09:45:00Z",
    user: {
      user_id: 3,
      username: "linh",
      avatar_url: "/user3.jpg",
    },
    comments: [],
    commentCount: 0,
    likeCount: 87,
    likedByCurrentUser: false,
    savedByCurrentUser: false,
  },
  ],
}


export default function Profile() {
  // dữ liệu người dùng lấy từ profileContext
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [modalAva, setModalAva] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalSP, setModalSP] = useState(false);
  const { myProfile, myPosts ,viewedProfile,viewedPosts ,refreshViewedProfile } = useProfile();
  const router = useRouter();
  // lấy username từ param
  const username = useParams<{ username: string }>()?.username;
  const { user } = useUser();
  if (!user) { return null }
  const isMyProfile = username === user?.username;

  const handleInfo = () => router.push(`/${user.username}`);
  
  const handleOpenShowPost = (post: PostType) => {
    setSelectedPost(post);
    setModalSP(true);
  }

  useEffect(() => {
    // Nếu là người khác -> gọi API
    if (username && !isMyProfile) {
      refreshViewedProfile(username);
    }
  }, [username, isMyProfile]);
  const profile = isMyProfile ? myProfile : viewedProfile;
  const posts = isMyProfile ? myPosts : viewedPosts || [];

  if (!profile) { return null; }

  return (
    <div className="flex flex-col mx-auto mt-16 sm:mt-12 w-full px-2 max-w-3xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-12 w-full px-4">
        {/* Avatar */}
        <div
          className="relative group cursor-pointer flex justify-center sm:justify-start"
          onClick={() => setModalAva(true)}
        >
          {/* Khung avatar tròn */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-md border border-gray-200">
            <Image
              src={profile.avatarUrl|| '/avatar_default.jpg'}
              alt="Avatar"
              width={150}
              height={150}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Overlay mờ khi hover */}
          <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
            <span className="text-white text-xs sm:text-sm font-medium">
              Change Photo
            </span>
          </div>
        </div>

        <ModalAva open={modalAva} onClose={() => setModalAva(false)} />

        {/* Info */}
        <section className="flex flex-col gap-4 flex-1">
          {/* Username + Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xl sm:text-2xl font-semibold">{profile.username}</p>
            <button className="rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-medium hover:bg-gray-200" onClick={() => setModalEdit(true)}>
              Edit profile
            </button>
            <IconGearModal />
            <ModalEdit open={modalEdit} onClose={() => setModalEdit(false)} />
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm sm:text-base">
            <p>
              <span className="font-semibold">{profile.postCount}</span> posts
            </p>
            <p>
              <span className="font-semibold">{profile.followerCount}</span> followers
            </p>
            <p>
              <span className="font-semibold">{profile.followingCount}</span> following
            </p>
          </div>

          {/* Bio */}
          <p className="text-sm sm:text-base">{profile.bioText || 'No bio yet'}</p>
        </section>
      </div>

      {/* Divider */}
      <hr className="mt-6 border-t border-gray-200" />

      {/* Grid posts */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2 mt-4 w-full">
        {posts.map((post, idx) => {
          const hasImage = post.images.length > 0;
          return (
            <div
              key={post.id ?? `post-${idx}`}
              className="relative bg-gray-100 aspect-square overflow-hidden group"
              // onClick={() => handleOpenShowPost(post)}
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
        {
          selectedPost && (
            <ModalShowPost
              open={modalSP}
              onClose={() => setModalSP(false)}
              post={selectedPost}
            />
          )
        }
      </div>
    </div>
  );
}
