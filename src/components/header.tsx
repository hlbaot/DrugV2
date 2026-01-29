import ModalMore from './modal_more'
import { useState, useEffect, useRef } from 'react'
import { searchUsers } from '@/src/api/API_search'
import { UserProfile } from '@/src/interfaces/userProfile'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// Mock notifications for mobile
const mockNotifications = [
    { id: 1, type: 'like', username: 'john_doe', avatar: '/avatar_default.jpg', message: 'liked your photo.', time: '2m' },
    { id: 2, type: 'follow', username: 'jane_smith', avatar: '/avatar_default.jpg', message: 'started following you.', time: '15m', isFollowing: true },
    { id: 3, type: 'comment', username: 'alex_wilson', avatar: '/avatar_default.jpg', message: 'commented: "Nice! 🔥"', time: '1h' },
    { id: 4, type: 'like', username: 'maria_garcia', avatar: '/avatar_default.jpg', message: 'liked your photo.', time: '3h' },
    { id: 5, type: 'follow', username: 'photo_lover', avatar: '/avatar_default.jpg', message: 'started following you.', time: '1d', isFollowing: false },
];

function Header() {
    const [modalMore, setModalMore] = useState(false)
    const [showNoti, setShowNoti] = useState(false)

    // Search State
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<UserProfile[]>([])
    const [loading, setLoading] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const router = useRouter()
    const searchRef = useRef<HTMLDivElement>(null)
    const notiRef = useRef<HTMLDivElement>(null)

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false)
            }
            if (notiRef.current && !notiRef.current.contains(event.target as Node)) {
                setShowNoti(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Debounce Search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim()) {
                setLoading(true)
                try {
                    const data = await searchUsers(query)
                    setResults(data)
                    setShowResults(true)
                } catch (err) {
                    console.error(err)
                } finally {
                    setLoading(false)
                }
            } else {
                setResults([])
                setShowResults(false)
            }
        }, 500)
        return () => clearTimeout(timer)
    }, [query])

    const handleClickUser = (username: string) => {
        router.push(`/${username}`)
        setShowResults(false)
        setQuery('')
    }

    return (
        <div className=" flex justify-around items-center w-[100%] h-[auto] fixed top-0 bg-white dark:bg-black lg:hidden py-2 border-b border-gray-300 dark:border-neutral-800 z-40">

            {/* search */}
            <div ref={searchRef} className="relative w-[50%]">
                <div className="bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-full flex justify-around items-center gap-2 px-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => { if (results.length > 0) setShowResults(true) }}
                        className="border-none h-full w-full rounded-full focus:outline-none focus:ring-0 bg-transparent text-black dark:text-white py-1"
                        placeholder="Search..."
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2 stroke-gray-500 dark:stroke-gray-400 shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>

                {/* Dropdown Results */}
                {showResults && (
                    <div className="absolute top-full mt-2 left-0 w-full bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-800 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                        {loading && <div className="p-2 text-center text-gray-500">Loading...</div>}
                        {!loading && results.length === 0 && <div className="p-2 text-center text-gray-500">No results</div>}
                        {!loading && results.map(user => (
                            <div
                                key={user.id}
                                onClick={() => handleClickUser(user.username)}
                                className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer"
                            >
                                <Image
                                    src={user.avatarUrl || '/avatar_default.jpg'}
                                    alt={user.username}
                                    width={32}
                                    height={32}
                                    className="rounded-full object-cover"
                                />
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-sm font-semibold truncate text-black dark:text-white">{user.username}</span>
                                    <span className="text-xs text-gray-500 truncate">{user.email || user.username}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* noti & more */}
            <div className="w-[35%] flex items-center justify-around text-black dark:text-white">
                {/* noti */}
                <div ref={notiRef} className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={`icon w-7 h-7 cursor-pointer ${showNoti ? 'stroke-[2.5px]' : ''}`}
                        onClick={() => setShowNoti(!showNoti)}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 0 0 
              5.454-1.31A8.967 8.967 0 0 1 
              18 9.75V9A6 6 0 0 0 6 9v.75a8.967 
              8.967 0 0 1-2.312 6.022c1.733.64 
              3.56 1.085 5.455 1.31m5.714 0a24.255 
              24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 
              1-5.714 0" />
                    </svg>

                    {/* Notification Dropdown - Centered on mobile */}
                    {showNoti && (
                        <div className="fixed top-14 left-4 right-4 mx-auto max-w-[350px] bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-800 rounded-xl shadow-xl max-h-[70vh] overflow-y-auto z-50">
                            <div className="p-4 border-b border-gray-200 dark:border-neutral-800">
                                <h3 className="font-bold text-lg text-black dark:text-white">Notifications</h3>
                            </div>
                            <div className="py-2">
                                {mockNotifications.map(noti => (
                                    <div key={noti.id} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer">
                                        <Image
                                            src={noti.avatar}
                                            alt={noti.username}
                                            width={40}
                                            height={40}
                                            className="rounded-full object-cover shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-black dark:text-white">
                                                <span className="font-semibold">{noti.username}</span>{' '}
                                                <span className="text-gray-600 dark:text-gray-400">{noti.message}</span>{' '}
                                                <span className="text-gray-400 text-xs">{noti.time}</span>
                                            </p>
                                        </div>
                                        {noti.type === 'follow' && (
                                            <button className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 ${noti.isFollowing
                                                ? 'bg-gray-200 dark:bg-neutral-700 text-black dark:text-white'
                                                : 'bg-blue-500 text-white'
                                                }`}>
                                                {noti.isFollowing ? 'Following' : 'Follow'}
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* more */}
                <div className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="icon w-7 h-7 cursor-pointer"
                        onClick={() => setModalMore(prev => !prev)}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 5.25h16.5m-16.5 
       4.5h16.5m-16.5 4.5h16.5m-16.5 
       4.5h16.5"
                        />
                    </svg>
                    {modalMore && <ModalMore className="absolute top-full mt-2 right-0" />}
                </div>

            </div>

        </div>
    )
}

export default Header