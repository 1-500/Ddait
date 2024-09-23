import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useToastMessageStore } from '../store/toastMessage/toastMessage';

const TestPage = () => {
  const { showToast } = useToastMessageStore();

  const showTopToast = () => {
    showToast('This is a success message!', 'success', 1000, 'top');
  };
  const showBottomToast = (message) => {
    showToast(message, 'error', 1000, 'bottom');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>테스트 페이지</Text>
        <Button title="Show Top Toast" onPress={showTopToast} />
        <Button title="Show Bottom Toast" onPress={() => showBottomToast('아아아아아')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default TestPage;
