'use client'
import { SavedPostType } from '@/interfaces/savedPost'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { unSavePost } from '@/api/API_savePost';
import { useSavePostContext } from '@/context/SavePostContext';
import IconSave from './icon_save'

interface PostSavedProps {
  savedPost: SavedPostType
}

export default function PostSaved({ savedPost }: PostSavedProps) {
  const { updateSavedStatus } = useSavePostContext()
  const { posts: post } = savedPost
  const { user, caption, images, id, savedByCurrentUser } = post

  // handle unSave
  const handleUnsave = async () => {
    try {
      await unSavePost(id);
      updateSavedStatus(id, false);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="h-auto flex flex-col items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* head */}
      <div className="w-full flex items-center justify-between ">
        <div className="flex items-center space-x-2">
          <img
            src={user.avatar_url ?? "/avatar_default.jpg"}
            alt={user.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">{user.username}</span>
        </div>
        {/* icon save */}
        <IconSave
          postId={id}
          saved={true}
          onToggleSave={handleUnsave}
        />

      </div>

      {/* caption */}
      {caption && (
        <span className="block mb-2 text-gray-800">
          {caption}
        </span>
      )}

      {/* images slider */}
      {images.length > 0 && (
        <div className="mb-3 rounded-lg overflow-hidden relative w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={images.length > 1}
            pagination={images.length > 1 ? { clickable: true } : false}
            className="rounded-lg"
          >
            {images.map((src, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className="relative w-full mx-auto overflow-hidden rounded-md"
                  style={{ aspectRatio: '4/5', maxHeight: '500px' }}
                >
                  <img
                    src={src}
                    alt={`slide-${idx}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <style jsx>{`
        :global(.swiper-button-prev),
        :global(.swiper-button-next) {
          color: white;
          width: 18px;
          height: 18px;
          font-size: 14px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 9999px;
          display: ${images.length > 1 ? 'flex' : 'none'};
          align-items: center;
          justify-content: center;
        }

        :global(.swiper-pagination-bullet) {
          background: rgba(255, 255, 255, 0.4);
        }

        :global(.swiper-pagination-bullet-active) {
          background: white;
        }
      `}</style>
    </div>
  )
}
