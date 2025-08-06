import { PostType } from "./post";
export interface SavedPostType {
  user_id: number;
  post_id: number;
  posts: PostType;
  user: {
    username: string;
    avatar_url: string | null;
  };
}
