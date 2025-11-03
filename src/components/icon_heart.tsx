import React from 'react';
import styled from 'styled-components';

interface IconHeartProps {
  postId: number;
  isLiked: boolean;
  likeCount: number;
  onToggleLike: () => void;
}

const IconHeart: React.FC<IconHeartProps> = ({
  isLiked,
  onToggleLike,
}) => {
  return (
    <div className="flex items-center gap-1">
      <Button onClick={onToggleLike} aria-label={isLiked ? 'Unlike' : 'Like'}>
        <HeartIcon $liked={isLiked} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                  2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                  C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                  c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </HeartIcon>
      </Button>
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
