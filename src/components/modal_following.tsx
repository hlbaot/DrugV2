'use client';

import ModalFollowList from './modal_follow_list';

interface ModalFollowingProps {
  open: boolean;
  onClose: () => void;
  username: string;
  isMyProfile?: boolean;
}

export default function ModalFollowing({
  open,
  onClose,
  username,
  isMyProfile = false,
}: ModalFollowingProps) {
  return (
    <ModalFollowList
      open={open}
      onClose={onClose}
      username={username}
      type="following"
      isMyProfile={isMyProfile}
    />
  );
}
