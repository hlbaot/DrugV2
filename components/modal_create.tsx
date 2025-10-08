import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Modal } from '@mui/material';
import { usePostContext } from '@/context/PostContext';
import { CreatePost } from '@/api/API_postPosts';
import { useRouter } from "next/navigation";
import { uploadMultipleImages } from '@/feature/cloudinaryUpload';
import { useProfile } from '@/context/ProfileContext';
import Cookies from 'js-cookie';

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateModal({ open, onClose }: CreateModalProps) {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewFiles, setPreviewFiles] = useState<{ url: string; file: File }[]>([]);
  const { refreshPosts } = usePostContext();
  const { userProfile, setUserProfile } = useProfile();

  useEffect(() => {
    if (!open) {
      setContent('');
      setFiles(null);
      setPreviewFiles([]);
    }
  }, [open]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const imageUrls = await uploadMultipleImages(files);

      const userId = Cookies.get('userId');
      const token = Cookies.get('token');
      
      const newPostFromApi = await CreatePost({
        content,
        imageUrls,
        userId: Number(userId),
      });
      // Cập nhật lại danh sách bài viết ngay sau khi post
      refreshPosts();

      if (userProfile && newPostFromApi) {
        setUserProfile({
          ...userProfile,
          posts: [newPostFromApi, ...userProfile.posts], // thêm post mới từ API
          postsCount: userProfile.postsCount + 1,          // tăng số lượng post
        });
      }

      router.push("/home");
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
          <label
            htmlFor="file-upload"
            className="block border border-dashed border-gray-400 rounded-md p-4 text-center cursor-pointer mb-4"
          >
            Choose file upload
          </label>
          <input
            id="file-upload"
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={(e) => {
              if (!e.target.files) return;
              const newFiles = Array.from(e.target.files);
              // Merge với file cũ
              const prevFiles = files ? Array.from(files) : [];
              const allFiles = [...prevFiles, ...newFiles];

              // Tạo FileList mới
              const dt = new DataTransfer();
              allFiles.forEach(f => dt.items.add(f));
              setFiles(dt.files);

              // Tạo preview mới
              const newPreviews = newFiles.map(file => ({
                file,
                url: URL.createObjectURL(file),
              }));
              setPreviewFiles(prev => [...prev, ...newPreviews]);
            }}
          />


          {/* Image Previews */}
          {previewFiles.length > 0 && (
            <div className="overflow-x-auto mb-4">
              <div className="flex gap-2 w-max px-2">
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
