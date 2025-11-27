'use client'
import { useEffect } from "react";
import { useSocket } from "@/src/context/SocketContext";
import { CommentType, CommentRequest } from "@/src/interfaces/post";

interface CommentSocketPayload {
  postId: number;
  comment: CommentType;
}

export const useCommentSocket = (postId: number, onNewComment: (c: CommentType) => void) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !postId) return;

    console.log("🔌 INIT SOCKET FOR POST:", postId);

    // JOIN ROOM NGAY LẬP TỨC
    socket.emit("join-post-room", { postId });
    // console.log("🏠 JOIN ROOM:", postId);

    // NẾU SOCKET RECONNECT THÌ JOIN LẠI
    const handleConnect = () => {
      console.log("🔥 RECONNECTED:", socket.id);
      socket.emit("join-post-room", { postId });
    };

    // nhận comment mới từ server 
    const handleNewComment = (data: CommentSocketPayload) => {
      console.log("🟩 FE RECEIVED NEW COMMENT:", data);

      if (data.postId === postId) onNewComment(data.comment);
    };

    socket.on("connect", handleConnect);
    socket.on("new-comment", handleNewComment);

    return () => {
      socket.emit("leave-post-room", { postId });
      socket.off("connect", handleConnect);
      socket.off("new-comment", handleNewComment);
    };
  }, [postId]);



  // 3) Gửi comment lên sever
  const sendComment = (data: CommentRequest) => {
    console.log("📤 SEND COMMENT:", data);
    socket.emit("send-comment", data);
  };

  return { sendComment };
};
