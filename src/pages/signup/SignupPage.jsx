import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { Box } from '@/components/ui/box';
import ProgressIndicator from '@/src/components/signup/ProgressIndicator';

const SignUpPage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1C1C1C' }}>
      <Box className="mt-10 mb-10">
        <ProgressIndicator />
      </Box>
    </SafeAreaView>
  );
};

export default SignUpPage;
