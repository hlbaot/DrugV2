import axios from 'axios';
// create post
export const CreatePost = async ({
    content,
    imageUrls,
    // isPublic = true,
    userId,
}: {
    content: string;
    imageUrls: string[];
    // isPublic?: boolean;
    userId: number;
}): Promise<void> => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (!token) throw new Error('Không tìm thấy token');

    await axios.post(
        'http://10.243.200.17:5050/api/posts',
        {
            caption: content,
            images: imageUrls,
            // is_public: isPublic,
            user_id: userId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
