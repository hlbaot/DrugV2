import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from '@/src/api/cloudinary';
import axios from 'axios';

/** Upload 1 ảnh */
export const uploadSingleImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const res = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
  if (!res.data?.secure_url) throw new Error('Upload failed');
  return res.data.secure_url;
};

/** Upload nhiều ảnh */
export const uploadMultipleImages = async (files: FileList | null): Promise<string[]> => {
  if (!files) return [];

  const uploadPromises = Array.from(files).map((file) => uploadSingleImage(file));
  return await Promise.all(uploadPromises);
};
