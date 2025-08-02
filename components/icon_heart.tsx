'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { likePost, unlikePost } from '@/api/API_likePost';

interface IconHeartProps {
  postId: string;
  initiallyLiked?: boolean;
  initialLikeCount?: number;
  onToggleLike: (nextLiked: boolean) => void; // Chỉ truyền callback để cập nhật UI
}

const IconHeart: React.FC<IconHeartProps> = ({
  postId,
  initiallyLiked = false,
  initialLikeCount = 0,
  onToggleLike,
}) => {
  const [liked, setLiked] = useState<boolean>(initiallyLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);

  useEffect(() => {
    setLiked(initiallyLiked);
    setLikeCount(initialLikeCount);
  }, [postId, initiallyLiked, initialLikeCount]);

  const handleToggleLike = async () => {
    const nextLiked = !liked;
    const delta = nextLiked ? 1 : -1;

    setLiked(nextLiked);
    setLikeCount((prev) => prev + delta);

    try {
      if (nextLiked) {
        await likePost(postId); 
      } else {
        await unlikePost(postId);
      }
      onToggleLike(nextLiked);
    } catch (err) {
      setLiked(!nextLiked);
      setLikeCount((prev) => prev - delta);
      console.error('Toggle like failed', err);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button onClick={handleToggleLike} aria-label={liked ? 'Unlike' : 'Like'}>
        <HeartIcon $liked={liked} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                  2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                  C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                  c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </HeartIcon>
      </Button>
      <span>{likeCount} likes</span>
    </div>
  );
};

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const HeartIcon = styled.svg<{ $liked: boolean }>`
  width: 24px;
  height: 24px;
  fill: ${({ $liked }) => ($liked ? 'red' : 'gray')};
  transition: fill 0.2s;
`;

export default IconHeart;
