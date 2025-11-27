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
  width: 640,
  borderRadius: '10px',
  boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
  p: 4,
};

interface ModalEdit {
  open: boolean;
  onClose: () => void;
}

export const ModalEdit = ({ open, onClose }: ModalEdit) => {
  const { myProfile } = useProfile();

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={style}
        className="
          bg-white dark:bg-neutral-900
          text-black dark:text-white
        "
      >
        {/* Title */}
        <Typography
          variant="h6"
          fontWeight={700}
          mb={1}
          className="text-black dark:text-white"
        >
          Edit profile
        </Typography>

        {/* Change name */}
        <Box>
          <Typography fontWeight={600} mb={0.5} className="dark:text-gray-200">
            Change name
          </Typography>

          <TextField
            fullWidth
            variant="standard"
            defaultValue={myProfile?.username}
            InputProps={{
              className:
                "text-black dark:text-white dark:border-gray-600 dark:hover:border-white",
            }}
          />
        </Box>

        {/* Avatar + Change photo */}
        <Box
          sx={{
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
          }}
          className="bg-gray-100 dark:bg-neutral-800"
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={myProfile?.avatarUrl}
              alt="avatar"
              sx={{ width: 70, height: 70 }}
            />
            <Typography fontWeight={500} className="dark:text-white">
              {myProfile?.username}
            </Typography>
          </Box>

          <Button
            variant="contained"
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              px: 2.5,
              py: 0.6,
              fontWeight: 500,
              boxShadow: '0 2px 5px rgba(0,0,0,0.25)',
            }}
            className="
              bg-purple-600 dark:bg-purple-500
              hover:bg-purple-700 dark:hover:bg-purple-600
              text-white
            "
          >
            Change photo
          </Button>
        </Box>

        {/* Bio */}
        <Box>
          <Typography fontWeight={600} mb={0.5} className="dark:text-gray-200">
            Bio
          </Typography>

          <TextField
            fullWidth
            multiline
            minRows={2}
            defaultValue={myProfile?.bioText}
            InputProps={{
              className:
                "bg-white dark:bg-neutral-800 text-black dark:text-white rounded-lg",
            }}
          />
        </Box>

        {/* Change password */}
        <Box>
          <Typography fontWeight={600} mb={1} className="dark:text-gray-200">
            Change password
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Current password"
              type="password"
              variant="outlined"
              size="small"
              InputLabelProps={{
                className: "text-black dark:text-gray-300",
              }}
              InputProps={{
                className:
                  "bg-white dark:bg-neutral-800 text-black dark:text-white",
              }}
            />

            <TextField
              fullWidth
              label="New password"
              type="password"
              variant="outlined"
              size="small"
              InputLabelProps={{
                className: "text-black dark:text-gray-300",
              }}
              InputProps={{
                className:
                  "bg-white dark:bg-neutral-800 text-black dark:text-white",
              }}
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
              py: 0.8,
              fontWeight: 600,
              borderWidth: 1.5,
            }}
            className="
              text-black dark:text-white
              border-black dark:border-white
              hover:bg-gray-100 dark:hover:bg-neutral-700
            "
          >
            Save change
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
