'use client';
import styled from 'styled-components';

type Props = {
    className?: string;
    mediaHeight?: number; // chiều cao khung ảnh/slider
};

export default function PostSkeleton({ className, mediaHeight = 360 }: Props) {
    return (
        <Card className={className}>
            {/* Header: avatar + username + menu */}
            <div className="head">
                <div className="left">
                    <div className="avatar skeleton" />
                    <div className="name skeleton" />
                </div>
                <div className="dot skeleton" />
            </div>

            {/* Caption */}
            <div className="line skeleton" />
            <div className="line short skeleton" />

            {/* Media (giả lập Swiper) */}
            <div className="media skeleton" style={{ height: mediaHeight }} />

            {/* Actions */}
            <div className="actions w-full flex items-center justify-between">
                <div className='flex space-x-2'>
                    <div className="btn skeleton" />
                    <div className="btn skeleton" />
                </div>
                <div className="btn skeleton" />
            </div>

            {/* Stats / meta */}
            <div className="line xs skeleton" />
            <div className="line xs short skeleton" />
        </Card>
    );
}

const Card = styled.div`
  width: 100%;
  max-width: 42rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  /* 🟣 DARK MODE SUPPORT */
  .dark & {
    background: #111111;           /* nền card dark */
    border-color: #333333;         /* border dark */
  }

  /* HEADER */
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  /* ELEMENTS */
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 9999px;
  }

  .name {
    width: 140px;
    height: 14px;
    border-radius: 6px;
  }

  .dot {
    width: 28px;
    height: 28px;
    border-radius: 8px;
  }

  .line {
    height: 12px;
    border-radius: 6px;
  }
  .line.short {
    width: 60%;
  }
  .line.xs {
    height: 10px;
  }
  .line.xs.short {
    width: 40%;
  }

  .media {
    width: 100%;
    border-radius: 10px;
  }

  .actions {
    display: flex;
    gap: 8px;
  }

  .btn {
    width: 60px;
    height: 28px;
    border-radius: 8px;
  }

  /* 💫 SKELETON ANIMATION FOR LIGHT MODE */
  .skeleton {
    background-image: linear-gradient(
      90deg,
      #e5e7eb 0px,
      #f3f4f6 40px,
      #e5e7eb 80px
    );
    background-size: 300%;
    background-position: 100% 0;
    animation: shimmer 1.4s infinite linear;
  }

  /* 💫 DARK MODE SKELETON */
  .dark & .skeleton {
    background-image: linear-gradient(
      90deg,
      #2a2a2a 0px,
      #3a3a3a 40px,
      #2a2a2a 80px
    );
  }

  /* SHIMMER EFFECT */
  @keyframes shimmer {
    to {
      background-position: -100% 0;
    }
  }
`;

