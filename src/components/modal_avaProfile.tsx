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
            w-[400px] rounded-[24px] bg-white shadow-2xl ring-1 ring-black/5
            overflow-hidden
          "
          role="dialog"
          aria-modal="true"
        >
          <div className="px-6 pt-6 pb-4 text-center">
            <h2 id="change-profile-title" className="text-2xl font-bold text-gray-900">
              Change Profile Photo
            </h2>
          </div>

          <div className="h-px bg-gray-200" />

          <div
            id="change-profile-options"
            className="py-4 text-center text-lg font-semibold text-blue-600 hover:bg-blue-50 cursor-pointer"
          >
            Upload Photo
          </div>

          <div className="h-px bg-gray-200" />

          <div className="py-4 text-center text-lg font-semibold text-red-600 hover:bg-red-50 cursor-pointer">
            Remove Current Photo
          </div>

          <div className="h-px bg-gray-200" />

          <div
            onClick={onClose}
            className="py-4 text-center text-lg font-medium text-gray-900 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
