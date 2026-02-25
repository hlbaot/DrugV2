'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '@/src/lib/queryClient';

/**
 * Provider cho TanStack Query
 * 
 * Bao gồm ReactQueryDevtools để debug trong dev mode.
 * DevTools chỉ hiển thị trong development, tự động ẩn trong production.
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* <ReactQueryDevtools initialIsOpen={true} /> debug call api */}
        </QueryClientProvider>
    );
}
