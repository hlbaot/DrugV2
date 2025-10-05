export interface CommentType {
  id: number;
  content: string;
  images: string[];
  user: {
    username: string;
    avatar_url: string | null;
  };
}

export interface PostType {
  id: number;
  caption: string;
  images: string[];
  createdAt: string;
  user: {
    user_id: number,
    username: string;
    avatar_url: string | null;
  };
  comments: CommentType[];
  commentCount: number;
  likeCount: number;
  likedByCurrentUser: boolean;
  savedByCurrentUser: boolean;
}

export interface PostContextType {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  isLoading: boolean;
  refreshPosts: () => Promise<void>;
  updatePostLikeStatus: (postId: number, liked: boolean, likeCount: number) => void;
  updatePostSaveStatus: (postId: number, saved: boolean) => void;
  updatePostCommentCount: (postId: number, newCount: number) => void;
}