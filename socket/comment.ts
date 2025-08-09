// import { useEffect } from 'react'
// import { useSocket } from '@/context/SocketContext'

// export interface Comment {
//   id: number
//   content: string
//   authorId: string
//   time: string
//   postId: string
// }

// export const useCommentSocket = (
//   postId: string,
//   onNewComment: (comment: Comment) => void
// ) => {
//   const socket = useSocket()

//   useEffect(() => {
//     if (!socket || !postId) return

//     // Lắng nghe comment chỉ của post này
//     const handleComment = (comment: Comment) => {
//       if (comment.postId === postId) {
//         onNewComment(comment)
//       }
//     }

//     socket.on('new-comment', handleComment)

//     return () => {
//       socket.off('new-comment', handleComment)
//     }
//   }, [socket, postId, onNewComment])

//   // Hàm gửi comment
//   const sendComment = (comment: Omit<Comment, 'id' | 'time'>) => {
//     if (!socket) return
//     socket.emit('send-comment', { ...comment, postId })
//   }

//   return { sendComment }
// }
