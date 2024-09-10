import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// 이제 토큰 굳이 필요없을듯 유저에대한 정보를 저장하는것으로 바꾸기
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
  userId: string | null;
  nickname: string | null;
  profileImageUrl: string | null;
  introduce: string | null;
  setUserLevel: (level: number) => void;
  setUserEmail: (email: string) => void;
  setUserId: (id: string) => void;
  setToken: (token: Token) => void; // 메서드 타입 변경
  setSocialEmail: (email: string) => void;
  setNickname: (nickname: string) => void;
  setProfileImageUrl: (url: string) => void;
  setIntroduce: (introduce: string) => void;
  setUserInfo: (userInfo: Partial<UserState>) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userLevel: null,
      token: null,
      socialEmail: null,
      userEmail: null,
      userId: null,
      nickname: null,
      profileImageUrl: null,
      introduce: null,
      setUserEmail: (email) => set({ userEmail: email }),
      setUserId: (id) => set({ userId: id }),
      setUserLevel: (level) => set({ userLevel: level }),
      setToken: (token) => set({ token }), // 객체를 설정
      setSocialEmail: (socialEmail) => set({ socialEmail }),
      setNickname: (nickname) => set({ nickname }),
      setProfileImageUrl: (url) => set({ profileImageUrl: url }),
      setIntroduce: (introduce) => set({ introduce }),
      setUserInfo: (userInfo) => set(userInfo),
      clearUser: () =>
        set({
          userLevel: null,
          token: null,
          socialEmail: null,
          userEmail: null,
          userId: null,
          nickname: null,
          profileImageUrl: null,
          introduce: null,
        }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useUserStore;
