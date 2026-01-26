import React from 'react';
import styled from 'styled-components';

interface IconHeartProps {
  postId: number;
  isLiked: boolean;
  onToggleLike: () => void;
}

const IconHeart: React.FC<IconHeartProps> = ({ isLiked, onToggleLike }) => {
  return (
    <Wrapper>
      <Button onClick={onToggleLike} aria-label={isLiked ? 'Unlike' : 'Like'}>
        <HeartIcon viewBox="0 0 24 24" $active={isLiked}>
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
        </HeartIcon>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const HeartIcon = styled.svg<{ $active?: boolean }>`
  width: 24px;
  height: 24px;
  fill: ${({ $active }) => ($active ? 'rgb(255, 50, 50)' : 'gray')};
  transition: fill 0.2s, transform 0.15s;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export default IconHeart;
