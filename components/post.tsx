'use client'

import { useEffect, useState } from 'react'
import IconHeart from "../public/icon_heart"
import ThreeDotModal from './modal_post'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface PostType {
  username: string
  caption: string
  avatar: string
  images: string[]
  likes: number
  comments: number
  commentPreview: string[]
}

function Post() {
  const [post, setPost] = useState<PostType | null>(null)
  const [showAllComments, setShowAllComments] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      const data: PostType = {
        username: 'hlbaot',
        caption: 'Hi, daden',
        avatar: 'https://i.pinimg.com/736x/b6/88/31/b68831ed5d31b7f569560a8805ff06ec.jpg',
        images: [
          'https://i.pinimg.com/736x/88/43/3f/88433f7556fb6968ef31fa2405aeb18b.jpg',
          'https://i.pinimg.com/736x/f5/0d/4e/f50d4e1f62f0c6d2552494ca3c4f11cd.jpg',
        ],
        likes: 12,
        comments: 3,
        commentPreview: ['Ảnh đẹp quá!', 'Chụp ở đâu đó?', 'Nhìn mê thật!', 'hii', 'quá trời xịn', 'Ảnh đẹp quá!', 'Chụp ở đâu đó?', 'Nhìn mê thật!', 'hii', 'quá trời xịn', 'Ảnh đẹp quá!', 'Chụp ở đâu đó?', 'Nhìn mê thật!', 'hii', 'quá trời xịn'],
      }
      setPost(data)
    }

    fetchPost()
  }, [])

  if (!post) return <div>Loading...</div>

  return (
    <div className="post my-4 p-4 max-w-md border rounded-lg bg-white shadow">
      {/* Header */}
      <div className="head flex items-center mb-3 justify-between">
        <div className="left flex items-center space-x-2">
          <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
          <span className="font-semibold">{post.username}</span>
        </div>
        <ThreeDotModal />
      </div>

      <span className="block mb-2">{post.caption}</span>

      {/* Slider hình ảnh */}
      <div className="mb-3 rounded-lg overflow-hidden relative">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="rounded-lg"
        >
          {post.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="w-full h-96 bg-black flex items-center justify-center overflow-hidden">
                <img src={img} alt={`slide-${idx}`} className="w-full h-full object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CSS cho Swiper (ngay trong component) */}
        <style jsx>{`
          :global(.swiper-button-prev),
          :global(.swiper-button-next) {
            color: white;
            width: 24px;
            height: 24px;
            font-size: 14px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          :global(.swiper-button-prev)::after,
          :global(.swiper-button-next)::after {
            font-size: 14px;
          }

          :global(.swiper-pagination-bullet) {
            background: rgba(255, 255, 255, 0.4);
          }

          :global(.swiper-pagination-bullet-active) {
            background: white;
          }
        `}</style>
      </div>

      {/* Like + Comment icons */}
      <div className="react flex space-x-4 mb-2 text-sm text-gray-600">
        <div>
          <span className="flex items-center space-x-1">
            <IconHeart />
            <span>{post.likes} likes</span>
          </span>

          <span className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
            <span>{post.comments} comments</span>
          </span>
        </div>

      </div>

      <hr className="mb-4" />

      {/* ✅ Preview bình luận với scroll */}
      <div
        className={`show-cmt text-sm mb-2 transition-all duration-300 ${showAllComments ? 'max-h-32 overflow-y-auto pr-1' : ''
          }`}
      >
        {(showAllComments ? post.commentPreview : post.commentPreview.slice(0, 3)).map((cmt, i) => (
          <div key={i} className="mb-1 leading-snug">
            <span className="font-semibold">{post.username}</span> {cmt}
          </div>
        ))}

        {post.commentPreview.length > 3 && (
          <button
            className="text-blue-500 text-xs mt-1"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments ? 'Hide comments' : 'See all comments'}
          </button>
        )}
      </div>


      <hr className="mb-2" />

      {/* Form thêm bình luận */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="size-6 cursor-pointer" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
      </div>
    </div>
  )
}

export default Post
