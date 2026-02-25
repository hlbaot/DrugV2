export interface ListMessage {
    roomId: number;
    roomName: string | null;
    partner: {
        id: number;
        userName: string;
        avatarUrl: string | null;
    }
    lastMessage: {
        content: string;
        createdAt: string;
    } | null;
}

export interface MessageRoom {
    id: number;
    senderId: number;
    roomId: number;
    message: string;
    createdAt: string;
}

export interface CreateRoomRequest {
    partnerId: number;
}
