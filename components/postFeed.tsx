'use client'

import { useEffect, useState } from 'react'
import Post from '../ui/post'
import { getAllPosts } from '../api/API_getPost';

export interface PostType {
    postId: number
    username: string
    caption: string
    avatar_url: string
    images: string[]
    likes: number
    comments: number
    commentPreview: string[]
    likedByCurrentUser: boolean
}

export default function PostFeed() {
    const [posts, setPosts] = useState<PostType[]>([])
    //trả về danh sách bài posts
    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const postsData = await getAllPosts();
                setPosts(postsData);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bài viết:', error);
            }
        };

        fetchAllPosts();
    }, []);
    return (
        <div className="flex flex-col items-center">
            {posts.map((post) => (
                <Post key={post.postId} {...post} />
            ))}
        </div>
    )
}
