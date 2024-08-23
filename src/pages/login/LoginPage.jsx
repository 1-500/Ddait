import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONT_WEIGHTS, HEADER_FONT_SIZES } from '../../constants/font';

const ThumbnailLogo = require('../../assets/images/login/thumnailLogo.png');
const GoogleIcon = require('../../assets/images/login/googleIcon.png');
const NaverIcon = require('../../assets/images/login/naverIcon.png');
const AppleIcon = require('../../assets/images/login/appleIcon.png');
const KakaoIcon = require('../../assets/images/login/kakaoIcon.png');

const LoginPage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={ThumbnailLogo} style={styles.logo} />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>따잇과 함께, 잇따라 함께하는 운동 습관 ! 게임 어쩌구!</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <CustomInput
            size="large"
            theme="user"
            placeholder="이메일을 입력해주세요"
            style={{ fontSize: FONT_SIZES.sm }}
          />
          <CustomInput
            size="large"
            theme="user"
            placeholder="비밀번호를 입력해주세요"
            secureTextEntry={true}
            style={{ fontSize: FONT_SIZES.sm }}
          />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton size="large" text="로그인" theme="primary" />
          <View style={styles.linkContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                navigation.navigate('Sign', {
                  screen: 'SignUp',
                })
              }
            >
              <Text style={styles.linkText}>회원가입하기</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.linkText}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.snsContainer}>
          <Text style={styles.snsText}>SNS 로그인</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity activeOpacity={0.6}>
              <Image source={NaverIcon} style={styles.snsIcon} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}>
              <Image source={KakaoIcon} style={styles.snsIcon} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}>
              <Image source={GoogleIcon} style={styles.snsIcon} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}>
              <Image source={AppleIcon} style={styles.snsIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.viewText}>구경만 할래요</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    padding: 20,
    justifyContent: 'space-between',
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  textContainer: {
    marginVertical: 30,
  },
  headerText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: HEADER_FONT_SIZES.sm,
    textAlign: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
    marginVertical: 10,
  },

  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    flex: 1,
  },

  linkContainer: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
    paddingHorizontal: 10,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.primary,
    marginHorizontal: 10,
  },
  snsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  snsText: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.semiBold,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'space-between',
    width: '60%',
  },
  snsIcon: {
    width: 40,
    height: 40,
  },
  viewText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semiBold,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default LoginPage;
