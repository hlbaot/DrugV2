import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from '@/api/cloudinary';

/** Upload 1 ảnh */
export const uploadSingleImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Upload failed');

  const data = await res.json();
  return data.secure_url as string;
};

/** Upload nhiều ảnh */
export const uploadMultipleImages = async (files: FileList | null): Promise<string[]> => {
  if (!files) return [];
  const uploadPromises = Array.from(files).map((file) => uploadSingleImage(file));
  return await Promise.all(uploadPromises);
};
