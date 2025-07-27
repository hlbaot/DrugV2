'use client';

import { useEffect, useState } from 'react';
import Post from '../components/post';
import { getAllPosts } from '../api/API_getPost';
import { PostType } from '../interfaces/post';

const sortPostsByTime = (posts: PostType[]) => {
    return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export default function PostFeed() {
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const postsData = await getAllPosts();
                setPosts(sortPostsByTime(postsData));
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bài viết:', error);
            }
        };

        fetchAllPosts();
    }, []);

    return (
    <div className="flex flex-col items-center">
        {posts.length === 0 ? (
            <p>Không có bài viết nào</p>
        ) : (
            posts.map((post) => <Post key={post.id} {...post} />)
        )}
    </div>
);

}
