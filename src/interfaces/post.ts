export interface CommentRequest {
  content: string;
  postId: number;
}

export interface CommentType {
  id: number;
  content: string;
  user: {
    id: number;
    username: string;
  };
}

export interface CommentResponse {
  comments: CommentType[];
}

export interface PostType {
  id: number;
  caption: string;
  images: string[];
  createdAt: string;
  user: {
    id: number,
    username: string;
    avatarUrl: string | null;
  };
  //comments: CommentType[];
  commentCount: number;
  likeCount: number;
  isLiked: boolean;  
  isSaved: boolean;
}

export interface PostContextType {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  isLoading: boolean;
  refreshPosts: () => Promise<void>;
  updatePostLikeStatus: (postId: number, liked: boolean, likeCount: number) => void;
  updatePostSaveStatus: (postId: number, saved: boolean) => void;
  updatePostCommentCount: (postId: number, newCount: number) => void;
  //updatePostComments: (postId: number, newComment: CommentType) => void;
}

export interface CreatePostRequest {
  caption: string;
  imageUrls: string[];
  // isPublic?: boolean; 
}