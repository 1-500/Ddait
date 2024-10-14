import create from 'zustand';

const useUserFormStore = create((set) => ({
  email: '',
  password: '',
  confirmPassword: '',
  nickname: '',
  position: { latitude: 0, longitude: 0 },
  preferredSport: '',
  gender: '',
  selectedDate: { month: '09', day: '17', year: '2021' },
  tosAgreement: false, // 약관 동의 상태

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setNickName: (nickname) => set({ nickname }),
  setPosition: (latitude, longitude) => set({ position: { latitude, longitude } }),
  setPreferredSport: (preferredSport) => set({ preferredSport }),
  setGender: (gender) => set({ gender }),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  setTosAgreement: (agreement) => set({ tosAgreement: agreement }),

  clearForm: () =>
    set({
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      position: { latitude: 0, longitude: 0 },
      preferredSport: '',
      gender: '',
      selectedDate: { month: '09', day: '17', year: '2021' },
      tosAgreement: false,
    }),
}));

export default useUserFormStore;
