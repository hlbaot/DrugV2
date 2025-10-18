import { PostType } from "./post";
export interface SavedPostType {
  // user_id: number
  post_id: number
  posts: PostType & { savedByCurrentUser: boolean }
  user: {
    username: string
    avatar_url: string | null
  }
}

export interface SavePostContextType {
  savedPosts: SavedPostType[];
  setSavedPosts: React.Dispatch<React.SetStateAction<SavedPostType[]>>;
  refreshSavedPosts: () => Promise<void>;
  updateSavedStatus: (postId: number, saved: boolean, newSavedPostData?: SavedPostType) => void;
}
