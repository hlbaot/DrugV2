'use client'

import { useEffect, useState } from 'react'
import IconHeart from "../../../public/icon_heart"

interface PostType {
  username: string
  caption: string
  avatar: string
  image: string
  likes: number
  comments: number
  commentPreview: string[]
}

function Post() {
  const [post, setPost] = useState<PostType | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      const data: PostType = {
        username: 'hlbaot',
        caption: 'Hi, daden',
        avatar: 'https://i.pinimg.com/736x/b6/88/31/b68831ed5d31b7f569560a8805ff06ec.jpg',
        image: 'https://i.pinimg.com/736x/88/43/3f/88433f7556fb6968ef31fa2405aeb18b.jpg',
        likes: 0,
        comments: 1,
        commentPreview: ['Hi'],
      }
      setPost(data)
    }

    fetchPost()
  }, [])

  if (!post) return <div>Loading...</div>

  return (
    <div className="post p-4 max-w-md border rounded-lg bg-white shadow">
      <div className="head flex items-center mb-3 justify-between">
        <div className="left flex items-center space-x-2">
          <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
          <span className="font-semibold">{post.username}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
        </svg>
      </div>

      <span className="block mb-2">{post.caption}</span>

      <img src={post.image} alt="post" className="w-full rounded-lg mb-3" />

      <div className="react flex space-x-4 mb-2 text-sm text-gray-600">
        <span className="flex items-center space-x-1">
          <IconHeart />
          <span>{post.likes} likes</span>
        </span>

        <span className="flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
          </svg>

          <span>{post.comments} comments</span>
        </span>
      </div>

      <div className="show-cmt text-sm mb-2">
        {post.commentPreview.map((cmt, i) => (
          <div key={i}>
            <span className="font-semibold">{post.username}</span> {cmt}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm"
        />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
      </div>
    </div>
  )
}

export default Post
