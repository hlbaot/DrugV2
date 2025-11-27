'use client';

import * as React from 'react';
import { Modal, Box, Avatar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FollowItem } from '@/src/interfaces/userProfile';
import { API_ListFollowers } from '@/src/api/API_userProfile';

interface ModalFollowersProps {
  open: boolean;
  onClose: () => void;
  username: string;   
}

export default function ModalFollowers({
  open,
  onClose,
  username,
}: ModalFollowersProps) {

  const [followers, setFollowers] = React.useState<FollowItem[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    fetchFollowers();
  }, [open]);

  const fetchFollowers = async () => {
    try {
      setLoading(true);
      const res = await API_ListFollowers(username);
      setFollowers(res.followers || []); // API trả về followers
    } catch (err) {
      console.error("Error load followers", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Wrapper>
        {/* Title */}
        <Typography className="title">Followers</Typography>

        {/* Followers List */}
        <div className="list">

          {loading && <p className="empty">Loading...</p>}

          {!loading && followers.length === 0 && (
            <p className="empty">No followers yet</p>
          )}

          {!loading && followers.map((item) => (
            <div key={item.id} className="item">
              <div className="left">
                <Avatar src={item.avatar} sx={{ width: 45, height: 45, border: (theme) => `2px solid ${theme.palette.mode === 'dark' ? '#2e2e2e' : '#fff'}` }} />
                <span className="username">{item.username}</span>
              </div>

              <button className="removeBtn">Remove</button>
            </div>
          ))}
        </div>
      </Wrapper>
    </Modal>
  );
}

const Wrapper = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';

  const bg = isDark ? '#0f1112' : '#ffffff';
  const surface = isDark ? '#161819' : '#f9fafb';
  const border = isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e6e6e6';
  const textPrimary = isDark ? '#e6eef3' : '#0f1724';
  const textSecondary = isDark ? '#a9b3ba' : '#6b7280';
  const itemHover = isDark ? '#1e2224' : '#f3f4f6';
  const btnBg = isDark ? '#2b3940' : '#e7e7e7';
  const btnHover = isDark ? '#34484f' : '#d5d5d5';
  const shadow = isDark ? '0 6px 24px rgba(0,0,0,0.6)' : '0 6px 18px rgba(15,23,42,0.06)';

  return ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    width: 420,
    maxHeight: '80vh',
    borderRadius: '14px',
    overflow: 'hidden',
    border,
    backgroundColor: bg,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: shadow,

    '.title': {
      textAlign: 'center',
      padding: '14px 16px',
      fontSize: '18px',
      fontWeight: 700,
      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : '#eee'}`,
      color: textPrimary,
      background: surface,
    },

    '.list': {
      overflowY: 'auto',
      padding: '6px 0',
      // smoother scrollbar for dark/light
      scrollbarWidth: 'thin',
      scrollbarColor: `${isDark ? '#2c3336' : '#e3e3e3'} transparent`,
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: isDark ? '#262b2d' : '#eaeaea',
        borderRadius: 6,
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
    },

    '.item': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 14px',
      gap: 12,
      transition: 'background-color 160ms ease, transform 120ms ease',
      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.02)' : '#f1f1f1'}`,

      '&:hover': {
        backgroundColor: itemHover,
        transform: 'translateY(-1px)',
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
      color: textPrimary,
      display: 'inline-block',
      maxWidth: '220px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    '.removeBtn': {
      backgroundColor: btnBg,
      padding: '6px 12px',
      borderRadius: '10px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '13px',
      color: textPrimary,
      transition: 'background-color 140ms ease, transform 100ms ease',
      boxShadow: isDark ? 'inset 0 -1px 0 rgba(255,255,255,0.02)' : 'none',

      '&:hover': {
        backgroundColor: btnHover,
        transform: 'translateY(-1px)',
      },

      '&:active': {
        transform: 'translateY(0)',
      }
    },

    '.empty': {
      textAlign: 'center',
      padding: '22px 0',
      color: textSecondary,
    },
  });
});