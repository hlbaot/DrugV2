'use client'
import { useState, useRef, useEffect } from "react"
import { useMessageRoom, useMessageList } from "@/src/hooks/queries/useMessage"
import { useUser } from "@/src/store/useUserStore"
import Image from "next/image"
import { ListMessage, MessageRoom } from "@/src/interfaces/InterfaceMessage"
import { useParams } from 'next/navigation'
import ChatSkeleton from '@/public/skeletonChat'
import { useMessageSocket } from '@/src/socket/message'

const getMessageTime = (msg: MessageRoom) => {
    const time = msg.createdAt ? new Date(msg.createdAt).getTime() : Number.NaN;
    return Number.isNaN(time) ? null : time;
};

const sortMessagesAsc = (a: MessageRoom, b: MessageRoom) => {
    const aTime = getMessageTime(a);
    const bTime = getMessageTime(b);

    if (aTime !== null && bTime !== null && aTime !== bTime) {
        return aTime - bTime;
    }

    return a.id - b.id;
};

const upsertAndSortMessages = (prev: MessageRoom[], nextMsg: MessageRoom) => {
    if (prev.some((m) => m.id === nextMsg.id)) return prev;
    return [...prev, nextMsg].sort(sortMessagesAsc);
};

export default function MainMessage() {
    const [messageText, setMessageText] = useState<string>('');
    const [chatMessages, setChatMessages] = useState<MessageRoom[]>([]);
    const { user } = useUser();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const params = useParams<{ roomId: string }>()
    const roomId = params!.roomId

    // Lấy danh sách hội thoại để tìm thông tin partner
    const { data: messages, isPending } = useMessageList();
    const conversation = messages?.find((msg: ListMessage) => String(msg.roomId) === roomId);

    // Lấy tin nhắn trong room từ API
    const { data: roomMessages } = useMessageRoom(roomId);

    // Sync API data vào state (chỉ lần đầu hoặc khi roomId thay đổi)
    useEffect(() => {
        if (!roomMessages) return;
        setChatMessages([...roomMessages].sort(sortMessagesAsc));
    }, [roomMessages]);

    // Reset messages khi đổi room
    useEffect(() => {
        setChatMessages([]);
    }, [roomId]);

    // Socket message — nhận tin nhắn mới real-time (giống comment socket)
    const { sendMessage } = useMessageSocket(roomId, (newMsg: MessageRoom) => {
        // Normalize để tránh lỗi khi payload thiếu field
        const normalized: MessageRoom = {
            id: newMsg.id,
            senderId: newMsg.senderId,
            roomId: newMsg.roomId,
            message: newMsg.message || '',
            createdAt: newMsg.createdAt || new Date().toISOString(),
        };
        setChatMessages((prev) => {
            // Nếu đã có message với cùng id → bỏ qua
            if (prev.some((m) => m.id === normalized.id)) return prev;

            // Nếu là tin nhắn echo từ chính mình → thay thế optimistic message
            if (normalized.senderId === user?.id) {
                const optimisticIdx = prev.findIndex(
                    (m) => m.id >= 1_000_000_000_000 && m.message === normalized.message && m.senderId === normalized.senderId
                );
                if (optimisticIdx !== -1) {
                    const updated = [...prev];
                    updated[optimisticIdx] = normalized;
                    return updated;
                }
            }

            // Tin nhắn từ người khác → thêm vào
            return [...prev, normalized].sort(sortMessagesAsc);
        });
    });

    // Gửi tin nhắn — hiện ngay + gửi socket
    const handleSendMessage = () => {
        if (!messageText.trim()) return;
        const text = messageText;
        setMessageText('');

        // Optimistic: hiện tin nhắn ngay lập tức
        const optimisticMsg: MessageRoom = {
            id: Date.now(),
            senderId: user?.id ?? 0,
            roomId: Number(roomId),
            message: text,
            createdAt: new Date().toISOString(),
        };
        setChatMessages((prev) => upsertAndSortMessages(prev, optimisticMsg));

        // Gửi qua socket
        sendMessage(text);
    };

    // Format giờ cho tin nhắn
    const formatMsgTime = (dateStr: string) => {
        const date = new Date(dateStr);
        if (Number.isNaN(date.getTime())) return '';
        return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    };

    // Tự cuộn xuống cuối khi có tin nhắn mới
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    // Đang tải
    if (isPending) {
        return <ChatSkeleton />;
    }

    // Không tìm thấy cuộc trò chuyện
    if (!conversation) {
        return <div className="flex-1 flex items-center justify-center text-gray-500">Không tìm thấy cuộc trò chuyện</div>;
    }

    return (
        <>
            {/* Chat Header */}
            <div className="h-[60px] px-5 flex items-center gap-3 border-b border-gray-200 dark:border-neutral-800">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-neutral-700 flex-shrink-0">
                    <Image
                        src={conversation.partner.avatarUrl || '/avatar_default.jpg'}
                        alt={conversation.partner.userName}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-sm dark:text-white">{conversation.partner.userName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Đang hoạt động</p>
                </div>
                {/* Action buttons */}
                <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
                {/* Avatar + tên ở đầu cuộc trò chuyện */}
                <div className="flex flex-col items-center mb-8 mt-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-neutral-700 mb-3">
                        <Image
                            src={conversation.partner.avatarUrl || '/avatar_default.jpg'}
                            alt={conversation.partner.userName}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <p className="font-bold text-lg dark:text-white">{conversation.partner.userName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Instagram</p>
                    <button className="mt-3 px-4 py-1.5 text-sm font-semibold bg-gray-100 dark:bg-neutral-800 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-700 transition dark:text-white">
                        Xem trang cá nhân
                    </button>
                </div>

                {/* Tin nhắn */}
                {chatMessages.map((msg) => {
                    const isMine = msg.senderId === user?.id;
                    // Không hiện bubble nếu tin nhắn rỗng
                    if (!msg.message) return null;
                    return (
                        <div
                            key={msg.id}
                            className={`flex mb-3 ${isMine ? 'justify-end' : 'justify-start'}`}
                        >
                            {/* Avatar người gửi (chỉ hiện cho tin nhắn nhận) */}
                            {!isMine && (
                                <div className="relative w-7 h-7 rounded-full overflow-hidden bg-gray-200 dark:bg-neutral-700 flex-shrink-0 mr-2 mt-auto mb-0.5">
                                    <Image
                                        src={conversation.partner.avatarUrl || '/avatar_default.jpg'}
                                        alt=""
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                            <div className="group relative max-w-[65%]">
                                <div
                                    className={`px-4 py-2.5 text-sm leading-relaxed break-words
                                        ${isMine
                                            ? 'bg-[#3797F0] text-white rounded-[22px] rounded-br-[4px]'
                                            : 'bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white rounded-[22px] rounded-bl-[4px]'
                                        }`}
                                >
                                    {msg.message}
                                </div>
                                {/* Giờ gửi - hiện khi hover */}
                                <span
                                    className={`pointer-events-none absolute -bottom-4 text-[10px] text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${isMine ? 'right-1' : 'left-1'
                                        }`}
                                >
                                    {formatMsgTime(msg.createdAt)}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div className="px-5 py-3 border-t border-gray-200 dark:border-neutral-800">
                <form
                    className="flex items-center gap-3 bg-gray-100 dark:bg-neutral-800 rounded-full px-4 py-2 border border-gray-200 dark:border-neutral-700"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                    }}
                >
                    {/* Text input */}
                    <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Nhắn tin..."
                        className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />

                    {/* Nút gửi */}
                    <button type="submit" className="bg-transparent border-none p-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 cursor-pointer stroke-black dark:stroke-white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 12L3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5 12zm0 0h7.5"
                            />
                        </svg>
                    </button>
                </form>
            </div>
        </>
    );
}
