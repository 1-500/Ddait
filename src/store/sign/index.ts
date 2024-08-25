import { create } from 'zustand';

interface UserFormState {
  email: string;
  password: string;
  confirmPassword: string;
  nickName: string;
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
  setNickName: (nickName: string) => void;
  setPosition: (latitude: number, longitude: number) => void;
  setPreferredSport: (sport: string) => void;
  setGender: (gender: string) => void;
  setSelectedDate: (date: { month: string; day: string; year: string }) => void;
}

const useUserFormStore = create<UserFormState>((set) => ({
  email: '',
  password: '',
  confirmPassword: '',
  nickName: '',
  position: { latitude: 0, longitude: 0 },
  preferredSport: '',
  gender: '',
  selectedDate: { month: '9', day: '17', year: '2021' },

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setNickName: (nickName) => set({ nickName }),
  setPosition: (latitude, longitude) => set({ position: { latitude, longitude } }),
  setPreferredSport: (preferredSport) => set({ preferredSport }),
  setGender: (gender) => set({ gender }),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
}));

export default useUserFormStore;
