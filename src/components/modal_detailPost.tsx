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
import { stateSave } from '@/src/api/API_savePost';
import { usePostContext } from '@/src/context/PostContext';
import { useSavePostContext } from '@/src/context/SavePostContext';
import { useProfile } from '@/src/context/ProfileContext';

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
  const { updateSavedStatus } = useSavePostContext();
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

  // ✅ Socket comment realtime - only subscribe when modal is open
  const { sendComment } = useCommentSocket(open ? post.id : 0, (comment) => {
    setComments((prev) => {
      // Check for duplicates
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


      // Validate API response and provide fallbacks
      const serverLiked = data?.isLike !== undefined ? data.isLike : !isLike;
      const serverCount = data?.likeCount !== undefined ? data.likeCount : (serverLiked ? likeCount + 1 : likeCount - 1);

      // Update local state
      setIsLike(serverLiked);
      setLikeCount(serverCount);

      // Update context
      updatePostLikeStatus(post.id, serverLiked, serverCount);
      updatePostCounts(post.id, serverCount, post.commentCount);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Save
  const handleToggleSave = async () => {
    try {
      // 1. Optimistic update
      const optimisticSaved = !isSaved;
      setIsSaved(optimisticSaved);

      updatePostSaveStatus(post.id, optimisticSaved);

      // 2. API Call
      const data = await stateSave(post.id);
      const { isSaved: serverSaved } = data;

      // 3. Update with Server data
      setIsSaved(serverSaved);
      updatePostSaveStatus(post.id, serverSaved);
      updateSavedStatus(post.id, serverSaved);
    } catch (error) {
      console.error(error);
      setIsSaved(isSaved); // Revert
      updatePostSaveStatus(post.id, isSaved);
    }
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
          // DARK MODE
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

          {/* Like + Comment */}
          <Box className="flex items-center justify-between px-2 py-1">
            <Box className="flex items-center gap-3">
              <IconHeart
                postId={post.id}
                isLiked={isLike}
                onToggleLike={handleToggleLike}
              />

              <IconButton>
                <ChatBubbleOutlineIcon className="text-black dark:text-white" />
              </IconButton>
            </Box>
          </Box>

          {/* Like count */}
          <Typography className="px-2 mb-1 text-black dark:text-white">
            <b>{likeCount}</b> likes
          </Typography>

          {/* INPUT comment */}
          <Box
            className="flex items-center p-2 border-t border-gray-200 dark:border-neutral-700"
          >
            <TextField
              placeholder="Add a comment..."
              variant="standard"
              fullWidth
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendComment();
                }
              }}
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
