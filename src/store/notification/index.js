import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  notificationList: [],
  setNotificationList: (notificationList) => {
    set({ notificationList });
  },
}));
