'use client'
import { useEffect, useRef } from 'react'
import { useSocketMsg } from '@/src/hooks/useSocketMessage'
import { MessageRoom } from '@/src/interfaces/InterfaceMessage'

type IncomingSocketMessage =
    | MessageRoom
    | {
        roomId?: number | string;
        message?: MessageRoom;
    };

const normalizeIncomingMessage = (data: IncomingSocketMessage): MessageRoom | null => {
    if (!data || typeof data !== 'object') return null;

    if ('id' in data && 'senderId' in data && 'roomId' in data) {
        const msg = data as MessageRoom;
        return {
            ...msg,
            senderId: Number(msg.senderId),
            createdAt: msg.createdAt || new Date().toISOString(),
        };
    }

    if ('message' in data && data.message) {
        const msg = data.message;
        return {
            ...msg,
            roomId: msg.roomId ?? Number(data.roomId),
            senderId: Number(msg.senderId),
            createdAt: msg.createdAt || new Date().toISOString(),
        };
    }

    return null;
};

export const useMessageSocket = (roomId: string, onNewMessage: (m: MessageRoom) => void) => {
    const socketMsg = useSocketMsg();
    const onNewMessageRef = useRef(onNewMessage);

    useEffect(() => {
        onNewMessageRef.current = onNewMessage;
    }, [onNewMessage]);

    useEffect(() => {
        if (!socketMsg || !roomId) return;

        socketMsg.emit('join-room', { roomId: Number(roomId) });

        const handleConnect = () => {
            socketMsg.emit('join-room', { roomId: Number(roomId) });
        };

        const handleNewMessage = (data: IncomingSocketMessage) => {
            const normalized = normalizeIncomingMessage(data);
            if (!normalized) return;
            if (String(normalized.roomId) !== String(roomId)) return;
            onNewMessageRef.current(normalized);
        };

        socketMsg.on('connect', handleConnect);
        socketMsg.on('new-message', handleNewMessage);

        return () => {
            socketMsg.emit('leave-room', { roomId: Number(roomId) });
            socketMsg.off('connect', handleConnect);
            socketMsg.off('new-message', handleNewMessage);
        };
    }, [roomId, socketMsg]);

    const sendMessage = (message: string) => {
        socketMsg.emit('send-message', { roomId: Number(roomId), message });
    };

    return { sendMessage };
};
