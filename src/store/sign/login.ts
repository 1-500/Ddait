import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
  userLevel: number | null;
  token: string | null;
  socialEmail: string | null;
  setUserLevel: (level: number) => void;
  setToken: (token: string) => void;
  setSocialEmail: (email: string) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userLevel: null,
      token: null,
      socialEmail: null,
      setUserLevel: (level) => set({ userLevel: level }),
      setToken: (token) => set({ token }),
      setSocialEmail: (socialEmail) => set({ socialEmail }),
      clearUser: () => set({ userLevel: null, token: null, socialEmail: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useUserStore;
