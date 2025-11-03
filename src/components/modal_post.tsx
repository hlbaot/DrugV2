'use client'
import { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { API_deletePost } from "@/src/api/API_deletePost";

interface ThreeDotModalProps {
  showDelete: boolean;
  id: number;
  onDelete: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 24,
  p: 0,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

const buttonStyle = {
  py: 2,
  textAlign: 'center' as const,
  cursor: 'pointer',
  fontWeight: 500,
  fontSize: '16px',
  '&:not(:last-child)': {
    borderBottom: '1px solid black',
  },
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
};

export const ThreeDotModal = ({
  showDelete,
  id,
  onDelete,
  isSaved,
  onToggleSave,
}: ThreeDotModalProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      await API_deletePost(id.toString());
      onDelete?.();
    } catch (error) {
      console.error("Xoá thất bại:", error);
    } finally {
      handleClose();
    }
  };

  return (
    <>
      {/* Nút 3 chấm */}
      <button onClick={handleOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </button>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          {showDelete && (
            <Typography
              sx={{ ...buttonStyle, color: 'red' }}
              onClick={handleDelete}
            >
              Delete
            </Typography>
          )}

          <Typography sx={{ ...buttonStyle, color: 'blue' }}>
            Follow
          </Typography>

          {/* ✅ Nếu isSaved = true thì hiển thị “Unsave” */}
          <Typography
            sx={{ ...buttonStyle, color: '#FFCC33' }}
            onClick={() => {
              onToggleSave();
              handleClose();
            }}
          >
            {isSaved ? 'Unsave' : 'Save'}
          </Typography>

          <Typography sx={buttonStyle} onClick={handleClose}>
            Cancel
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
