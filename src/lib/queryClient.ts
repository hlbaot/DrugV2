'use client';

import { QueryClient } from '@tanstack/react-query';

/**
 * TANSTACK QUERY CLIENT - Cấu hình cache và fetch behavior
 * 
 * QueryClient là "bộ não" quản lý cache của TanStack Query.
 * Cấu hình này áp dụng cho toàn bộ app.
 */

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,       // Data "tươi" trong 60 giây - không fetch lại
                gcTime: 5 * 60 * 1000,      // Giữ cache 5 phút khi không dùng
                retry: 1,                    // Thử lại 1 lần nếu request lỗi
                refetchOnWindowFocus: false, // Không fetch lại khi user quay lại tab
            },
        },
    });
}

// Biến lưu instance duy nhất trên browser
let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
    if (typeof window === 'undefined') {
        // Server: tạo mới cho mỗi request (tránh share data giữa các users)
        return makeQueryClient();
    } else {
        // Browser: dùng 1 instance duy nhất (singleton) để share cache giữa các component
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}
