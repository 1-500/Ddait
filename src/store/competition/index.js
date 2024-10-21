import dayjs from 'dayjs';
import { create } from 'zustand';

const useCreateRoomStateStore = create((set) => ({
  title: '',
  maxMembers: 0,
  theme: '',
  competitionType: '',
  competitionTheme: '',
  startDate: dayjs().add(1, 'day').toDate(),
  endDate: dayjs().add(8, 'day').toDate(),
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
      startDate: dayjs().add(1, 'day').toDate(),
      endDate: dayjs().add(8, 'day').toDate(),
      isPrivate: false,
      hasSmartWatch: false,
    }),
}));

export const useCompetitionStore = create((set) => ({
  competitionList: [],
  setCompetitionList: (competitionList) => set({ competitionList }),
}));

export default useCreateRoomStateStore;
