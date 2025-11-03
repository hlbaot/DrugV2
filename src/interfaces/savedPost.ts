export interface SavedPostType {
  id: number;
  images: string | string[]; 
  caption: string;
  isSaved: boolean;
  user: {
    id: number;
    username: string;
    avatarUrl: string | null;
  };
}


export interface SavedPostResponse {
  posts: SavedPostType[];
}

export interface SavePostContextType {
  savedPosts: SavedPostType[];
  setSavedPosts: React.Dispatch<React.SetStateAction<SavedPostType[]>>;
  refreshSavedPosts: () => Promise<void>;
  updateSavedStatus: (id: number, isSaved: boolean, newSavedPostData?: SavedPostType) => void;
}
