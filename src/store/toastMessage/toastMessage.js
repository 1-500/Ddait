import { create } from 'zustand';

export const useToastMessageStore = create((set) => ({
  visible: false,
  message: '',
  duration: 2000,
  type: 'default',
  position: 'top',

  showToast: (message, type = 'default', duration, position) => {
    set({ visible: true, message, type, position });

    setTimeout(() => {
      set({ visible: false, message: '', type: 'default', position: 'top' });
    }, duration);
  },

  handleCancel: () => {
    set({ visible: false, message: '', type: 'default', position: 'top' });
  },
}));
