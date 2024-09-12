import { Dimensions, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { create } from 'zustand';

const { height } = Dimensions.get('window');

const getTopOffset = () => {
  if (Platform.OS === 'ios') {
    if (height >= 812) {
      return 80;
    }
    return 50;
  }
  return 30;
};

const getBottomOffset = () => {
  if (Platform.OS === 'ios') {
    return 80;
  }
  return 30;
};

export const useToastMessageStore = create((set) => ({
  /**
   * Toast 메시지를 화면에 표시합니다.
   * @param {string} message - 표시할 메시지 내용
   * @param {'success' | 'error' | 'default'} [type='default'] - Toast의 타입 ('success', 'error', 'default')
   * @param {number} [duration=2000] - Toast가 표시될 시간 (밀리초 단위)
   * @param {'top' | 'bottom'} [position='top'] - Toast가 표시될 위치 ('top' 또는 'bottom')
   * @param {number} offSetValue - Toast의 위치 오프셋 (위치 조정, top 또는 bottom 기준)
   *
   * @example
   * // 성공 메시지를 3초 동안 화면 상단에 표시
   * showToast('저장되었습니다.', 'success', 3000, 'top', 50);
   *
   * @example
   * // 오류 메시지를 2초 동안 화면 하단에 표시
   * showToast('오류가 발생했습니다.', 'error', 2000, 'bottom', 100);
   */

  showToast: (message, type = 'default', duration = 2000, position = 'top', offSetValue) => {
    let toastConfig = {
      type: type, // 'success', 'error'
      text1: message, // 메인 텍스트
      position: position, // 'top', 'bottom'
      visibilityTime: duration, // 토스트 표시 시간
    };

    if (position === 'top') {
      toastConfig.topOffset = offSetValue || getTopOffset();
    } else {
      toastConfig.bottomOffset = offSetValue || getBottomOffset();
    }

    Toast.show(toastConfig);
  },
  hideToast: () => {
    Toast.hide();
  },
}));
