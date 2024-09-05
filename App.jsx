if (__DEV__) {
  require('./ReactotronConfig');
}
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import Router from './src/router';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#13C670', backgroundColor: '#8D8995' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '400',
        color: '#E0E0E0',
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#DB4242', backgroundColor: '#8D8995' }}
      text1Style={{
        fontSize: 17,
        fontWeight: '400',
        color: '#E0E0E0',
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: '400',
        color: '#E0E0E0',
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
