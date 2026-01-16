import React from 'react';

interface IconHeartProps {
  postId: number;
  isLiked: boolean;
  onToggleLike: () => void;
}

const IconHeart: React.FC<IconHeartProps> = ({
  postId,
  isLiked,
  onToggleLike,
}) => {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={onToggleLike}
        aria-label={isLiked ? 'Unlike' : 'Like'}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{
            transition: 'fill 0.2s',
          }}
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={isLiked ? 'red' : 'gray'}
          />
        </svg>
      </button>
    </div>
  );
};

export default IconHeart;
