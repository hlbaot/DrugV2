'use client'
import React, { useState, useEffect, useRef } from 'react'
import { searchUsers } from '@/src/api/API_search'
import { UserProfile } from '@/src/interfaces/userProfile'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface SearchDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function SearchDrawer({ open, onClose }: SearchDrawerProps) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<UserProfile[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const drawerRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check if click is outside drawer and also not on the search button in navbar
            if (open && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                // Don't close if clicking on the search icon in navbar (has data-search-trigger attribute)
                const target = event.target as HTMLElement;
                if (!target.closest('[data-search-trigger]')) {
                    onClose();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, onClose]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim()) {
                setLoading(true)
                try {
                    const data = await searchUsers(query)
                    setResults(data)
                } catch (err) {
                    console.error(err)
                } finally {
                    setLoading(false)
                }
            } else {
                setResults([])
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [query])

    const handleClear = () => {
        setQuery('');
        setResults([]);
    }

    const handleClickUser = (username: string) => {
        router.push(`/${username}`);
        onClose(); // Optional: close drawer on selection
    }

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
            <div className="flex flex-col h-full p-6">
                <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white">Search</h2>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="
                            w-full bg-gray-100 dark:bg-neutral-800 
                            rounded-lg px-4 py-2 pl-10 
                            outline-none text-black dark:text-white
                            placeholder-gray-500
                        "
                    />
                    {/* Search Icon */}
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>

                    {/* Clear Icon */}
                    {query && (
                        <div
                            onClick={handleClear}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer bg-gray-200 dark:bg-neutral-700 rounded-full p-0.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-black dark:text-white">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-200 dark:border-neutral-800 my-2"></div>

                <div className="flex-1 overflow-y-auto">
                    {loading && <div className="text-center text-gray-500 mt-4">Loading...</div>}

                    {!loading && results.length === 0 && query && (
                        <div className="text-center text-gray-500 mt-4">No results found.</div>
                    )}

                    {!loading && results.length > 0 && (
                        <div className="flex flex-col gap-2 mt-2">
                            {results.map(user => (
                                <div
                                    key={user.id}
                                    onClick={() => handleClickUser(user.username)}
                                    className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-neutral-900 cursor-pointer rounded-lg"
                                >
                                    <Image
                                        src={user.avatarUrl || '/avatar_default.jpg'}
                                        alt={user.username}
                                        width={44}
                                        height={44}
                                        className="rounded-full object-cover border border-gray-200 dark:border-neutral-800"
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-sm text-black dark:text-white">{user.username}</span>
                                        <span className="text-gray-500 text-xs">{user.email || user.username}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
