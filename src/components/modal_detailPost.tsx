'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Modal,
  Avatar,
  Typography,
  TextField,
  Divider,
  IconButton,
} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { PostType, CommentType } from '../interfaces/post';
import IconHeart from './icon_heart';
import IconSave from './icon_save';
import { useCommentSocket } from '../socket/comment';
import { getCommentsPostId } from '@/src/api/API_getPost';
import { stateLike } from '@/src/api/API_likePost';
import { useSavePost } from '@/src/hooks/mutations/usePostMutations';
import { usePostContext } from '@/src/store/usePostStore';
import { useProfile } from '@/src/store/useProfileStore';

interface ModalShowPostProps {
  open: boolean;
  onClose: () => void;
  post: PostType;
}

export const ModalShowPost = ({ open, onClose, post }: ModalShowPostProps) => {
  if (!post) return null;

  const { posts, updatePostLikeStatus, updatePostSaveStatus } = usePostContext();

  // Lấy post từ context để có data đã cập nhật (likeCount, isLiked, isSaved)
  const currentPost = posts.find((p) => p.id === post.id) || post;
  const { updatePostCounts } = useProfile();

  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  const hasImages = post.images && post.images.length > 0;
  // ✅ Fetch comments từ API khi mở modal
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsPostId(post.id);
        setComments(data);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách comment:', err);
      }
    };
    fetchComments();
  }, [post.id]);

  // ✅ Socket comment realtime - chỉ subscribe khi modal mở
  const { sendComment } = useCommentSocket(open ? post.id : 0, (comment) => {
    setComments((prev) => {
      // Kiểm tra trùng lặp
      if (prev.some((c) => c.id === comment.id)) {
        return prev;
      }
      return [...prev, comment];
    });
  });

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    sendComment({ postId: post.id, content: commentText });
    setCommentText('');
  };

  // ✅ Local state để handle optimistic UI update ngay lập tức
  const [isLike, setIsLike] = useState(currentPost.isLiked);
  const [likeCount, setLikeCount] = useState(currentPost.likeCount);
  const [isSaved, setIsSaved] = useState(currentPost.isSaved);

  // Sync local state khi currentPost thay đổi từ Context (ví dụ: real-time update)
  useEffect(() => {
    setIsLike(currentPost.isLiked);
    setLikeCount(currentPost.likeCount);
    setIsSaved(currentPost.isSaved);
  }, [currentPost.isLiked, currentPost.likeCount, currentPost.isSaved]);

  // ✅ Like
  const handleToggleLike = async () => {
    try {
      const data = await stateLike(post.id);


      // Xác thực response API và cung cấp giá trị dự phòng
      const serverLiked = data?.isLike !== undefined ? data.isLike : !isLike;
      const serverCount = data?.likeCount !== undefined ? data.likeCount : (serverLiked ? likeCount + 1 : likeCount - 1);

      // Cập nhật state local
      setIsLike(serverLiked);
      setLikeCount(serverCount);

      // Cập nhật context
      updatePostLikeStatus(post.id, serverLiked, serverCount);
      updatePostCounts(post.id, serverCount, post.commentCount);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Save - using TanStack Query mutation
  const saveMutation = useSavePost();

  const handleToggleSave = () => {
    // Cập nhật UI ngay - đổi màu liền
    setIsSaved(!isSaved);

    // Cập nhật context
    updatePostSaveStatus(post.id, !isSaved);

    // Gọi API
    saveMutation.mutate(post.id);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          borderRadius: 3,
          boxShadow: 24,
          width: hasImages ? '80%' : '45%',
          height: hasImages ? '80%' : 'auto',
          display: 'flex',
          flexDirection: hasImages ? 'row' : 'column',
          overflow: 'hidden',
          maxHeight: '90vh',
          // CHẾ ĐỘ TỐI
          '&.MuiBox-root': {
            backgroundColor: 'white',
          },
          '@media (prefers-color-scheme: dark)': {
            '&.MuiBox-root': {
              backgroundColor: '#0f0f0f',
            },
          },
        }}
        className="bg-white dark:bg-neutral-900 text-black dark:text-white"
      >
        {/* LEFT: Image */}
        {hasImages && (
          <Box
            sx={{
              flex: 1,
              backgroundColor: '#fff',
              '@media (prefers-color-scheme: dark)': {
                backgroundColor: '#000',
              },
              minHeight: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={post.images.length > 1}
              pagination={post.images.length > 1 ? { clickable: true } : false}
              loop
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
              }}
            >
              {post.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={`post-${idx}`}
                    className="w-full h-full object-contain bg-black"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        )}

        {/* RIGHT SECTION */}
        <Box
          sx={{
            width: hasImages ? 380 : '100%',
            display: 'flex',
            flexDirection: 'column',
            borderLeft: hasImages ? '1px solid #ddd' : 'none',
            '@media (prefers-color-scheme: dark)': {
              borderColor: '#333',
            },
          }}
          className="bg-white dark:bg-neutral-900 text-black dark:text-white"
        >
          {/* Header */}
          <Box className="flex items-center justify-between p-2">
            <Box className="flex items-center gap-2">
              <Avatar
                src={post.user.avatarUrl || '/avatar_default.jpg'}
                sx={{ width: 40, height: 40 }}
              />
              <Typography className="font-semibold text-black dark:text-white">
                {post.user.username}
              </Typography>
            </Box>

            <IconSave
              postId={post.id}
              isSaved={isSaved}
              onToggleSave={handleToggleSave}
            />
          </Box>

          <Divider className="bg-gray-200 dark:bg-neutral-700" />

          {/* Caption */}
          <Box className="p-2">
            <Typography className="text-black dark:text-white">
              {post.caption}
            </Typography>
          </Box>

          {/* COMMENTS */}
          <Box
            className="flex-1 overflow-y-auto px-2 flex flex-col gap-1"
          >
            {(showAllComments ? comments : comments.slice(0, 3)).map((cmt) => (
              <Typography key={cmt.id} className="text-black dark:text-gray-200">
                <b>{cmt.user.username}</b> {cmt.content}
              </Typography>
            ))}

            {comments.length > 3 && (
              <Typography
                onClick={() => setShowAllComments(!showAllComments)}
                className="cursor-pointer text-blue-600 dark:text-blue-400 text-sm"
              >
                {showAllComments ? 'Hide comments' : 'See all comments'}
              </Typography>
            )}
          </Box>

          <Divider className="bg-gray-200 dark:bg-neutral-700" />

          {/* Like + Comment icons with counts - inline style like post.tsx */}
          <Box className="flex items-center justify-between px-2 py-2">
            <Box className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              {/* Like with count */}
              <span className="flex items-center gap-2">
                <IconHeart
                  postId={post.id}
                  isLiked={isLike}
                  onToggleLike={handleToggleLike}
                />
                <span className="text-black dark:text-white">{likeCount} likes</span>
              </span>

              {/* Comment with count */}
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-black dark:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25c4.97 0 9-3.694 9-8.25S16.97 3.75 12 3.75 3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.48 4.48 0 01-.923 1.785A5.97 5.97 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                  />
                </svg>
                <span className="text-black dark:text-white">{comments.length} comments</span>
              </span>
            </Box>
          </Box>

          <Divider className="bg-gray-200 dark:bg-neutral-700" />

          {/* INPUT comment - Form based submission */}
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendComment();
            }}
            className="flex items-center p-2 border-t border-gray-200 dark:border-neutral-700"
          >
            <TextField
              placeholder="Add a comment..."
              variant="standard"
              fullWidth
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              InputProps={{
                disableUnderline: true,
                className: "text-black dark:text-white"
              }}
              className="text-black dark:text-white"
            />
          </Box>
        </Box>
      </Box>
    </Modal>

  );
};
