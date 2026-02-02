'use client'
import { useEffect, useRef } from "react";
import { useSocketCmt } from "@/src/hooks/useSocketComment";
import { CommentType, CommentRequest } from "@/src/interfaces/post";

interface CommentSocketPayload {
  postId: number;
  comment: CommentType;
}

export const useCommentSocket = (postId: number, onNewComment: (c: CommentType) => void) => {
  const socketCmt = useSocketCmt();

  const onNewCommentRef = useRef(onNewComment);

  useEffect(() => {
    onNewCommentRef.current = onNewComment;
  }, [onNewComment]);

  useEffect(() => {
    if (!socketCmt || !postId) return;

    // console.log("INIT SOCKET FOR POST:", postId);

    // JOIN ROOM NGAY LẬP TỨC
    socketCmt.emit("join-post-room", { postId });
    // console.log("🏠 JOIN ROOM:", postId);

    // NẾU SOCKET RECONNECT THÌ JOIN LẠI
    const handleConnect = () => {
      console.log("RECONNECTED:", socketCmt.id);
      socketCmt.emit("join-post-room", { postId });
    };

    // nhận comment mới từ server
    const handleNewComment = (data: CommentSocketPayload) => {
      if (data.postId === postId) {
        // console.log("FE RECEIVED NEW COMMENT (for " + postId + "):", data);
        onNewCommentRef.current(data.comment);
      }
    };

    socketCmt.on("connect", handleConnect);
    socketCmt.on("new-comment", handleNewComment);

    return () => {
      socketCmt.emit("leave-post-room", { postId });
      socketCmt.off("connect", handleConnect);
      socketCmt.off("new-comment", handleNewComment);
    };
  }, [postId, socketCmt]);



  // 3) Gửi comment lên sever
  const sendComment = (data: CommentRequest) => {
    // console.log("📤 SEND COMMENT:", data);
    socketCmt.emit("send-comment", data);
  };

  return { sendComment };
};
