'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '@/interfaces/userProfile';
import { getUserProfile } from '@/api/API_getUserProfile';

interface ProfileContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const refreshProfile = async () => {
    try {
      const data = await getUserProfile();
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ userProfile, setUserProfile, refreshProfile }}>
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
