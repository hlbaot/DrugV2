'use client';
import { useEffect } from 'react'
import { useSocket } from '@/src/context/SocketContext'
import { CommentRequest, CommentType } from '../interfaces/post';

export const useCommentSocket = (
  postId: number,
  onNewComment: (comment: CommentType) => void
) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !postId) return;

    const handleComment = (comment: CommentType) => {
      if (comment.postId === postId) {
        onNewComment(comment);
      }
    };

    socket.on("new-comment", handleComment);

    return () => {
      socket.off("new-comment", handleComment);
    };
  }, [socket, postId, onNewComment]);

  const sendComment = (data: CommentRequest) => {
    if (!socket) return;
    socket.emit("send-comment", data);
  };

  return { sendComment };
};

