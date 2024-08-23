import { StyleSheet, Text, View } from 'react-native';

import { FONT_SIZES } from '../../constants/font';
import CustomInput from '../CustomInput';

const NicknameRegisterForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>가입 절차를 진행할게요!</Text>
        <Text style={styles.headerText}>어떻게 불러드릴까요?</Text>
      </View>
      <View style={styles.inputContainer}>
        <CustomInput
          size="large"
          theme="user"
          placeholder="닉네임을 입력해주세요"
          style={{ fontSize: FONT_SIZES.md }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  headerContainer: {
    marginTop: 30,
    marginBottom: 24,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  inputContainer: {
    marginTop: 16,
  },
});

export default NicknameRegisterForm;
