'use client'
import { useState, useEffect } from 'react'
// import { useCommentSocket } from '../socket/comment'
// import { Comment } from '../socket/comment'
import IconHeart from './icon_heart'
import IconSave from './icon_save'
import { usePostContext } from '@/context/PostContext';
import { useSavePostContext } from '@/context/SavePostContext';
import ThreeDotModal from '../components/modal_post'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { likePost, unlikePost } from '@/api/API_likePost'
import { savePost, unSavePost } from '@/api/API_savePost';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function Post({ postId }: { postId: number }) {
  const [showAllComments, setShowAllComments] = useState(false)
  const [newComments, setNewComments] = useState<string[]>([])
  const [commentText, setCommentText] = useState('')
  const [userId, setUserId] = useState<string | null>(null)

  const { posts, setPosts, updatePostLikeStatus } = usePostContext();
  const { savedPosts, setSavedPosts, updateSavedStatus } = useSavePostContext();
  const post = posts.find((p) => p.id === postId);
  if (!post) return null;

  const {
    id,
    caption,
    images,
    user,
    comments,
    commentCount,
    likeCount,
    likedByCurrentUser,
    savedByCurrentUser
  } = post;

  useEffect(() => {
    const id = sessionStorage.getItem('userId') || localStorage.getItem('userId')
    setUserId(id)
  }, [])

  //check id account == với id post không
  const isOwner = userId === post.user.user_id.toString();

  // handle like
  const handleToggleLike = async () => {
    const nextLiked = !likedByCurrentUser;
    const newCount = nextLiked ? likeCount + 1 : likeCount - 1;
    // liked / unliked
    if (nextLiked) {
      await likePost(id);
    } else {
      await unlikePost(id);
    }
    // Cập nhật lại context
    updatePostLikeStatus(id, nextLiked, newCount);
  };

  // handle save
  const handleToggleSave = async () => {
    try {
      const nextSaved = !savedByCurrentUser;

      if (nextSaved) {
        await savePost(id);
      } else {
        await unSavePost(id);
      }

      // Cập nhật trạng thái lưu trong context
      updateSavedStatus(id, nextSaved);
    } catch (error) {
      console.error("Lỗi khi lưu/huỷ lưu bài viết:", error);
    }
  };

  // const { sendComment } = useCommentSocket(post.postId, (comment) => {
  //   setNewComments((prev) => [...prev, comment.content])
  // })


  // const handleSendComment = () => {
  //   if (commentText.trim() && userId) {
  //     sendComment({
  //       content: commentText,
  //       authorId: userId,
  //       postId: post.postId,
  //     })
  //     setCommentText('')
  //   }
  // }

  return (
    <div className="w-full mx-auto my-4 p-4 border rounded-lg bg-white shadow
  max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">

      {/* Header */}
      <div className="head flex items-center mb-3 justify-between">
        <div className="left flex items-center space-x-2">
          <img
            src={user.avatar_url ?? "/avatar_default.jpg"}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />

          <span className="font-semibold">{user.username}</span>

        </div>
        <ThreeDotModal
          showDelete={isOwner}
          onDelete={() => setPosts(posts.filter((p) => p.id !== id))}
          postId={id}
        />
      </div>

      {/* caption */}
      <span className="block mb-2">{caption}</span>

      {/* Slider hình ảnh */}
      <div className="mb-3 rounded-lg overflow-hidden relative">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={images.length > 1}
          pagination={images.length > 1 ? { clickable: true } : false}
          className="rounded-lg"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="relative w-full mx-auto overflow-hidden rounded-md"
                style={{
                  aspectRatio: '4/5',
                  maxHeight: '500px'
                }}
              >
                <img
                  src={img}
                  alt={`slide-${idx}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>


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


      {/* Like + Comment icons */}
      <div className="react flex justify-between items-center space-x-4 mb-2 text-sm text-gray-600">
        <div className='flex w-auto gap-4'>
          <span className="flex items-center space-x-2">
            <IconHeart
              postId={id}
              liked={likedByCurrentUser}
              likeCount={likeCount}
              onToggleLike={handleToggleLike}
            />


            <span>{likeCount} likes</span>
          </span>

          <span className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
            <span>{commentCount} comments</span>

          </span>
        </div>

        <IconSave postId={id} saved={savedByCurrentUser} onToggleSave={handleToggleSave} />
      </div>

      <hr className="mb-4" />

      {/* Bình luận */}
      {/* <div className={`show-cmt text-sm mb-2 transition-all duration-300 ${showAllComments ? 'max-h-32 overflow-y-auto pr-1' : ''}`}>
        {(showAllComments ? post.commentPreview : post.commentPreview.slice(0, 3)).map((cmt, i) => (
          <div key={i} className="mb-1 leading-snug">
            <span className="font-semibold">{post.username}</span> {cmt}
          </div>
        ))}

        {newComments.map((cmt, i) => (
          <div key={`new-${i}`} className="mb-1 leading-snug">
            <span className="font-semibold">You</span> {cmt}
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
      </div> */}

      <hr className="mb-2" />


      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm"
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        // onClick={handleSendComment}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </div>
    </div>
  )
}

export default Post
