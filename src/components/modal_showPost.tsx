'use client';
import React from 'react';
import {
  Box,
  Modal,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Divider,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { PostType } from '../interfaces/post';

interface ModalShowPostProps {
  open: boolean;
  onClose: () => void;
  post: PostType;
}

export const ModalShowPost = ({ open, onClose, post }: ModalShowPostProps) => {
  if (!post) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          width: '70%',
          height: '80%',
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {/* LEFT: Swiper (carousel images) */}
        <Box sx={{ flex: 1, bgcolor: '#000', display: 'flex' }}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
            style={{ width: '100%', height: '100%' }}
          >
            {post.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={img}
                    alt={`post-${idx}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* RIGHT: Info + comments */}
        <Box
          sx={{
            width: 380,
            display: 'flex',
            flexDirection: 'column',
            borderLeft: '1px solid #ddd',
            bgcolor: '#fff',
          }}
        >
          {/* Header: avatar + username */}
          <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <Avatar
              src={post.user.avatarUrl || '/avatar_default.jpg'}
              sx={{ width: 40, height: 40, mr: 2 }}
            />
            <Typography fontWeight={600}>{post.user.username}</Typography>
          </Box>

          <Divider />

          {/* Comments area */}
          {/* <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              {post.caption}
            </Typography>

            {post.comments.length > 0 ? (
              post.comments.map((cmt) => (
                <Box key={cmt.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar
                    src={cmt.user.avatarUrl || '/avatar_default.jpg'}
                    sx={{ width: 30, height: 30, mr: 1 }}
                  />
                  <Typography variant="body2">
                    <b>{cmt.user.username}</b> {cmt.content}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No comments yet.
              </Typography>
            )}
          </Box> */}

          <Divider />

          {/* Action buttons (like, comment, save) */}
          <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <IconButton>
              <FavoriteBorderIcon color={post.isLiked ? 'error' : 'inherit'} />
            </IconButton>
            <IconButton>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton>
              <BookmarkBorderIcon
                color={post.isSaved ? 'primary' : 'inherit'}
              />
            </IconButton>
          </Box>

          <Typography variant="body2" sx={{ px: 2, mb: 1 }}>
            <b>{post.likeCount}</b> likes
          </Typography>

          {/* Input comment */}
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
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
