import { create } from 'zustand';

interface UserFormState {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  position: {
    latitude: number;
    longitude: number;
  };
  preferredSport: string;
  gender: string;
  selectedDate: {
    month: string;
    day: string;
    year: string;
  };
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setNickName: (nickname: string) => void;
  setPosition: (latitude: number, longitude: number) => void;
  setPreferredSport: (sport: string) => void;
  setGender: (gender: string) => void;
  setSelectedDate: (date: { month: string; day: string; year: string }) => void;
  clearForm: () => void; // 상태를 클리어하는 메서드 추가
}

const useUserFormStore = create<UserFormState>((set) => ({
  email: '',
  password: '',
  confirmPassword: '',
  nickname: '',
  position: { latitude: 0, longitude: 0 },
  preferredSport: '',
  gender: '',
  selectedDate: { month: '09', day: '17', year: '2021' },

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setNickName: (nickname) => set({ nickname }),
  setPosition: (latitude, longitude) => set({ position: { latitude, longitude } }),
  setPreferredSport: (preferredSport) => set({ preferredSport }),
  setGender: (gender) => set({ gender }),
  setSelectedDate: (selectedDate) => set({ selectedDate }),

  clearForm: () =>
    set({
      // 상태를 초기값으로 재설정
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      position: { latitude: 0, longitude: 0 },
      preferredSport: '',
      gender: '',
      selectedDate: { month: '09', day: '17', year: '2021' },
    }),
}));

export default useUserFormStore;
