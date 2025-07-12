// 'use client'

// import { useEffect, useState } from 'react'

// function Post() {
//     const [post, setPost] = useState(null)

//     useEffect(() => {
//         // Giả lập API call
//         const fetchPost = async () => {
//             const data = {
//                 username: 'hlbaot',
//                 caption: 'Hi, daden',
//                 avatar: '/avatar.jpg', // Replace with actual avatar image path
//                 image: '/post.jpg', // Replace with actual post image path
//                 likes: 100,
//                 comments: 25,
//                 commentPreview: ['Hi'],
//             }
//             setPost(data)
//         }

//         fetchPost()
//     }, [])

//     if (!post) return <div>Loading...</div>

//     return (
//         <div className="post p-4 max-w-md mx-auto border rounded-lg bg-white shadow">
//             <div className="head flex items-center mb-3">
//                 <div className="left flex items-center space-x-2">
//                     <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
//                     <span className="font-semibold">{post.username}</span>
//                 </div>
//             </div>
//             <span className="block mb-2">{post.caption}</span>
//             <img src={post.image} alt="post" className="w-full rounded-lg mb-3" />
//             <div className="react flex space-x-4 mb-2 text-sm text-gray-600">
//                 <span>❤️ {post.likes} likes</span>
//                 <span>💬 {post.comments} comments</span>
//             </div>
//             <div className="show-cmt text-sm mb-2">
//                 {post.commentPreview.map((cmt, i) => (
//                     <div key={i}>
//                         <span className="font-semibold">{post.username}</span> {cmt}
//                     </div>
//                 ))}
//             </div>
//             <div>
//                 <input
//                     type="text"
//                     placeholder="Add a comment..."
//                     className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm"
//                 />
//             </div>
//         </div>
//     )
// }

// export default Post
