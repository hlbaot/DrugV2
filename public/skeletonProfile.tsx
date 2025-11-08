'use client';
import styled from 'styled-components';

export default function ProfileSkeleton() {
  return (
    <Wrapper>
      {/* Avatar + Info */}
      <div className="flex gap-8 items-center">
        <div className="avatar skeleton" />
        <div className="flex flex-col gap-3">
          <div className="line name skeleton" />
          <div className="flex gap-4">
            <div className="line stat skeleton" />
            <div className="line stat skeleton" />
            <div className="line stat skeleton" />
          </div>
          <div className="line bio skeleton" />
        </div>
      </div>

      <hr className="mt-6 border-gray-200" />

      {/* Grid posts */}
      <div className="grid grid-cols-3 gap-2 mt-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="square skeleton" />
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 42rem;
  margin: 2rem auto;
  padding: 0 1rem;

  .avatar {
    width: 96px;
    height: 96px;
    border-radius: 9999px;
  }

  .line {
    border-radius: 8px;
    height: 14px;
  }

  .line.name {
    width: 120px;
    height: 20px;
  }

  .line.stat {
    width: 80px;
    height: 14px;
  }

  .line.bio {
    width: 200px;
    height: 14px;
  }

  .square {
    aspect-ratio: 1;
    border-radius: 8px;
  }

  .skeleton {
    background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
    background-size: 200% 100%;
    animation: shimmer 1.2s ease-in-out infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;
