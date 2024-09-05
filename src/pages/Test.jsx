import React, { useRef, useState } from 'react';
import { Animated, Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Toast from '../components/Toast'; // Toast 컴포넌트 경로에 맞게 설정
import { useToastMessageStore } from '../store/toastMessage/toastMessage';

const TestPage = () => {
  const { showToast } = useToastMessageStore();
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const buttonRef = useRef(null); // 버튼의 ref

  // 버튼 위치 측정
  const measureButtonPosition = () => {
    buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
      setButtonPosition({ x: pageX, y: pageY, width, height });
      showToast('This is a custom positioned toast!', 'info', 3000, 'custom');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          ref={buttonRef} // TouchableOpacity는 ref를 지원
          onPress={measureButtonPosition}
          style={{ padding: 10, backgroundColor: 'blue' }}
        >
          <Text style={{ color: 'white' }}>Show Toast</Text>
        </TouchableOpacity>
      </View>

      {/* 토스트 메세지 컴포넌트, 버튼 위치 위에 뜨도록 설정 */}
      {buttonPosition && (
        <Toast
          customPosition={buttonPosition.y - 50} // 버튼 위에 띄우기 위해 Y값에서 50을 뺌
        />
      )}
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
