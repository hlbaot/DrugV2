'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface NotificationDrawerProps {
    open: boolean;
    onClose: () => void;
}

// Mock data for notifications
const mockNotifications = [
    {
        id: 1,
        type: 'like',
        username: 'john_doe',
        avatar: '/avatar_default.jpg',
        message: 'liked your photo.',
        time: '2m',
        postImage: '/avatar_default.jpg',
        isFollowing: false,
    },
    {
        id: 2,
        type: 'follow',
        username: 'jane_smith',
        avatar: '/avatar_default.jpg',
        message: 'started following you.',
        time: '15m',
        postImage: null,
        isFollowing: true,
    },
    {
        id: 3,
        type: 'comment',
        username: 'alex_wilson',
        avatar: '/avatar_default.jpg',
        message: 'commented: "Nice shot! 🔥"',
        time: '1h',
        postImage: '/avatar_default.jpg',
        isFollowing: true,
    },
    {
        id: 4,
        type: 'like',
        username: 'maria_garcia',
        avatar: '/avatar_default.jpg',
        message: 'liked your photo.',
        time: '3h',
        postImage: '/avatar_default.jpg',
        isFollowing: false,
    },
    {
        id: 5,
        type: 'mention',
        username: 'dev_master',
        avatar: '/avatar_default.jpg',
        message: 'mentioned you in a comment.',
        time: '5h',
        postImage: '/avatar_default.jpg',
        isFollowing: true,
    },
    {
        id: 6,
        type: 'follow',
        username: 'photo_lover',
        avatar: '/avatar_default.jpg',
        message: 'started following you.',
        time: '1d',
        postImage: null,
        isFollowing: false,
    },
    {
        id: 7,
        type: 'like',
        username: 'travel_bug',
        avatar: '/avatar_default.jpg',
        message: 'and 5 others liked your photo.',
        time: '2d',
        postImage: '/avatar_default.jpg',
        isFollowing: true,
    },
];

export default function NotificationDrawer({ open, onClose }: NotificationDrawerProps) {
    const drawerRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (open && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                const target = event.target as HTMLElement;
                if (!target.closest('[data-noti-trigger]')) {
                    onClose();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, onClose]);

    return (
        <div
            ref={drawerRef}
            className={`
            hidden lg:block
            fixed top-0 bottom-0 left-0 z-[60]
            w-[397px] bg-white dark:bg-black
            border-r border-gray-300 dark:border-neutral-800
            shadow-xl
            transition-transform duration-300 ease-in-out
            rounded-r-2xl
            ${open ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 pb-2">
                    <h2 className="text-2xl font-bold text-black dark:text-white">Notifications</h2>
                </div>

                {/* Sections */}
                <div className="flex-1 overflow-y-auto px-2">
                    {/* Today Section */}
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold px-4 py-2 text-black dark:text-white">Today</h3>
                        {mockNotifications.filter(n => n.time.includes('m') || n.time.includes('h')).map(notification => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </div>

                    {/* This Week Section */}
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold px-4 py-2 text-black dark:text-white">This Week</h3>
                        {mockNotifications.filter(n => n.time.includes('d')).map(notification => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Notification Item Component
function NotificationItem({ notification }: { notification: typeof mockNotifications[0] }) {
    return (
        <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-900 cursor-pointer rounded-lg">
            {/* Avatar */}
            <Image
                src={notification.avatar}
                alt={notification.username}
                width={44}
                height={44}
                className="rounded-full object-cover border border-gray-200 dark:border-neutral-800 shrink-0"
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p className="text-sm text-black dark:text-white">
                    <span className="font-semibold">{notification.username}</span>{' '}
                    <span className="text-gray-700 dark:text-gray-300">{notification.message}</span>{' '}
                    <span className="text-gray-500">{notification.time}</span>
                </p>
            </div>

            {/* Right Side - Post thumbnail or Follow button */}
            {notification.type === 'follow' ? (
                <button className={`px-4 py-1.5 rounded-lg text-sm font-semibold shrink-0 ${notification.isFollowing
                    ? 'bg-gray-200 dark:bg-neutral-700 text-black dark:text-white'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}>
                    {notification.isFollowing ? 'Following' : 'Follow'}
                </button>
            ) : notification.postImage ? (
                <Image
                    src={notification.postImage}
                    alt="post"
                    width={44}
                    height={44}
                    className="rounded object-cover shrink-0"
                />
            ) : null}
        </div>
    )
}
