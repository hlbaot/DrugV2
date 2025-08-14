'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '@/interfaces/userProfile';
import { getUserProfile } from '@/api/API_getUserProfile';

interface ProfileContextType {
    userProfile: UserProfile | null;
    setUserProfile: (profile: UserProfile) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await getUserProfile();
                console.log('✅ Fetched profile:', data); // 👈 log toàn bộ profile
                console.log('📝 Posts:', data.posts); // 👈 log riêng posts
                setUserProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        loadProfile();
    }, []);

    return (
        <ProfileContext.Provider value={{ userProfile, setUserProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
};
