export interface UserPreview {
  username: string;
  avatar_url: string | null;
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
  bio: string | null;
  followersCount: number;
  followingsCount: number;
  postsCount: number;
  isFollowing: boolean;
  followerPreview: UserPreview[];
  followingPreview: UserPreview[];
  posts: UserPost[];
}

export interface ProfileContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  refreshProfile: () => Promise<void>;
  updatePostCounts: (postId: number, likeCount: number, commentCount: number) => void;
}