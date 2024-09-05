import Toast from 'react-native-toast-message';
import { create } from 'zustand';

// export const useToastMessageStore = create((set) => ({
//   visible: false,
//   message: '',
//   duration: 2000,
//   type: 'default',
//   position: 'top',

//   showToast: (message, type = 'default', duration, position) => {
//     set({ visible: true, message, type, position });

//     setTimeout(() => {
//       set({ visible: false, message: '', type: 'default', position: 'top' });
//     }, duration);
//   },

//   handleCancel: () => {
//     set({ visible: false, message: '', type: 'default', position: 'top' });
//   },
// }));

export const useToastMessageStore = create((set) => ({
  showToast: (message, type = 'default', duration = 2000, position = 'top', offSetValue) => {
    let toastConfig = {
      type: type, // 'success', 'error', or 'info' 등 설정 가능
      text1: message, // 메인 텍스트
      position: position, // 'top', 'bottom'
      visibilityTime: duration, // 토스트 표시 시간
    };

    if (position === 'top') {
      toastConfig.topOffset = offSetValue;
    } else {
      toastConfig.bottomOffset = offSetValue;
    }

    Toast.show(toastConfig);
  },
  hideToast: () => {
    Toast.hide();
  },
}));
