import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal } from '@mui/material';

const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/djpujlimr/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'img_post';

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateModal({ open, onClose }: CreateModalProps) {
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewFiles, setPreviewFiles] = useState<{ url: string; file: File }[]>([]);


  useEffect(() => {
    if (!open) {
      setContent('');
      setFiles(null);
      setPreviewUrls([]);
    }
  }, [open]);

  const uploadImagesToCloudinary = async (files: FileList | null): Promise<string[]> => {
    if (!files) return [];

    const uploadPromises = Array.from(files).map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      return fetch(CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formData, 
      })
        .then((res) => {
          if (!res.ok) throw new Error('Upload failed');
          return res.json();
        })
        .then((data) => data.secure_url);
    });

    return await Promise.all(uploadPromises);
  };


  const handleSubmit = async () => {
    try {
      setLoading(true);
      const imageUrls = await uploadImagesToCloudinary(files);

      const token = localStorage.getItem('token') || sessionStorage.getItem('token');

      if (!token) {
        throw new Error('Bạn chưa đăng nhập hoặc thiếu token');
      }

      await axios.post(
        'http://10.243.200.17:5050/api/posts',
        {
          caption: content,
          images: imageUrls,
          is_public: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: 'Post created!',
        icon: 'success',
        text: 'Your post has been successfully published.',
        timer: 2500,
        showConfirmButton: false,
        didOpen: () => {
          const container = document.querySelector('.swal2-container') as HTMLElement;
          if (container) container.style.zIndex = '9999';
        },
      });

      onClose();
    } catch (err) {
      console.error('🔴 Post error:', err);
      Swal.fire({
        title: 'Failed to post!',
        icon: 'error',
        text: 'Something went wrong. Please try again.',
        showConfirmButton: true,
        didOpen: () => {
          const container = document.querySelector('.swal2-container') as HTMLElement;
          if (container) container.style.zIndex = '9999';
        },
      });
    } finally {
      setLoading(false);
    }
    
  };


  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="relative w-[90%] max-w-md bg-white rounded-2xl p-6 shadow-lg">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>

          {/* Header */}
          <h2 className="text-xl font-bold text-center mb-4">Create new post</h2>

          {/* Content Input */}
          <textarea
            className="w-full border-b p-2 resize-none placeholder-gray-400 outline-none mb-4"
            placeholder="Contents..."
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Upload Button */}
          <label className="block border border-dashed border-gray-400 rounded-md p-4 text-center cursor-pointer mb-4">
            Choose file upload
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={(e) => {
                const selectedFiles = e.target.files;
                if (selectedFiles) {
                  const fileArray = Array.from(selectedFiles).map((file) => ({
                    file,
                    url: URL.createObjectURL(file),
                  }));
                  setFiles(selectedFiles);
                  setPreviewFiles(fileArray);
                }
              }}
            />
          </label>


          {/* Image Previews */}
          {previewFiles.length > 0 && (
            <div className="overflow-x-auto mb-4">
              <div className="flex gap-2 w-max pr-2">
                {previewFiles.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 w-20 h-20 rounded overflow-hidden"
                  >
                    <img
                      src={item.url}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...previewFiles];
                        updated.splice(index, 1);
                        setPreviewFiles(updated);

                        const dt = new DataTransfer();
                        updated.forEach((item) => dt.items.add(item.file));
                        setFiles(dt.files);
                      }}
                      className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full border rounded-full py-2 hover:bg-gray-100 transition"
          >
            {loading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
