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

  const { updatePostLikeStatus, updatePostSaveStatus } = usePostContext();
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
      const optimisticLiked = !post.isLiked;
      const optimisticCount = post.likeCount + (optimisticLiked ? 1 : -1);
      updatePostLikeStatus(post.id, optimisticLiked, optimisticCount);

      const data = await stateLike(post.id);
      const { likeCount: serverCount, isLiked: serverLiked } = data;
      updatePostLikeStatus(post.id, serverLiked, serverCount);
      updatePostCounts(post.id, serverCount, post.commentCount);
    } catch (error) {
      console.error(error);
      updatePostLikeStatus(post.id, post.isLiked, post.likeCount);
    }
  };

  // ✅ Save
  const handleToggleSave = async () => {
    try {
      const optimisticSaved = !post.isSaved;
      updatePostSaveStatus(post.id, optimisticSaved);

      const data = await stateSave(post.id);
      const { isSaved: serverSaved } = data;
      updatePostSaveStatus(post.id, serverSaved);
      updateSavedStatus(post.id, serverSaved);
    } catch (error) {
      console.error(error);
      updatePostSaveStatus(post.id, post.isSaved);
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
          bgcolor: '#fff',
          borderRadius: 3,
          boxShadow: 24,
          width: hasImages ? '80%' : '45%',
          height: hasImages ? '80%' : 'auto',
          display: 'flex',
          flexDirection: hasImages ? 'row' : 'column',
          overflow: 'hidden',
          maxHeight: '90vh',
        }}
      >
        {/* LEFT: Hình ảnh */}
        {hasImages && (
          <Box
            sx={{
              flex: 1,
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100%',
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
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      backgroundColor: '#000',
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        )}

        {/* RIGHT: Caption + Comment */}
        <Box
          sx={{
            width: hasImages ? 380 : '100%',
            display: 'flex',
            flexDirection: 'column',
            borderLeft: hasImages ? '1px solid #ddd' : 'none',
            bgcolor: '#fff',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
            }}
          >
            {/* Avatar + username */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                src={post.user.avatarUrl || '/avatar_default.jpg'}
                sx={{ width: 40, height: 40 }}
              />
              <Typography fontWeight={600}>{post.user.username}</Typography>
            </Box>

            {/* Save icon */}
            <IconSave
              postId={post.id}
              isSaved={post.isSaved}
              onToggleSave={handleToggleSave}
            />
          </Box>

          <Divider />

          {/* Caption */}
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              {post.caption}
            </Typography>
          </Box>

          {/* Comments */}
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {(showAllComments ? comments : comments.slice(0, 3)).map((cmt) => (
              <Box key={cmt.id}>
                <Typography variant="body2">
                  <b>{cmt.user.username}</b> {cmt.content}
                </Typography>
              </Box>
            ))}

            {comments.length > 3 && (
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: 'pointer', fontSize: 13 }}
                onClick={() => setShowAllComments(!showAllComments)}
              >
                {showAllComments ? 'Hide comments' : 'See all comments'}
              </Typography>
            )}
          </Box>

          <Divider />

          {/* Like + Comment icons */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconHeart
                postId={post.id}
                isLiked={post.isLiked}
                likeCount={post.likeCount}
                onToggleLike={handleToggleLike}
              />
              <IconButton size="small">
                <ChatBubbleOutlineIcon />
              </IconButton>
            </Box>

          </Box>

          {/* Like count */}
          <Typography variant="body2" sx={{ px: 2, mb: 1 }}>
            <b>{post.likeCount}</b> likes
          </Typography>

          {/* Comment input */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              borderTop: '1px solid #eee',
            }}
          >
            <TextField
              placeholder="Add a comment..."
              variant="standard"
              fullWidth
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
              InputProps={{ disableUnderline: true }}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
