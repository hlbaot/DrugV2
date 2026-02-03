import { SavedPostType } from '@/src/interfaces/savedPost'
import { useSavePost } from '@/src/hooks/mutations/usePostMutations';
import IconSave from './icon_save';

interface PostSavedProps {
  savedPost: SavedPostType;
  onOpenDetail: () => void;
  hasImage?: boolean;
}

export default function PostSaved({ savedPost, onOpenDetail, hasImage = true }: PostSavedProps) {
  const saveMutation = useSavePost();
  const { id, caption, images, isSaved, user } = savedPost;

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening detail when clicking save button
    saveMutation.mutate(id);
  };

  const handleUsernameClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening detail when clicking username
  };

  const imageList =
    typeof images === 'string'
      ? images ? [images] : []
      : images ?? [];

  const firstImage = imageList[0];

  return (
    <div
      className="
        flex h-full flex-col 
        bg-white dark:bg-neutral-900 
        border border-gray-200 dark:border-neutral-700
        rounded-md shadow-sm 
        text-black dark:text-white
        cursor-pointer
      "
      onClick={onOpenDetail}
    >
      {/* Header */}
      <div className="w-full px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2" onClick={handleUsernameClick}>
          <img
            src={user.avatarUrl ?? '/avatar_default.jpg'}
            alt={user.username}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold text-sm text-black dark:text-white">
            {user.username}
          </span>
        </div>

        <div onClick={handleToggleSave}>
          <IconSave postId={id} isSaved={isSaved} onToggleSave={() => { }} />
        </div>
      </div>

      {/* Image or caption fallback */}
      {firstImage ? (
        <div className="w-full flex-1">
          <img
            src={firstImage}
            alt="post"
            className="w-full h-full object-cover rounded-b-md"
          />
        </div>
      ) : (
        <div className="px-4 pb-2 text-gray-800 dark:text-gray-300 text-sm italic flex-1">
          {caption || 'Không có nội dung'}
        </div>
      )}
    </div>
  );
}
