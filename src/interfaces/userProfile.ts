import { PostType } from "./post";

// Một người trong danh sách follower hoặc following
export interface FollowItem {
  id: number;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

// Danh sách những người mình đang theo dõi (following)
export interface ListFollowing {
  followings: FollowItem[];
}

// Danh sách những người đang theo dõi mình (followers)
export interface ListFollowers {
  followers: FollowItem[];
}

// Bài viết trong profile
export interface UserPost extends Omit<Partial<PostType>, 'id'> {
  id: number;
  caption: string;
  images: string[];
  likeCount: number;
  commentCount: number;
}

// Thông tin profile người dùng
export interface UserProfile {
  id: number;
  email: string;
  username: string;
  avatarUrl: string;
  bioText: string;
  followerCount: number;
  followingCount: number;
  postCount: number;
  isFollowing?: boolean;
}

// Interface cho ProfileContext
export interface ProfileContextType {
  myProfile: UserProfile | null;
  setMyProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;

  viewedProfile: UserProfile | null;
  setViewedProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;

  myPosts: UserPost[];
  setMyPosts: React.Dispatch<React.SetStateAction<UserPost[]>>;

  viewedPosts: UserPost[] | null;
  setViewedPosts: React.Dispatch<React.SetStateAction<UserPost[]>>;

  followers: FollowItem[];
  setFollowers: React.Dispatch<React.SetStateAction<FollowItem[]>>;

  following: FollowItem[];
  setFollowing: React.Dispatch<React.SetStateAction<FollowItem[]>>;

  /** Làm mới dữ liệu profile của chính mình */
  refreshMyProfile: () => Promise<void>;

  /** Làm mới dữ liệu profile của người khác */
  refreshViewedProfile: (username: string) => Promise<void>;

  /** Cập nhật likeCount / commentCount của bài viết */
  updatePostCounts: (postId: number, likeCount: number, commentCount: number) => void;

  /** Cập nhật thông tin profile (bio, avatar, username, v.v.) */
  updateProfile: (data: any) => Promise<void>;

  /** Theo dõi người dùng */
  followUser: (userId: number) => Promise<void>;

  /** Bỏ theo dõi người dùng */
  unfollowUser: (userId: number) => Promise<void>;
}


