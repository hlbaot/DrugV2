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
  borderRadius: '16px',
  boxShadow: 24,
  p: 0,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
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
          className="size-6 stroke-black dark:stroke-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </button>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={style}
          className="bg-white dark:bg-neutral-900 text-black dark:text-white"
        >
          {showDelete && (
            <Typography
              className="
                py-3 text-center font-semibold text-red-500
                border-b border-gray-300 dark:border-neutral-700
                hover:bg-gray-200 dark:hover:bg-neutral-700
              "
              onClick={handleDelete}
            >
              Delete
            </Typography>
          )}

          <Typography
            className="
              py-3 text-center text-blue-500 dark:text-blue-400
              border-b border-gray-300 dark:border-neutral-700
              hover:bg-gray-200 dark:hover:bg-neutral-700
            "
          >
            Follow
          </Typography>

          <Typography
            className="
              py-3 text-center font-medium
              text-yellow-500 dark:text-yellow-400
              border-b border-gray-300 dark:border-neutral-700
              hover:bg-gray-200 dark:hover:bg-neutral-700
            "
            onClick={() => {
              onToggleSave();
              handleClose();
            }}
          >
            {isSaved ? 'Unsave' : 'Save'}
          </Typography>

          <Typography
            className="
              py-3 text-center font-medium cursor-pointer
              hover:bg-gray-200 dark:hover:bg-neutral-700
            "
            onClick={handleClose}
          >
            Cancel
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
