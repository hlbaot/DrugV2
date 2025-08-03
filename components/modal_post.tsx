// components/ThreeDotModal.tsx
import { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

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


export default function ThreeDotModal() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                    <Typography sx={{ ...buttonStyle, color: 'red' }}>Detele</Typography>
                    <Typography sx={{ ...buttonStyle, color: 'blue' }}>Follow</Typography>
                    <Typography sx={{ ...buttonStyle, color: '#FFCC33'}}>Save</Typography>
                    <Typography sx={buttonStyle} onClick={handleClose}>Cancel</Typography>
                </Box>
            </Modal>
        </>
    );
}
