'use client'
import { SavedPostType } from '@/src/interfaces/savedPost'
import { stateSave } from '@/src/api/API_savePost';
import { useSavePostContext } from '@/src/context/SavePostContext';
import { usePostContext } from '@/src/context/PostContext';
import IconSave from './icon_save';

interface PostSavedProps {
  savedPost: SavedPostType;
}

export default function PostSaved({ savedPost }: PostSavedProps) {
  const { updateSavedStatus } = useSavePostContext();
  const { updatePostSaveStatus } = usePostContext();

  const { id, caption, images, isSaved, user } = savedPost;

  const handleToggleSave = async () => {
    try {
      const optimisticSaved = !isSaved;
      updatePostSaveStatus(id, optimisticSaved);

      const data = await stateSave(id);
      const { isSaved: serverSaved } = data;

      updatePostSaveStatus(id, serverSaved);
      updateSavedStatus(id, serverSaved);
    } catch (error) {
      console.error(error);
      updatePostSaveStatus(id, isSaved);
    }
  };

  const imageList =
    typeof images === 'string'
      ? images ? [images] : []
      : images ?? [];

  const firstImage = imageList[0];

  return (
    <div className="
      flex h-full flex-col 
      bg-white dark:bg-neutral-900 
      border border-gray-200 dark:border-neutral-700
      rounded-md shadow-sm 
      text-black dark:text-white
      max-w-sm
    ">

      {/* Header */}
      <div className="w-full px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={user.avatarUrl ?? '/avatar_default.jpg'}
            alt={user.username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold text-sm text-black dark:text-white">
            {user.username}
          </span>
        </div>

        <IconSave postId={id} isSaved={isSaved} onToggleSave={handleToggleSave} />
      </div>

      {/* Image or caption fallback */}
      {firstImage ? (
        <div className="w-full">
          <img
            src={firstImage}
            alt="post"
            className="w-full h-auto object-contain rounded-md max-h-[450px]"
          />
        </div>
      ) : (
        <div className="px-4 pb-2 text-gray-800 dark:text-gray-300 text-sm italic">
          {caption || 'Không có nội dung'}
        </div>
      )}
    </div>
  );
}
