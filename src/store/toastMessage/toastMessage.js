import { create } from 'zustand';

export const useToastMessageStore = create((set) => ({
  visible: false,
  message: '',
  duration: 3000,
  type: 'default',

  showToast: (message, type = 'default', duration = 3000) => {
    set({ visible: true, message, type });

    setTimeout(() => {
      set({ visible: false, message: '', type: 'default' });
    }, duration);
  },

  handleCancel: () => {
    set({ visible: false, message: '', type: 'default' });
  },
}));
