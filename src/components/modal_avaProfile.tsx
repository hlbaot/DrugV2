import * as React from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";

type ModalAva = {
  open: boolean;
  onClose: () => void;
};

export const ModalAva = ({ open, onClose }: ModalAva) => {
  return (
    <Modal
      aria-labelledby="change-profile-title"
      aria-describedby="change-profile-options"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
          style: { backgroundColor: "rgba(0,0,0,0.45)" },
        },
      }}
    >
      <Fade in={open}>
        <div
          className="
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-[400px] rounded-[24px] shadow-2xl ring-1 ring-black/5
            bg-white dark:bg-neutral-900
            text-black dark:text-white
            overflow-hidden
          "
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-4 text-center">
            <h2
              id="change-profile-title"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              Change Profile Photo
            </h2>
          </div>

          <div className="h-px bg-gray-200 dark:bg-neutral-700" />

          {/* Upload Photo */}
          <div
            id="change-profile-options"
            className="
              py-4 text-center text-lg font-semibold
              text-blue-600 dark:text-blue-400
              hover:bg-blue-50 dark:hover:bg-neutral-800
              cursor-pointer
            "
          >
            Upload Photo
          </div>

          <div className="h-px bg-gray-200 dark:bg-neutral-700" />

          {/* Remove Photo */}
          <div
            className="
              py-4 text-center text-lg font-semibold
              text-red-600 dark:text-red-400
              hover:bg-red-50 dark:hover:bg-neutral-800
              cursor-pointer
            "
          >
            Remove Current Photo
          </div>

          <div className="h-px bg-gray-200 dark:bg-neutral-700" />

          {/* Cancel */}
          <div
            onClick={onClose}
            className="
              py-4 text-center text-lg font-medium
              text-gray-900 dark:text-white
              hover:bg-gray-50 dark:hover:bg-neutral-800
              cursor-pointer
            "
          >
            Cancel
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
