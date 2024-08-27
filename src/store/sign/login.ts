import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Token {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // 유효시간 (초 단위)
  expirationDate: Date; // 만료시간
}

interface UserState {
  userLevel: number | null;
  token: Token | null; // token을 객체로 변경
  socialEmail: string | null;
  userEmail: string | null;
  setUserLevel: (level: number) => void;
  setUserEmail: (email: string) => void;
  setToken: (token: Token) => void; // 메서드 타입 변경
  setSocialEmail: (email: string) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userLevel: null,
      token: null,
      socialEmail: null,
      userEmail: null,
      setUserEmail: (email) => set({ userEmail: email }),
      setUserLevel: (level) => set({ userLevel: level }),
      setToken: (token) => set({ token }), // 객체를 설정
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
