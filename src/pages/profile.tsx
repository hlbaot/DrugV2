'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useUser } from '@/src/context/UserContext';
import Image from 'next/image';
import { useProfile } from '@/src/context/ProfileContext';
import IconGearModal from '@/src/components/modal_gearProfile';
import { ModalAva } from '../components/modal_avaProfile';
import { ModalEdit } from '@/src/components/modal_editProfile';
import { ModalShowPost } from '../components/modal_detailPost';
import { PostType } from '@/src/interfaces/post';
import { API_detailPost } from '@/src/api/API_detailPost';
import { getCommentsPostId } from '@/src/api/API_getPost';
import ProfileSkeleton from '@/public/skeletonProfile';

export default function Profile() {
  // State
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [modalAva, setModalAva] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalSP, setModalSP] = useState(false);

  const {
    myProfile,
    myPosts,
    viewedProfile,
    viewedPosts,
    refreshViewedProfile,
    refreshMyProfile,
    followUser,
    unfollowUser
  } = useProfile();

  const { user } = useUser();
  const username = useParams<{ username: string }>()?.username;
  const isMyProfile = username === user?.username;

  useEffect(() => {
    if (!user) return;
    if (isMyProfile) refreshMyProfile();
    else if (username) refreshViewedProfile(username);
  }, [user, username, isMyProfile]);


  const profile = isMyProfile ? myProfile : viewedProfile;
  const posts = isMyProfile ? myPosts : viewedPosts || [];

  if (!profile) return <ProfileSkeleton/>;

  // 🆕 Khi click vào bài viết → fetch chi tiết
  const handleOpenShowPost = async (id: number) => {
  try {
    // Gọi song song 2 API để nhanh hơn
    const [postDetail, comments] = await Promise.all([
      API_detailPost(id),
      getCommentsPostId(id),
    ]);

    // Gộp lại
    const mergedPost = {
      ...postDetail,
      comments: comments || [],
    };

    // Cập nhật state & mở modal
    setSelectedPost(mergedPost);
    setModalSP(true);
  } catch (error) {
    console.error('❌ Lỗi khi lấy chi tiết bài viết:', error);
  }
};

  return (
    <div className="flex flex-col mx-auto mt-16 sm:mt-12 w-full px-2 max-w-3xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-12 w-full px-4">
        {/* Avatar */}
        <div
          className={`relative flex justify-center sm:justify-start ${isMyProfile ? 'group cursor-pointer' : ''
            }`}
          onClick={() => isMyProfile && setModalAva(true)}
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-md border border-gray-200">
            <Image
              src={profile.avatarUrl || '/avatar_default.jpg'}
              alt="Avatar"
              width={150}
              height={150}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Overlay chỉ hiện khi là profile của mình */}
          {isMyProfile && (
            <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
              <span className="text-white text-xs sm:text-sm font-medium">
                Change Photo
              </span>
            </div>
          )}
        </div>

        {/* Modal đổi avatar */}
        {isMyProfile && (
          <ModalAva open={modalAva} onClose={() => setModalAva(false)} />
        )}

        {/* Info */}
        <section className="flex flex-col gap-4 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xl sm:text-2xl font-semibold">
              {profile.username}
            </p>

            {isMyProfile ? (
              <>
                <button
                  className="rounded-md border border-gray-300 bg-gray-100 px-3 py-1 text-sm font-medium hover:bg-gray-200 transition"
                  onClick={() => setModalEdit(true)}
                >
                  Edit profile
                </button>
                <IconGearModal />
                <ModalEdit
                  open={modalEdit}
                  onClose={() => setModalEdit(false)}
                />
              </>
            ) : (
              <button
                className={`rounded-md px-3 py-1 text-sm font-medium transition ${profile.isFollowing
                    ? 'bg-gray-300 hover:bg-gray-400'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                onClick={() =>
                  profile.isFollowing
                    ? unfollowUser(profile.id)
                    : followUser(profile.id)
                }
              >
                {profile.isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm sm:text-base">
            <p>
              <span className="font-semibold">{profile.postCount}</span> posts
            </p>
            <p>
              <span className="font-semibold">{profile.followerCount}</span>{' '}
              followers
            </p>
            <p>
              <span className="font-semibold">{profile.followingCount}</span>{' '}
              following
            </p>
          </div>

          {/* Bio */}
          <p className="text-sm sm:text-base">
            {profile.bioText || 'No bio yet'}
          </p>
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
              className="relative bg-gray-100 aspect-square overflow-hidden group cursor-pointer"
              onClick={() => handleOpenShowPost(post.id)}
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
                <p className="p-2 text-center text-sm text-gray-800">
                  {post.caption}
                </p>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-6 text-white text-lg font-semibold">
                <div className="flex items-center gap-1">❤️ {post.likeCount ?? 0}</div>
                <div className="flex items-center gap-1">💬 {post.commentCount ?? 0}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal hiển thị bài viết */}
      {selectedPost && (
        <ModalShowPost
          open={modalSP}
          onClose={() => setModalSP(false)}
          post={selectedPost}
        />
      )}
    </div>
  );
}
