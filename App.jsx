if (__DEV__) {
  require('./ReactotronConfig');
}
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import { TEXT_COLORS } from './src/constants/colors';
import { FONTS } from './src/constants/font';
import Router from './src/router';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#13C670', backgroundColor: 'rgba(60,60,60,1)' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        color: TEXT_COLORS.primary,
        fontFamily: FONTS.PRETENDARD[400],
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#DB4242', backgroundColor: 'rgba(60,60,60,1)' }}
      text1Style={{
        fontSize: 17,
        color: TEXT_COLORS.primary,
        fontFamily: FONTS.PRETENDARD[400],
      }}
      text2Style={{
        fontSize: 15,
        color: TEXT_COLORS.primary,
        fontFamily: FONTS.PRETENDARD[400],
      }}
    />
  ),
};

function App() {
  return (
    <NavigationContainer>
      <Router />
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}

export default App;
