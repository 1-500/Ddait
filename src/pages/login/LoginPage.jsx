import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { emailLogin } from '../../apis/login/index';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import AppleLogin from '../../components/Login/AppleLogin';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES, FONTS, HEADER_FONT_SIZES } from '../../constants/font';
import { LAYOUT_PADDING } from '../../constants/space';
import useUserStore from '../../store/sign/login';
import { useToastMessageStore } from '../../store/toastMessage/toastMessage';

const ThumbnailLogo = require('../../assets/images/login/thumnailLogo.png');
const GoogleIcon = require('../../assets/images/login/googleIcon.png');
const NaverIcon = require('../../assets/images/login/naverIcon.png');
const AppleIcon = require('../../assets/images/login/appleIcon.png');
const KakaoIcon = require('../../assets/images/login/kakaoIcon.png');
const LoginPage = () => {
  const navigation = useNavigation();

  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();

  const { setToken, setUserEmail, setUserInfo } = useUserStore();
  const { showToast } = useToastMessageStore();

  const handleEmailInput = (text) => {
    setEmailInput(text);
  };

  const handlePasswordInput = (text) => {
    setPasswordInput(text);
  };

  const handleLoginButton = async () => {
    if (emailInput && passwordInput) {
      try {
        const result = await emailLogin({ email: emailInput, password: passwordInput });
        const { access_token, expires_in, refresh_token } = result.session;
        const { email, userId, nickname, profileImageUrl, introduce, user_level } = result.user;

        setToken({
          accessToken: access_token,
          expiresIn: expires_in,
          refreshToken: refresh_token,
        });
        setUserEmail(email);
        setUserInfo({
          userEmail: email,
          userId: userId,
          nickname: nickname,
          profileImageUrl: profileImageUrl,
          introduce: introduce,
          userLevel: user_level,
        });
        navigation.navigate('MainTab', { screen: 'Home' });
      } catch (error) {
        showToast(error.message || '로그인 중 오류가 발생했습니다.', 'error', 2000, 'top');
      }
    } else {
      showToast('이메일과 비밀번호를 입력하세요!', 'error', 2000, 'top');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image source={ThumbnailLogo} style={styles.logo} />
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>{'경쟁하며 기르는 운동 습관! \n 운동을 더 즐겁게, 친구와 따잇! 👊'}</Text>
            </View>
          </View>
          <View style={styles.formContainer}>
            <CustomInput
              size="large"
              theme="user"
              placeholder="이메일을 입력해주세요"
              onChangeText={handleEmailInput}
              style={{ fontSize: FONT_SIZES.sm }}
            />
            <CustomInput
              size="large"
              theme="user"
              placeholder="비밀번호를 입력해주세요"
              onChangeText={handlePasswordInput}
              secureTextEntry={true}
              style={{ fontSize: FONT_SIZES.sm }}
            />
            <View style={{ marginVertical: 20, width: '100%' }}>
              <CustomButton size="large" text="로그인" theme="primary" onPress={handleLoginButton} />
            </View>
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
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  navigation.navigate('Sign', {
                    screen: 'SocialLogin',
                    params: {
                      provider: 'naver',
                    },
                  })
                }
              >
                <Image source={NaverIcon} style={styles.snsIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  navigation.navigate('Sign', {
                    screen: 'SocialLogin',
                    params: {
                      provider: 'kakao',
                    },
                  })
                }
              >
                <Image source={KakaoIcon} style={styles.snsIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  navigation.navigate('Sign', {
                    screen: 'SocialLogin',
                    params: {
                      provider: 'google',
                    },
                  })
                }
              >
                <Image source={GoogleIcon} style={styles.snsIcon} />
              </TouchableOpacity>
              <AppleLogin />
            </View>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={styles.viewText}>구경만 할래요</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    justifyContent: 'center',
  },
  content: {
    ...LAYOUT_PADDING,
    // justifyContent: 'space-between',
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
    fontSize: HEADER_FONT_SIZES.sm,
    fontFamily: FONTS.PRETENDARD[700],
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
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
  },
  linkText: {
    color: COLORS.primary,
    fontFamily: FONTS.PRETENDARD[600],
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
    fontFamily: FONTS.PRETENDARD[600],
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
    fontFamily: FONTS.PRETENDARD[600],
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default LoginPage;
