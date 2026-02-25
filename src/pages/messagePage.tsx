'use client'
import { useMessageList } from "@/src/hooks/queries/useMessage"
import { useUser } from "@/src/store/useUserStore"
import Image from "next/image"
import { ListMessage } from "@/src/interfaces/InterfaceMessage"
import { useRouter } from "next/navigation"
import MainMessage from "@/src/app/(dashboard)/message/[roomId]/mainMessage"
import { useParams } from 'next/navigation'

export default function Message() {
    const { data: messages, isPending } = useMessageList();
    const router = useRouter();
    // const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
    const { user } = useUser();

    const params = useParams<{ roomId: string }>()
    const roomId = params!.roomId

    // Format thời gian ngắn gọn
    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Vừa xong';
        if (diffMins < 60) return `${diffMins} ph`;
        if (diffHours < 24) return `${diffHours} giờ`;
        if (diffDays < 7) return `${diffDays} ngày`;
        return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    };

    return (
        <div className="flex h-screen ml-[73px]">
            {/* danh sách hội thoại */}
            <div className="w-[350px] min-w-[350px] border-r border-gray-200 dark:border-neutral-800 flex flex-col bg-white dark:bg-black">
                {/* Header */}
                <div className="h-[60px] px-5 flex items-center justify-between border-b border-gray-200 dark:border-neutral-800">
                    <h2 className="text-xl font-bold dark:text-white">{user?.username}</h2>
                </div>

                {/* Danh sách cuộc trò chuyện */}
                <div className="flex-1 overflow-y-auto">
                    {isPending ? (
                        // Skeleton loading cho danh sách hội thoại
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-3 px-5 py-3 animate-pulse">
                                <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-neutral-700 flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 bg-gray-200 dark:bg-neutral-700 rounded w-24" />
                                    <div className="h-3 bg-gray-200 dark:bg-neutral-700 rounded w-40" />
                                </div>
                            </div>
                        ))
                    ) : messages && messages.length > 0 ? (
                        messages.map((msg: ListMessage) => (
                            <div
                                key={msg.roomId}
                                //event click lấy roomId
                                onClick={() => router.push(`/message/${msg.roomId}`)}
                                className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors
                                    ${String(roomId) === String(msg.roomId)
                                        ? 'bg-gray-100 dark:bg-neutral-800'
                                        : 'hover:bg-gray-50 dark:hover:bg-neutral-900'
                                    }`}
                            >
                                {/* Avatar */}
                                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-white dark:bg-neutral-700 flex-shrink-0">
                                    <Image
                                        src={msg.partner.avatarUrl || '/avatar_default.jpg'}
                                        alt={msg.partner?.userName || ''}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                    {/* Online dot
                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-black rounded-full" /> */}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                                        {msg.partner?.userName || 'Unknown'}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                        {msg.lastMessage?.content || 'Chưa có tin nhắn'}
                                        {msg.lastMessage?.createdAt && (
                                            <span className="text-gray-400 dark:text-gray-500"> · {formatTime(msg.lastMessage.createdAt)}</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 p-6">
                            <p className="text-sm">Chưa có cuộc trò chuyện nào</p>
                        </div>
                    )}
                </div>
            </div>

            {/* khung chat */}
            <div className="flex-1 flex flex-col bg-white dark:bg-black">
                {roomId ? (
                    <MainMessage />
                ) : (
                    /* Empty state - giống Instagram */
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="w-24 h-24 rounded-full border-[3px] border-gray-900 dark:border-white flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 text-gray-900 dark:text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-light dark:text-white mb-1">Tin nhắn của bạn</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                            Gửi ảnh và tin nhắn riêng tư cho bạn bè hoặc nhóm
                        </p>
                        <button className="px-4 py-2 bg-[#0095f6] text-white text-sm font-semibold rounded-lg hover:bg-[#1877f2] transition">
                            Gửi tin nhắn
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}