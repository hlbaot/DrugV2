'use client';

import { useUserStore } from './useUserStore';

/**
 * Component để đợi store hydrate từ localStorage trước khi render children.
 * Với persist middleware, việc khởi tạo user từ localStorage đã được tự động xử lý.
 * Component này chỉ cần đợi hydration hoàn tất để tránh lỗi hydration mismatch.
 */
export function StoreInitializer({ children }: { children: React.ReactNode }) {
    const hasHydrated = useUserStore(state => state._hasHydrated);

    if (!hasHydrated) {
        return null;
    }

    return <>{children}</>;
}
