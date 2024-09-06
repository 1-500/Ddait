if (__DEV__) {
  require('./ReactotronConfig');
}
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, View } from 'react-native';

import { COLORS } from './src/constants/colors';
import Router from './src/router';

function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkBackground} />
      <NavigationContainer theme={{ colors: { background: COLORS.darkBackground } }}>
        <Router />
      </NavigationContainer>
    </View>
  );
}

export default App;
