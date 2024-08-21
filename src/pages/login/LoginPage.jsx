import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ThumbnailLogo = require('../../assets/images/login/thumnailLogo.png');
const GoogleIcon = require('../../assets/images/login/googleIcon.png');
const NaverIcon = require('../../assets/images/login/naverIcon.png');
const AppleIcon = require('../../assets/images/login/appleIcon.png');
const KakaoIcon = require('../../assets/images/login/kakaoIcon.png');

const LoginPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image source={ThumbnailLogo} style={styles.logo} />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>따잇과 함께,</Text>
            <Text style={styles.headerText}>잇따라 함께하는 운동 습관 ! 게임 어쩌구!</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput placeholder="이메일" style={styles.input} placeholderTextColor="white" />
          <TextInput placeholder="비밀번호" style={styles.input} secureTextEntry placeholderTextColor="white" />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>

          <View style={styles.linkContainer}>
            <TouchableOpacity>
              <Text style={styles.linkText}>회원가입하기</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity>
              <Text style={styles.linkText}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.snsContainer}>
          <Text style={styles.snsText}>SNS 로그인</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <Image source={NaverIcon} style={styles.snsIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={KakaoIcon} style={styles.snsIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={GoogleIcon} style={styles.snsIcon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={AppleIcon} style={styles.snsIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
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
    justifyContent: 'space-between',
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  textContainer: {
    marginVertical: 20,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#4C4CE8',
    padding: 10,
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#4C4CE8',
    padding: 12,
    width: '100%',
    alignItems: 'center',
    borderRadius: 4,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  linkText: {
    color: '#4C4CE8',
    paddingHorizontal: 10,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#4C4CE8',
    marginHorizontal: 10,
  },
  snsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  snsText: {
    color: '#4C4CE8',
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
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default LoginPage;
