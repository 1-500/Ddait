import { create } from 'zustand';

import { getWeekOfMonth } from '../../../utils/date';

const today = new Date();

const useDiaryCalendarStore = create((set) => ({
  weekDays: [],
  selected: today.toISOString().split('T')[0],
  weekOfMonth: `${today.getMonth() + 1}월 ${getWeekOfMonth(today)}째주`,
  selectedDayInfo: today,
  selectedDate: today,

  setWeekDays: (weekDays) => set({ weekDays }),
  setSelected: (selected) => set({ selected }),
  setWeekOfMonth: (weekOfMonth) => set({ weekOfMonth }),
  setSelectedDayInfo: (selectedDayInfo) => set({ selectedDayInfo }),
  setSelectedDate: (selectedDate) => set({ selectedDate }),
}));

export default useDiaryCalendarStore;
