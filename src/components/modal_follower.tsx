'use client';

import ModalFollowList from './modal_follow_list';

interface ModalFollowersProps {
  open: boolean;
  onClose: () => void;
  username: string;
  isMyProfile?: boolean;
}

export default function ModalFollowers({
  open,
  onClose,
  username,
  isMyProfile = false,
}: ModalFollowersProps) {
  return (
    <ModalFollowList
      open={open}
      onClose={onClose}
      username={username}
      type="followers"
      isMyProfile={isMyProfile}
    />
  );
}