'use client';
import * as React from 'react';
import { useProfile } from '../context/ProfileContext';
import {
  Box,
  Button,
  Typography,
  Modal,
  Avatar,
  TextField,
} from '@mui/material';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 640, // 🔹 rộng hơn (ngang)
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
  p: 4, // 🔹 padding vừa phải (ngắn lại so với p:5)
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

interface ModalEdit{
  open: boolean;
  onClose: () => void;
}

export const ModalEdit = ({ open, onClose } : ModalEdit) => {

const { myProfile } = useProfile();

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Title */}
        <Typography variant="h6" fontWeight={700} mb={1}>
          Edit profile
        </Typography>

        {/* Change name */}
        <Box>
          <Typography fontWeight={600} mb={0.5}>
            Change name
          </Typography>
          <TextField
            fullWidth
            variant="standard"
            defaultValue={myProfile?.username}
          />
        </Box>

        {/* Avatar + Change photo */}
        <Box
          sx={{
            backgroundColor: '#f4f4f4',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={myProfile?.avatarUrl}
              alt="avatar"
              sx={{ width: 70, height: 70 }}
            />
            <Typography fontWeight={500}>{myProfile?.username}</Typography>
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#5B3FF7',
              textTransform: 'none',
              borderRadius: '8px',
              px: 2.5,
              py: 0.6,
              fontWeight: 500,
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              '&:hover': { backgroundColor: '#4932cc' },
            }}
          >
            Change photo
          </Button>
        </Box>

        {/* Bio */}
        <Box>
          <Typography fontWeight={600} mb={0.5}>
            Bio
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={2} 
            defaultValue={myProfile?.bioText}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
        </Box>

        {/* Change password */}
        <Box>
          <Typography fontWeight={600} mb={1}>
            Change password
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Current password"
              type="password"
              variant="outlined"
              size="small" // 🔹 gọn hơn
            />
            <TextField
              fullWidth
              label="New password"
              type="password"
              variant="outlined"
              size="small"
            />
          </Box>
        </Box>

        {/* Save button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="outlined"
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              px: 3,
              fontWeight: 600,
              borderWidth: 1.5,
              py: 0.8,
            }}
          >
            Save change
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
