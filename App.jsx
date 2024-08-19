import './global.css';

import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

function App() {
  return (
    <GluestackUIProvider>
      <SafeAreaView className="flex-1 items-center justify-center bg-error-50">
        <Text className="text-success-500 text-xl mb-5">hello world</Text>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}

export default App;
