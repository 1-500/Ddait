import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { emailAccountId, socialLoginAccountId } from '../../apis/signup/index';
import { FONTS } from '../../constants/font';
import useUserStore from '../../store/sign/login';
import useUserFormStore from '../../store/sign/signup';

const CompletePage = () => {
  const { email, password, nickname, position, preferredSport, gender, selectedDate, clearForm } = useUserFormStore();
  const { socialEmail } = useUserStore();
  const navigation = useNavigation();

  useEffect(() => {
    const postId = async () => {
      try {
        if (socialEmail !== null) {
          // 소셜로그인이 이메일이 존재한다
          const result = await socialLoginAccountId(
            JSON.stringify({
              email,
              password,
              nickname,
              location: `${position.latitude},${position.longitude}`,
              preferred_sport: preferredSport,
              gender: gender,
              birthdate: `${selectedDate.year}${selectedDate.month}${selectedDate.day}`,
              social_email: socialEmail,
            }),
          );
        } else {
          const result = await emailAccountId(
            JSON.stringify({
              email,
              password,
              nickname,
              location: `${position.latitude},${position.longitude}`,
              preferred_sport: preferredSport,
              gender: gender,
              birthdate: `${selectedDate.year}${selectedDate.month}${selectedDate.day}`,
            }),
          );
          Alert.alert(result.message);
          clearForm();
        }
      } catch (error) {
        // console.log(error);
      }
    };
    postId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>회원가입을 마쳤습니다.</Text>
        <Text style={styles.headerText}>이제 재밌게 운동하러 가볼까요?</Text>
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
    fontFamily: FONTS.PRETENDARD[600],
  },
  subHeaderText: {
    color: '#D9D9D9',
    fontSize: 16,
    fontFamily: FONTS.PRETENDARD[600],
    marginTop: 15,
  },
});
export default CompletePage;
