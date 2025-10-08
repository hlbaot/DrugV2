export interface UserPreview {
  username: string;
  avatarUrl: string | null;
  isFollowing: boolean;
}

export interface UserPost {
  id: number;
  caption: string;
  images: string[];
  likeCount: number;
  commentCount: number;
  createdAt: string;
}

export interface UserProfile {
  id: number; 
  username: string;
  avatarUrl: string | null;
  bioText: string | null;
  followersCount: number;
  followingsCount: number;
  postsCount: number;
  isFollowing: boolean;
  followerPreview: UserPreview[];
  followingPreview: UserPreview[];
  posts: UserPost[];
}

export interface ProfileContextType {
  // Profile của chính mình (user đang đăng nhập)
  myProfile: UserProfile | null;
  setMyProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;

  // Profile của người đang được xem (theo /[username])
  viewedProfile: UserProfile | null;
  setViewedProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;

  // API gọi lại dữ liệu
  refreshMyProfile: () => Promise<void>;
  refreshViewedProfile: (username: string) => Promise<void>;

  // Cập nhật số lượng like/comment của bài post
  updatePostCounts: (postId: number, likeCount: number, commentCount: number) => void;
}
