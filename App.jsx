import './global.css';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { GluestackUIProvider } from './components/ui/gluestack-ui-provider';
import Router from './src/router';

function App() {
  return (
    <GluestackUIProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

export default App;
