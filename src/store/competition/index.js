import { create } from 'zustand';

const useCreateRoomStateStore = create((set) => ({
  title: '',
  maxMembers: 0,
  theme: '',
  competitionType: '',
  competitionTheme: '',
  startDate: { year: '', month: '', day: '' },
  endDate: { year: '', month: '', day: '' },
  isPrivate: false,
  hasSmartWatch: false,

  setTitle: (title) => set({ title }),
  setMaxMembers: (maxMembers) => set({ maxMembers }),
  setTheme: (theme) => set({ theme }),
  setCompetitionType: (competitionType) => set({ competitionType }),
  setCompetitionTheme: (competitionTheme) => set({ competitionTheme }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setIsPrivate: (isPrivate) => set({ isPrivate }),
  setHasSmartWatch: (hasSmartWatch) => set({ hasSmartWatch }),

  // 초기화
  resetState: () =>
    set({
      title: '',
      maxMembers: 0,
      theme: '',
      competitionType: '',
      competitionTheme: '',
      startDate: { year: '', month: '', day: '' },
      endDate: { year: '', month: '', day: '' },
      isPrivate: false,
      hasSmartWatch: false,
    }),
}));

export default useCreateRoomStateStore;
