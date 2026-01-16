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

  // ✅ Socket comment realtime
  const { sendComment } = useCommentSocket(post.id, (comment) => {
    setComments((prev) => [...prev, comment]);
  });

  const handleSendComment = () => {
    if (!commentText.trim()) return;
    sendComment({ postId: post.id, content: commentText });
    setCommentText('');
  };

  // ✅ Like
  const handleToggleLike = async () => {
    try {
      const optimisticLiked = !currentPost.isLiked;
      const optimisticCount = currentPost.likeCount + (optimisticLiked ? 1 : -1);
      updatePostLikeStatus(post.id, optimisticLiked, optimisticCount);

      const data = await stateLike(post.id);
      const { likeCount: serverCount, isLiked: serverLiked } = data;
      updatePostLikeStatus(post.id, serverLiked, serverCount);
      updatePostCounts(post.id, serverCount, post.commentCount);
    } catch (error) {
      console.error(error);
      updatePostLikeStatus(post.id, currentPost.isLiked, currentPost.likeCount);
    }
  };

  // ✅ Save
  const handleToggleSave = async () => {
    try {
      const optimisticSaved = !currentPost.isSaved;
      updatePostSaveStatus(post.id, optimisticSaved);

      const data = await stateSave(post.id);
      const { isSaved: serverSaved } = data;
      updatePostSaveStatus(post.id, serverSaved);
      updateSavedStatus(post.id, serverSaved);
    } catch (error) {
      console.error(error);
      updatePostSaveStatus(post.id, currentPost.isSaved);
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
              isSaved={currentPost.isSaved}
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
                isLiked={currentPost.isLiked}
                onToggleLike={handleToggleLike}
              />

              <IconButton>
                <ChatBubbleOutlineIcon className="text-black dark:text-white" />
              </IconButton>
            </Box>
          </Box>

          {/* Like count */}
          <Typography className="px-2 mb-1 text-black dark:text-white">
            <b>{currentPost.likeCount}</b> likes
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
              onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
              InputProps={{
                disableUnderline: true,
                style: {
                  color: 'white',
                },
              }}
              className="text-black dark:text-white"
            />
          </Box>
        </Box>
      </Box>
    </Modal>

  );
};
