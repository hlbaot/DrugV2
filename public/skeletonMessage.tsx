'use client';
import styled from 'styled-components';

export default function MessageSkeleton() {
    return (
        <Wrapper>
            {/* LEFT: Chat List Skeleton */}
            <aside className="sidebar">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="chat-item">
                        <div className="avatar skeleton" />
                        <div className="chat-info">
                            <div className="line name skeleton" />
                            <div className="line message skeleton" />
                        </div>
                    </div>
                ))}
            </aside>

            {/* RIGHT: Chat Window Skeleton */}
            <main className="chat-window">
                {/* Header */}
                <div className="chat-header">
                    <div className="avatar-sm skeleton" />
                    <div className="line header-name skeleton" />
                </div>

                {/* Messages */}
                <div className="messages">
                    {/* Incoming */}
                    <div className="msg incoming">
                        <div className="bubble skeleton" />
                    </div>

                    {/* Outgoing */}
                    <div className="msg outgoing">
                        <div className="bubble skeleton" />
                    </div>

                    <div className="msg incoming">
                        <div className="bubble long skeleton" />
                    </div>

                    <div className="msg outgoing">
                        <div className="bubble short skeleton" />
                    </div>
                </div>

                {/* Input */}
                <div className="input-area">
                    <div className="input-box skeleton" />
                    <div className="send-btn skeleton" />
                </div>
            </main>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    margin-left: 73px;

    /* 🟣 DARK MODE SUPPORT */
    .dark & {
        background: #111111;
    }

    /* SIDEBAR */
    .sidebar {
        width: 30%;
        border-right: 1px solid #e5e7eb;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .dark & .sidebar {
        border-color: #333333;
    }

    .chat-item {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .chat-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    /* CHAT WINDOW */
    .chat-window {
        width: 70%;
        display: flex;
        flex-direction: column;
    }

    .chat-header {
        height: 64px;
        border-bottom: 1px solid #e5e7eb;
        padding: 0 16px;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .dark & .chat-header {
        border-color: #333333;
    }

    .messages {
        flex: 1;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .msg {
        display: flex;
    }

    .msg.outgoing {
        justify-content: flex-end;
    }

    .input-area {
        height: 64px;
        border-top: 1px solid #e5e7eb;
        padding: 0 16px;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .dark & .input-area {
        border-color: #333333;
    }

    /* ELEMENTS */
    .avatar {
        width: 48px;
        height: 48px;
        border-radius: 9999px;
    }

    .avatar-sm {
        width: 40px;
        height: 40px;
        border-radius: 9999px;
    }

    .line {
        border-radius: 8px;
        height: 14px;
    }

    .line.name {
        width: 75%;
        height: 16px;
    }

    .line.message {
        width: 50%;
        height: 12px;
    }

    .line.header-name {
        width: 128px;
        height: 16px;
    }

    .bubble {
        height: 40px;
        width: 45%;
        border-radius: 20px;
    }

    .bubble.long {
        width: 50%;
    }

    .bubble.short {
        width: 30%;
    }

    .input-box {
        flex: 1;
        height: 40px;
        border-radius: 9999px;
    }

    .send-btn {
        width: 40px;
        height: 40px;
        border-radius: 9999px;
    }

    /* 💫 SKELETON ANIMATION FOR LIGHT MODE */
    .skeleton {
        background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
        background-size: 200% 100%;
        animation: shimmer 1.2s ease-in-out infinite;
    }

    /* 💫 DARK MODE SKELETON */
    .dark & .skeleton {
        background: linear-gradient(
            90deg,
            #2a2a2a 25%,
            #3a3a3a 50%,
            #2a2a2a 75%
        );
    }

    /* SHIMMER EFFECT */
    @keyframes shimmer {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
`;
