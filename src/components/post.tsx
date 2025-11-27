'use client'
import { useState, useEffect } from 'react'
import { useCommentSocket } from '../socket/comment'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import IconHeart from './icon_heart'
import IconSave from './icon_save'
import { usePostContext } from '@/src/context/PostContext';
import { useSavePostContext } from '@/src/context/SavePostContext';
import { useProfile } from '@/src/context/ProfileContext';
import { ThreeDotModal } from './modal_post'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { stateLike } from '@/src/api/API_likePost'
import { stateSave } from '@/src/api/API_savePost'
import { getCommentsPostId } from '@/src/api/API_getPost'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { CommentType } from '../interfaces/post'

function Post({ postId }: { postId: number }) {
  const [showAllComments, setShowAllComments] = useState(false)
  const [commentText, setCommentText] = useState<string>('')
  const [comments, setComments] = useState<CommentType[]>([])
  const router = useRouter();
  const [userId, setUserId] = useState<string>()
  const { posts, setPosts, updatePostLikeStatus, updatePostSaveStatus, updatePostComments } = usePostContext();
  const { updateSavedStatus } = useSavePostContext();
  const { updatePostCounts } = useProfile();
  const post = posts.find((p) => p.id === postId);
  if (!post) return null;

  const {
    id,
    caption,
    images,
    user,
    commentCount,
    likeCount,
    isLiked,
    isSaved
  } = post;

  // ✅ Fetch comments từ API khi load post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsPostId(id);
        setComments(data);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách comment:', err);
      }
    };
    fetchComments();
  }, [id]);

  // kiểm tra nếu là chủ bài viết thì có quyền xoá
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserId(parsed.id?.toString() || '');
      } catch (err) {
        console.error('Lỗi khi parse user từ localStorage:', err);
      }
    }
  }, []);

  const isOwner = userId === post.user.id.toString();

  // ✅ Xử lý like
  const handleToggleLike = async () => {
    try {
      const optimisticLiked = !isLiked;
      const optimisticCount = likeCount + (optimisticLiked ? 1 : -1);
      updatePostLikeStatus(id, optimisticLiked, optimisticCount);

      const data = await stateLike(id);
      const { likeCount: serverCount, isLiked: serverLiked } = data;
      updatePostLikeStatus(id, serverLiked, serverCount);
      updatePostCounts(id, serverCount, commentCount);
    } catch (error) {
      console.log(error);
      updatePostLikeStatus(id, isLiked, likeCount);
    }
  };

  // ✅ Xử lý save
  const handleToggleSave = async () => {
    try {
      const optimisticSaved = !isSaved;
      updatePostSaveStatus(id, optimisticSaved);

      const data = await stateSave(id);
      const { isSaved: serverSaved } = data;
      updatePostSaveStatus(id, serverSaved);
      updateSavedStatus(id, serverSaved);
    } catch (error) {
      console.log(error);
      updatePostSaveStatus(id, isSaved);
    }
  };

  const handleInfo = () => router.push(`/${user.username}`);

  // ✅ Socket comment (thêm comment mới vào danh sách)
  const { sendComment } = useCommentSocket(post.id, (comment) => {
    setComments((prev) => [...prev, comment]);
  });


  const handleSendComment = () => {
    if (!commentText.trim()) return;
    sendComment({
      postId: post.id,
      content: commentText,
    });
    setCommentText("");
  };

  return (
    <div className="
  w-full mx-auto my-4 p-4 rounded-lg shadow max-w-3xl
  
  bg-white dark:bg-black
  text-black dark:text-white                   
">


      {/* Header */}
      <div className="w-full flex items-center mb-3 justify-between">
        <div className="left flex items-center space-x-4">
          <Image
            src={user.avatarUrl || "/avatar_default.jpg"}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full object-cover cursor-pointer"
            priority
            onClick={handleInfo}
          />
          <span onClick={handleInfo} className="font-semibold cursor-pointer text-black dark:text-white"
          >{user.username}</span>
        </div>

        <ThreeDotModal
          showDelete={isOwner}
          onDelete={() => setPosts(posts.filter((p) => p.id !== id))}
          onToggleSave={handleToggleSave}
          isSaved={isSaved}
          id={id}
        />
      </div>

      {/* caption */}
      <span className="block mb-2 text-black dark:text-white">{caption}</span>

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
              <div className="relative bg-white dark:bg-neutral-900 w-full mx-auto overflow-hidden rounded-md" style={{ aspectRatio: '4/5', maxHeight: '500px' }}>
                <Image src={img} alt={`slide-${idx}`} fill className="object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Like + Comment icons */}
      <div className="
 react flex justify-between items-center space-x-4 mb-2 text-sm
 text-gray-600 dark:text-gray-300    
"
      >
        <div className='flex w-auto gap-4'>
          <span className="flex items-center space-x-2">
            <IconHeart
              postId={id}
              isLiked={isLiked}
              // likeCount={likeCount}
              onToggleLike={handleToggleLike}
            />
            <span>{likeCount} likes</span>
          </span>

          <span className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25S16.97 3.75 12 3.75 3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.48 4.48 0 01-.923 1.785A5.97 5.97 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
              />
            </svg>

            <span>{comments.length} comments</span>
          </span>
        </div>

        <IconSave postId={id} isSaved={isSaved} onToggleSave={handleToggleSave} />
      </div>

      <hr className="mb-4" />

      {/* Hiển thị comment */}
      <div className={`text-sm mb-2 transition-all duration-300 ${showAllComments ? 'max-h-32 overflow-y-auto pr-1' : ''}`}>
        {(showAllComments ? comments : comments.slice(0, 3)).map((cmt) => (
          <div key={cmt.id} className="mb-1 leading-snug text-black dark:text-white">
            <span className="font-semibold text-black dark:text-white">{cmt.user.username}</span> {cmt.content}
          </div>
        ))}

        {comments.length > 3 && (
          <button className="text-blue-500 dark:text-blue-400 text-xs mt-1 hover:text-blue-700 dark:hover:text-blue-300"
            onClick={() => setShowAllComments(!showAllComments)}>
            {showAllComments ? 'Hide comments' : 'See all comments'}
          </button>
        )}
      </div>

      <hr className="mb-2" />

      {/* Ô nhập comment */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
          placeholder="Add a comment..."
          className="
  w-full border rounded-full px-4 py-2 text-sm
  border-gray-300 dark:border-neutral-700      
  bg-white dark:bg-neutral-800               
  text-black dark:text-white        
  placeholder-gray-500 dark:placeholder-gray-400  
"

        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 cursor-pointer stroke-black dark:stroke-white"
          onClick={handleSendComment}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L6 12zm0 0h7.5"
          />
        </svg>

      </div>
    </div>
  )
}

export default Post
