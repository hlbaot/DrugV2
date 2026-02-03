'use client';

import * as React from 'react';
import { Modal, Box, Avatar, IconButton, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { FollowItem } from '@/src/interfaces/userProfile';
import { API_ListFollowers, API_ListFollowing, API_Follow, API_Unfollow } from '@/src/api/API_userProfile';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/src/store/useProfileStore';
import { useUser } from '@/src/store/useUserStore';

type ModalType = 'followers' | 'following';

interface ModalFollowListProps {
    open: boolean;
    onClose: () => void;
    username: string;
    type: ModalType;
    isMyProfile?: boolean;
}

export default function ModalFollowList({
    open,
    onClose,
    username,
    type,
    isMyProfile = false,
}: ModalFollowListProps) {
    const [list, setList] = React.useState<FollowItem[]>([]);
    const [filteredList, setFilteredList] = React.useState<FollowItem[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [loadingIds, setLoadingIds] = React.useState<Set<number>>(new Set());

    const router = useRouter();
    const { refreshMyProfile, refreshViewedProfile } = useProfile();
    const { user } = useUser();

    // Tải dữ liệu khi mở modal
    React.useEffect(() => {
        if (!open) return;
        fetchList();
        setSearchQuery('');
    }, [open, type, username]);

    // Lọc danh sách khi tìm kiếm
    React.useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredList(list);
        } else {
            const query = searchQuery.toLowerCase();
            setFilteredList(list.filter(item =>
                item.username.toLowerCase().includes(query)
            ));
        }
    }, [searchQuery, list]);

    const fetchList = async () => {
        try {
            setLoading(true);
            if (type === 'followers') {
                const res = await API_ListFollowers(username);
                setList(res.followers || []);
            } else {
                const res = await API_ListFollowing(username);
                setList(res.followings || []);
            }
        } catch (err) {
            console.error(`Error loading ${type}`, err);
        } finally {
            setLoading(false);
        }
    };

    const handleFollowToggle = async (item: FollowItem) => {
        setLoadingIds(prev => new Set(prev).add(item.id));
        try {
            if (item.isFollowing) {
                await API_Unfollow(item.id);
            } else {
                await API_Follow(item.id);
            }
            // Cập nhật trạng thái follow
            setList(prev => prev.map(i =>
                i.id === item.id ? { ...i, isFollowing: !i.isFollowing } : i
            ));
            // Làm mới số lượng followers/following
            if (isMyProfile) {
                refreshMyProfile();
            } else {
                refreshViewedProfile(username);
            }
        } catch (err) {
            console.error('Follow/unfollow error', err);
        } finally {
            setLoadingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(item.id);
                return newSet;
            });
        }
    };

    const handleRemoveFollower = async (item: FollowItem) => {
        // TODO: Thêm API xóa follower khi backend hỗ trợ
        console.log('Remove follower:', item.username);
    };

    const handleUserClick = (itemUsername: string) => {
        onClose();
        router.push(`/${itemUsername}`);
    };

    const title = type === 'followers' ? 'Followers' : 'Following';

    return (
        <Modal open={open} onClose={onClose}>
            <Wrapper>
                {/* Tiêu đề */}
                <div className="header">
                    <span className="title">{title}</span>
                    <IconButton
                        onClick={onClose}
                        size="small"
                        className="close-btn"
                        sx={{ color: 'inherit' }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </div>

                {/* Thanh tìm kiếm
                <div className="search-wrapper">
                    <SearchIcon className="search-icon" />
                    <InputBase
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                        fullWidth
                    />
                </div> */}

                {/* Danh sách người dùng */}
                <div className="list">
                    {loading && <p className="empty">Loading...</p>}

                    {!loading && filteredList.length === 0 && (
                        <p className="empty">
                            {searchQuery ? 'No results found' :
                                type === 'followers' ? 'No followers yet' : 'Not following anyone'}
                        </p>
                    )}

                    {!loading && filteredList.map((item) => (
                        <div key={item.id} className="item">
                            <div
                                className="left"
                                onClick={() => handleUserClick(item.username)}
                            >
                                <Avatar
                                    src={item.avatar}
                                    sx={{ width: 44, height: 44 }}
                                />
                                <div className="user-info">
                                    <span className="username">{item.username}</span>
                                </div>
                            </div>

                            {/* Nút theo dõi/đang theo dõi/xóa */}
                            {item.username !== user?.username && (
                                type === 'followers' && isMyProfile ? (
                                    <button
                                        className="action-btn remove"
                                        onClick={() => handleRemoveFollower(item)}
                                    >
                                        Remove
                                    </button>
                                ) : (
                                    <button
                                        className={`action-btn ${item.isFollowing ? 'following' : 'follow'}`}
                                        onClick={() => handleFollowToggle(item)}
                                        disabled={loadingIds.has(item.id)}
                                    >
                                        {loadingIds.has(item.id)
                                            ? '...'
                                            : item.isFollowing
                                                ? 'Following'
                                                : 'Follow'}
                                    </button>
                                )
                            )}
                        </div>
                    ))}
                </div>
            </Wrapper>
        </Modal>
    );
}

