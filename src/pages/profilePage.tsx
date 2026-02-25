'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/src/store/useUserStore';
import Image from 'next/image';
import { useFullProfile, profileKeys } from '@/src/hooks/queries/useProfile';
import { useFollowUser, useUnfollowUser } from '@/src/hooks/mutations/useProfileMutations';
import IconGearModal from '@/src/components/modal_gearProfile';
import { ModalAva } from '../components/modal_avaProfile';
import { ModalEdit } from '@/src/components/modal_editProfile';
import { ModalShowPost } from '../components/modal_detailPost';
import { PostType } from '@/src/interfaces/post';
import { API_detailPost } from '@/src/api/API_detailPost';
import { getCommentsPostId } from '@/src/api/API_getPost';
import ProfileSkeleton from '@/public/skeletonProfile';
import ModalFollowers from '../components/modal_follower';
import ModalFollowing from '../components/modal_following';
import { useMessageList, messageKeys } from '@/src/hooks/queries/useMessage';
import { createRoom } from '@/src/api/API_Message';

export default function Profile() {
  // Trạng thái
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [modalAva, setModalAva] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalSP, setModalSP] = useState(false);
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);

  const { user } = useUser();
  const params = useParams<{ username: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const username = params?.username;

  // Trả về sớm nếu không có username
  if (!username) return <ProfileSkeleton />;

  const isMyProfile = username === user?.username;

  // TanStack Query hooks
  const { profile, posts, isLoading } = useFullProfile(username);
  const { data: messageList } = useMessageList();
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  if (isLoading || !profile) return <ProfileSkeleton />;

  const handleFollow = () => {
    followMutation.mutate({ userId: profile.id, username: profile.username });
  };

  const handleUnfollow = () => {
    unfollowMutation.mutate({ userId: profile.id, username: profile.username });
  };


  const handleClickMessage = async () => {
    const existingRoom = messageList?.find((room) => room.partner.id === profile.id);

    if (existingRoom) {
      router.push(`/message/${existingRoom.roomId}`);
    } else {
      try {
        const newRoom = await createRoom(profile.id);

        // Cập nhật lại danh sách tin nhắn để room mới hiện ngay
        await queryClient.invalidateQueries({ queryKey: messageKeys.list() });

        const newRoomId = newRoom.roomId ?? newRoom.id;
        router.push(`/message/${newRoomId}`);
      } catch (error) {
        console.error('❌ Lỗi khi tạo phòng:', error);
      }
    }
  };

  // Khi click vào bài viết → fetch chi tiết
  const handleOpenShowPost = async (id: number) => {
    try {
      const [postDetail, comments] = await Promise.all([
        API_detailPost(id),
        getCommentsPostId(id),
      ]);
      // gộp 2 thông tin post và comments
      const mergedPost = {
        ...postDetail,
        comments: comments || [],
      };

      setSelectedPost(mergedPost);
      setModalSP(true);
    } catch (error) {
      console.error('❌ Lỗi khi lấy chi tiết bài viết:', error);
    }
  };

  return (
    <div className="flex flex-col mx-auto mt-16 sm:mt-12 w-full px-2 max-w-3xl">
      {/* Tiêu đề */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-12 w-full px-4">
        {/* Ảnh đại diện */}
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

          {/* Lớp phủ */}
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

        {/* Thông tin */}
        <section className="flex flex-col gap-4 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xl sm:text-2xl font-semibold">
              {profile.username}
            </p>

            {isMyProfile ? (
              <>
                <button
                  onClick={() => setModalEdit(true)}
                  className="
                    rounded-md px-3 py-1 text-sm font-medium transition border
                    bg-gray-100 border-gray-300 text-black hover:bg-gray-200
                    dark:bg-neutral-800 dark:border-neutral-600 dark:text-white
                    dark:hover:bg-neutral-700
                  "
                >
                  Edit profile
                </button>

                <IconGearModal />
                <ModalEdit open={modalEdit} onClose={() => setModalEdit(false)} />
              </>
            ) : (
              <>
                <button
                  className={`
                    rounded-md px-4 py-1.5 text-sm font-medium transition
                    ${profile.isFollowing
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-600 border border-gray-300 dark:border-neutral-600'
                      : 'bg-[#0095f6] text-white hover:bg-[#1877f2]'
                    }
                  `}
                  onClick={() =>
                    profile.isFollowing
                      ? handleUnfollow()
                      : handleFollow()
                  }
                  disabled={followMutation.isPending || unfollowMutation.isPending}
                >
                  {followMutation.isPending || unfollowMutation.isPending
                    ? '...'
                    : profile.isFollowing
                      ? 'Following'
                      : 'Follow'
                  }
                </button>

                <button
                  onClick={handleClickMessage}
                  className="
                    rounded-md px-4 py-1.5 text-sm font-medium transition border
                    bg-gray-100 border-gray-300 text-black hover:bg-gray-200
                    dark:bg-neutral-800 dark:border-neutral-600 dark:text-white
                    dark:hover:bg-neutral-700
                  "
                >
                  Message
                </button>
              </>
            )}
          </div>

          {/* Thống kê */}
          <div className="flex gap-6 text-sm sm:text-base">
            <p>
              <span className="font-semibold">{profile.postCount}</span> posts
            </p>

            <p
              className="cursor-pointer"
              onClick={() => setOpenFollowers(true)}
            >
              <span className="font-semibold">{profile.followerCount}</span>{' '}
              followers
            </p>

            <p
              className="cursor-pointer"
              onClick={() => setOpenFollowing(true)}
            >
              <span className="font-semibold">{profile.followingCount}</span>{' '}
              following
            </p>
          </div>

          {/* Tiểu sử */}
          <p className="text-sm sm:text-base">{profile.bioText || 'No bio yet'}</p>
        </section>
      </div>

      {/* Đường phân cách */}
      <hr className="mt-6 border-t border-gray-200" />

      {/* Lưới bài viết */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2 mt-4 w-full">
        {(posts || []).map((post, idx) => (
          <div
            key={post.id ?? `post-${idx}`}
            className="relative bg-gray-100 aspect-square overflow-hidden group cursor-pointer"
            onClick={() => handleOpenShowPost(post.id)}
          >
            {post.images.length > 0 ? (
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
        ))}
      </div>

      {/* Modal followers */}
      <ModalFollowers
        open={openFollowers}
        onClose={() => setOpenFollowers(false)}
        username={profile.username}
        isMyProfile={isMyProfile}
      />

      {/* Modal following */}
      <ModalFollowing
        open={openFollowing}
        onClose={() => setOpenFollowing(false)}
        username={profile.username}
        isMyProfile={isMyProfile}
      />

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
