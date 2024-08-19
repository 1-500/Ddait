import './global.css';

import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

function App() {
  return (
    <GluestackUIProvider>
      <SafeAreaView className="flex-1 items-center justify-center bg-background-dark">
        <Text className="text-xl mb-5 color-primary-300">hello world</Text>
        <Text className="text-xl mb-5 color-primary-500">hello world</Text>
        <Text className="text-xl mb-5 color-primary-800">hello world</Text>
        <Text className="text-xl mb-5 color-secondary-300">hello world</Text>
        <Text className="text-xl mb-5 color-secondary-500">hello world</Text>
        <Text className="text-xl mb-5 color-secondary-800">hello world</Text>
        <Text className="text-xl mb-5 color-error-400">hello world</Text>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}

export default App;
