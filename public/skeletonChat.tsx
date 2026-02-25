'use client';

export default function ChatSkeleton() {
    return (
        <div className="flex-1 flex flex-col animate-pulse">
            {/* Header skeleton */}
            <div className="h-[60px] px-5 flex items-center gap-3 border-b border-gray-200 dark:border-neutral-800">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-neutral-700" />
                <div className="flex flex-col gap-2">
                    <div className="w-28 h-4 rounded-md bg-gray-200 dark:bg-neutral-700" />
                    <div className="w-20 h-3 rounded-md bg-gray-100 dark:bg-neutral-800" />
                </div>
            </div>

            {/* Messages skeleton */}
            <div className="flex-1 px-5 py-4 flex flex-col gap-4">
                {/* Profile header skeleton (avatar + name center) */}
                <div className="flex flex-col items-center mb-4 mt-4">
                    <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-neutral-700 mb-3" />
                    <div className="w-24 h-5 rounded-md bg-gray-200 dark:bg-neutral-700 mb-1" />
                    <div className="w-16 h-3 rounded-md bg-gray-100 dark:bg-neutral-800 mt-1" />
                    <div className="w-32 h-8 rounded-lg bg-gray-100 dark:bg-neutral-800 mt-3" />
                </div>

                {/* Incoming message */}
                <div className="flex justify-start">
                    <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-neutral-700 mr-2 flex-shrink-0" />
                    <div className="w-[45%] h-10 rounded-[22px] rounded-bl-[4px] bg-gray-100 dark:bg-neutral-800" />
                </div>

                {/* Outgoing message */}
                <div className="flex justify-end">
                    <div className="w-[40%] h-10 rounded-[22px] rounded-br-[4px] bg-blue-100 dark:bg-blue-900/30" />
                </div>

                {/* Incoming message long */}
                <div className="flex justify-start">
                    <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-neutral-700 mr-2 flex-shrink-0" />
                    <div className="w-[55%] h-10 rounded-[22px] rounded-bl-[4px] bg-gray-100 dark:bg-neutral-800" />
                </div>

                {/* Outgoing message short */}
                <div className="flex justify-end">
                    <div className="w-[30%] h-10 rounded-[22px] rounded-br-[4px] bg-blue-100 dark:bg-blue-900/30" />
                </div>
            </div>

            {/* Input bar skeleton */}
            <div className="px-5 py-3 border-t border-gray-200 dark:border-neutral-800">
                <div className="flex items-center gap-3 bg-gray-100 dark:bg-neutral-800 rounded-full px-4 py-2 border border-gray-200 dark:border-neutral-700">
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-neutral-700" />
                    <div className="flex-1 h-5 rounded-md bg-gray-200 dark:bg-neutral-700" />
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-neutral-700" />
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-neutral-700" />
                </div>
            </div>
        </div>
    );
}
