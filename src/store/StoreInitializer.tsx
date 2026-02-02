'use client';

import { useEffect } from 'react';
import { useUserStore } from './useUserStore';

// Component để khởi tạo user từ localStorage khi app load
// TanStack Query sẽ tự động fetch data khi cần
export function StoreInitializer({ children }: { children: React.ReactNode }) {
    const initializeUser = useUserStore(state => state.initializeUser);

    useEffect(() => {
        initializeUser();
    }, []);

    return <>{children}</>;
}
