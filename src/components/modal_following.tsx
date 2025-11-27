'use client';

import * as React from 'react';
import { Modal, Box, Avatar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FollowItem } from '@/src/interfaces/userProfile';
import { API_ListFollowing } from '@/src/api/API_userProfile';

interface ModalFollowingProps {
  open: boolean;
  onClose: () => void;
  username: string;
}

export default function ModalFollowing({
  open,
  onClose,
  username,
}: ModalFollowingProps) {
  const [followings, setFollowings] = React.useState<FollowItem[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    loadFollowing();
  }, [open]);

  const loadFollowing = async () => {
    try {
      setLoading(true);
      const data = await API_ListFollowing(username);
      setFollowings(data.followings || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Wrapper>
        {/* Title */}
        <Typography className="title">Following</Typography>

        {/* List */}
        <div className="list">
          {loading && <p className="empty">Loading...</p>}

          {!loading && followings.length === 0 && (
            <p className="empty">You are not following anyone</p>
          )}

          {followings.map((item) => (
            <div key={item.id} className="item">
              <div className="left">
                <Avatar src={item.avatar} sx={{ width: 45, height: 45 }} />
                <span className="username">{item.username}</span>
              </div>

              <button className="followBtn">Following</button>
            </div>
          ))}
        </div>
      </Wrapper>
    </Modal>
  );
}

const Wrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: 420,
  maxHeight: '80vh',
  borderRadius: '18px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',

  backgroundColor: theme.palette.mode === 'dark' ? '#262626' : '#ffffff',

  '.title': {
    textAlign: 'center',
    padding: '12px 0',
    fontSize: '18px',
    fontWeight: 600,
    borderBottom:
      theme.palette.mode === 'dark'
        ? '1px solid #333'
        : '1px solid #ddd',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  },

  '.list': {
    overflowY: 'auto',
    padding: '10px 0',
  },

  '.item': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 14px',

    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark' ? '#2e2e2e' : '#f4f4f4',
    },
  },

  '.left': {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },

  '.username': {
    fontSize: '15px',
    fontWeight: 600,
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  },

  // Nút FOLLOWING (giống IG)
  '.followBtn': {
    backgroundColor:
      theme.palette.mode === 'dark' ? '#363636' : '#e7e7e7',
    padding: '6px 14px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',

    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark' ? '#4a4a4a' : '#d5d5d5',
    },
  },

  '.empty': {
    textAlign: 'center',
    padding: '20px 0',
    color: theme.palette.mode === 'dark' ? '#999' : '#666',
  },
}));
