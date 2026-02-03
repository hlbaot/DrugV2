import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Modal } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { CreatePost } from '@/src/api/API_createPost';
import { useRouter } from "next/navigation";
import { uploadMultipleImages } from '@/src/feature/cloudinaryUpload';
import { useProfile } from '@/src/store/useProfileStore';
import { useUser } from '@/src/store/useUserStore';
import { postKeys } from '@/src/hooks/queries/usePosts';
import { profileKeys } from '@/src/hooks/queries/useProfile';
import Cookies from 'js-cookie';

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateModal({ open, onClose }: CreateModalProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { myProfile, setMyProfile, setMyPosts } = useProfile();

  const [caption, setCaption] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [previewFiles, setPreviewFiles] = useState<{ url: string; file: File }[]>([]);
  const [loading, setLoading] = useState(false);

  // Reset form khi modal đóng
  useEffect(() => {
    if (!open) {
      setCaption('');
      setFiles(null);
      setPreviewFiles([]);
    }
  }, [open]);

  // Xử lý submit
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const imageUrls = await uploadMultipleImages(files);

      const newPostFromApi = await CreatePost({ caption, imageUrls });

      // Làm mới cache TanStack Query để tự động tải lại dữ liệu mới
      // Feed sẽ tự động cập nhật không cần reload
      await queryClient.invalidateQueries({ queryKey: postKeys.feed() });

      // Cập nhật profile posts nếu có username
      if (user?.username) {
        await queryClient.invalidateQueries({ queryKey: profileKeys.posts(user.username) });
        await queryClient.invalidateQueries({ queryKey: profileKeys.detail(user.username) });
      }

      // Cập nhật state profile (dự phòng)
      if (myProfile && newPostFromApi) {
        setMyProfile(prev =>
          prev ? { ...prev, postCount: (prev.postCount ?? 0) + 1 } : prev
        );
        setMyPosts(prev => (prev ? [newPostFromApi, ...prev] : [newPostFromApi]));
      }

      router.push("/home");

      Swal.fire({
        title: 'Post created!',
        icon: 'success',
        text: 'Your post has been successfully published.',
        timer: 2500,
        showConfirmButton: false,
      });

      onClose();
    } catch (err) {
      console.error('🔴 Post error:', err);

      Swal.fire({
        title: 'Failed to post!',
        icon: 'error',
        text: 'Something went wrong. Please try again.',
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // kiểm tra disabled
  const isDisabled = caption.trim() === '' && previewFiles.length === 0;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="
        fixed inset-0 z-50 flex items-center justify-center 
        bg-black/30 dark:bg-black/60
      ">
        <div className="
          relative w-[90%] max-w-md p-6 rounded-2xl shadow-lg
          bg-white dark:bg-neutral-900
          text-black dark:text-white
        ">
          {/* Nút đóng */}
          <button
            onClick={onClose}
            className="
              absolute top-3 right-3 text-xl
              text-gray-500 hover:text-black 
              dark:text-gray-300 dark:hover:text-white
            "
          >
            ✕
          </button>

          {/* Tiêu đề */}
          <h2 className="text-xl font-bold text-center mb-4">
            Create new post
          </h2>

          {/* Ô nhập nội dung */}
          <textarea
            className="
              w-full border-b p-2 mb-4 resize-none outline-none
              placeholder-gray-400
              bg-white dark:bg-neutral-900
              border-gray-300 dark:border-gray-600
              text-black dark:text-white
            "
            rows={3}
            placeholder="Contents..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          {/* Nút tải ảnh */}
          <label
            htmlFor="file-upload"
            className="
              block border border-dashed rounded-md p-4 mb-4 text-center cursor-pointer
              bg-white dark:bg-neutral-800
              border-gray-400 dark:border-gray-600
              text-black dark:text-white
              hover:bg-gray-100 dark:hover:bg-neutral-700
            "
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
              const prevFiles = files ? Array.from(files) : [];
              const allFiles = [...prevFiles, ...newFiles];

              const dt = new DataTransfer();
              allFiles.forEach(f => dt.items.add(f));
              setFiles(dt.files);

              const newPreview = newFiles.map(file => ({
                file,
                url: URL.createObjectURL(file),
              }));

              setPreviewFiles(prev => [...prev, ...newPreview]);
            }}
          />

          {/* Xem trước ảnh */}
          {previewFiles.length > 0 && (
            <div className="overflow-x-auto mb-4">
              <div className="flex gap-2 w-max px-2">
                {previewFiles.map((item, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={item.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...previewFiles];
                        updated.splice(index, 1);
                        setPreviewFiles(updated);

                        const dt = new DataTransfer();
                        updated.forEach(f => dt.items.add(f.file));
                        setFiles(dt.files);
                      }}
                      className="
                        absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center
                        text-xs bg-black text-white
                        dark:bg-white dark:text-black
                      "
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nút gửi */}
          <button
            onClick={handleSubmit}
            disabled={loading || isDisabled}
            className={`
              w-full border rounded-full py-2 transition
              bg-white dark:bg-neutral-800
              border-gray-300 dark:border-neutral-600
              text-black dark:text-white

              ${isDisabled
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100 dark:hover:bg-neutral-700"}
            `}
          >
            {loading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
