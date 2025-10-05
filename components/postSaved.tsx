'use client'
import { SavedPostType } from '@/interfaces/savedPost'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { unSavePost } from '@/api/API_savePost';
import { useSavePostContext } from '@/context/SavePostContext';
import { usePostContext } from '@/context/PostContext';
import IconSave from './icon_save'

interface PostSavedProps {
  savedPost: SavedPostType
}

export default function PostSaved({ savedPost }: PostSavedProps) {
  const { updateSavedStatus } = useSavePostContext()
  const { updatePostSaveStatus } = usePostContext()
  const { posts: post, user } = savedPost
  const { id, caption, images, savedByCurrentUser } = post

  const handleUnsave = async () => {
    const nextSaved = !savedByCurrentUser;
    try {
      await unSavePost(id)
      // cập nhật ngay trong PostContext để UI đổi màu
      updatePostSaveStatus(id, nextSaved);
      // cập nhật SavePostContext để list “Saved Posts” cũng đồng bộ
      updateSavedStatus(id, false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex h-full flex-col bg-white border border-gray-200 rounded-md shadow-sm max-w-sm">

      {/* head */}
      <div className="w-full px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={user.avatar_url ?? '/avatar_default.jpg'}
            alt={user.username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold text-sm">{user.username}</span>
        </div>
        <IconSave postId={id} saved={savedByCurrentUser} onToggleSave={handleUnsave} />
      </div>

      {caption && (
        <div className="px-4 pb-2 text-gray-800 text-sm">
          {caption}
        </div>
      )}

      {images.length > 0 && (
        <div className="mt-auto w-full">
          <div className="rounded-lg overflow-hidden w-full aspect-[4/5] max-h-[450px]">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={images.length > 1}
              pagination={images.length > 1 ? { clickable: true } : false}
              className="w-full h-full"
            >
              {images.map((src, idx) => (
                <SwiperSlide key={idx} className="w-full h-full">
                  <div className="w-full h-full">
                    <img
                      src={src}
                      alt={`slide-${idx}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      <style jsx>{`
        :global(.swiper-button-prev),
        :global(.swiper-button-next) {
          color: white;
          width: 18px;
          height: 18px;
          font-size: 14px;
          background: rgba(0,0,0,0.3);
          border-radius: 9999px;
          display: ${images.length > 1 ? 'flex' : 'none'};
          align-items: center;
          justify-content: center;
        }
        :global(.swiper-pagination-bullet) { background: rgba(255,255,255,0.4); }
        :global(.swiper-pagination-bullet-active) { background: white; }
      `}</style>
    </div>
  )
}
