import { create } from 'zustand';

import { getWeekOfMonth } from '../../../utils/date';
const DIARY_TYPES = ['웨이트', '러닝', '식단', '등산'];

const today = new Date();

const useDiaryCalendarStore = create((set) => ({
  weekDays: [],
  selected: today.toISOString().split('T')[0],
  weekOfMonth: `${today.getMonth() + 1}월 ${getWeekOfMonth(today)}주차`,
  selectedDayInfo: today,
  selectedDate: today,

  types: DIARY_TYPES,
  activeType: '웨이트',

  setWeekDays: (weekDays) => set({ weekDays }),
  setSelected: (selected) => set({ selected }),
  setWeekOfMonth: (weekOfMonth) => set({ weekOfMonth }),
  setSelectedDayInfo: (selectedDayInfo) => set({ selectedDayInfo }),
  setSelectedDate: (selectedDate) => set({ selectedDate }),

  setTypes: (types) => set({ types }),
  setActiveType: (activeType) => set({ activeType }),
}));

export default useDiaryCalendarStore;