const Wrapper = styled(Box)(({ theme }) => {
    const isDark = theme.palette.mode === 'dark';

    const bg = isDark ? '#262626' : '#ffffff';
    const headerBorder = isDark ? '#363636' : '#dbdbdb';
    const textPrimary = isDark ? '#f5f5f5' : '#262626';
    const textSecondary = isDark ? '#a8a8a8' : '#737373';
    const searchBg = isDark ? '#363636' : '#efefef';
    const itemHover = isDark ? '#1a1a1a' : '#fafafa';
    const followBtnBg = '#0095f6';
    const followingBtnBg = isDark ? '#363636' : '#efefef';
    const removeBtnBg = isDark ? '#363636' : '#efefef';

    return ({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

        width: 400,
        maxWidth: '90vw',
        maxHeight: '70vh',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: bg,
        outline: 'none',

        '.header': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '12px 16px',
            borderBottom: `1px solid ${headerBorder}`,

            '.title': {
                fontSize: '16px',
                fontWeight: 700,
                color: textPrimary,
            },

            '.close-btn': {
                position: 'absolute',
                right: '12px',
                color: textPrimary,
            },
        },

        '.search-wrapper': {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderBottom: `1px solid ${headerBorder}`,

            '.search-icon': {
                color: textSecondary,
                fontSize: '20px',
            },

            '.search-input': {
                backgroundColor: searchBg,
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '14px',
                color: textPrimary,

                '& input::placeholder': {
                    color: textSecondary,
                    opacity: 1,
                },
            },
        },

        '.list': {
            overflowY: 'auto',
            flex: 1,
            padding: '8px 0',

            // Tùy chỉnh thanh cuộn
            scrollbarWidth: 'thin',
            scrollbarColor: `${isDark ? '#363636' : '#dbdbdb'} transparent`,
            '&::-webkit-scrollbar': {
                width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
                background: isDark ? '#363636' : '#dbdbdb',
                borderRadius: 3,
            },
            '&::-webkit-scrollbar-track': {
                background: 'transparent',
            },
        },

        '.item': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 16px',
            transition: 'background-color 150ms ease',

            '&:hover': {
                backgroundColor: itemHover,
            },
        },

        '.left': {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            flex: 1,
            minWidth: 0,
        },

        '.user-info': {
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
        },

        '.username': {
            fontSize: '14px',
            fontWeight: 600,
            color: textPrimary,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },

        '.action-btn': {
            padding: '7px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            transition: 'all 150ms ease',
            flexShrink: 0,

            '&:disabled': {
                opacity: 0.7,
                cursor: 'not-allowed',
            },

            '&.follow': {
                backgroundColor: followBtnBg,
                color: '#ffffff',

                '&:hover:not(:disabled)': {
                    backgroundColor: '#1877f2',
                },
            },

            '&.following': {
                backgroundColor: followingBtnBg,
                color: textPrimary,

                '&:hover:not(:disabled)': {
                    backgroundColor: isDark ? '#404040' : '#dbdbdb',
                },
            },

            '&.remove': {
                backgroundColor: removeBtnBg,
                color: textPrimary,

                '&:hover': {
                    backgroundColor: isDark ? '#404040' : '#dbdbdb',
                },
            },
        },

        '.empty': {
            textAlign: 'center',
            padding: '32px 16px',
            color: textSecondary,
            fontSize: '14px',
        },
    });
});
