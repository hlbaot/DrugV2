'use client';

import { useQuery } from '@tanstack/react-query';
import { getListMessage, getMessageById } from '@/src/api/API_Message';
import { ListMessage, MessageRoom } from '@/src/interfaces/InterfaceMessage';

/**
 * TANSTACK QUERY - Hooks lấy dữ liệu Messages
 */

// Query Keys - định danh duy nhất cho mỗi loại data trong cache
export const messageKeys = {
    all: ['messages'] as const,
    list: () => [...messageKeys.all, 'list'] as const,
    room: (id: string) => [...messageKeys.all, 'room', id] as const,
};

// Lấy danh sách tin nhắn (conversations)
export function useMessageList() {
    return useQuery<ListMessage[]>({
        queryKey: messageKeys.list(),
        queryFn: getListMessage,
        staleTime: 1000 * 30,
    });
}

// Lấy tin nhắn trong một room cụ thể
export function useMessageRoom(roomId: string) {
    return useQuery<MessageRoom[]>({
        queryKey: messageKeys.room(roomId),
        queryFn: () => getMessageById(roomId),
        enabled: !!roomId,
        staleTime: 1000 * 10,
    });
}

