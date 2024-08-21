import React from 'react';
import { Image, SafeAreaView } from 'react-native';

import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

const ThumbnailLogo = require('../../assets/images/login/thumnailLogo.png');
const GoogleIcon = require('../../assets/images/login/googleIcon.png');
const NaverIcon = require('../../assets/images/login/naverIcon.png');
const AppleIcon = require('../../assets/images/login/appleIcon.png');
const KakaoIcon = require('../../assets/images/login/kakaoIcon.png');

const LoginPage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1C1C1C' }}>
      <Box className="px-layoutHorizon">
        <Box className="items-center justify-center mt-10 mb-5">
          <Image source={ThumbnailLogo} alt="썸네일로고" />
          <Box className="mt-5">
            <Text bold size="2xl" className="text-white">
              따잇과 함께,
            </Text>
            <Text bold size="2xl" className="text-white">
              잇따라 함께하는 운동 습관 ! 게임 어쩌구!
            </Text>
          </Box>
        </Box>

        <Box className="flex gap-4 mt-10">
          <Input
            variant="underlined"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            className="border-b-[#4C4CE8] p-2"
          >
            <InputField placeholder="이메일" className="text-white placeholder:text-white font-bold" />
          </Input>
          <Input
            variant="underlined"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            className="border-b-[#4C4CE8] p-2"
          >
            <InputField
              type="password"
              placeholder="비밀번호"
              className="text-white placeholder:text-white font-bold"
            />
          </Input>
        </Box>
        <Box className="flex items-center mt-10 mb-10 w-full border-white">
          <Pressable className="w-full">
            {({ pressed }) => (
              <Box
                className={
                  pressed
                    ? 'bg-[#4C4CE8] p-4 items-center border-2 border-[#4C4CE8] opacity-70'
                    : 'bg-[#4C4CE8] p-4 items-center border-2 border-[#4C4CE8] opacity-1'
                }
              >
                <Text className="text-white text-[13px] font-semibold">로그인</Text>
              </Box>
            )}
          </Pressable>
          <HStack className="mt-4">
            <Pressable>
              {({ pressed }) => (
                <Text className={pressed ? 'text-[#FFFFFF] pr-4' : 'text-[#4C4CE8] pr-4'}>회원가입하기</Text>
              )}
            </Pressable>
            <Divider orientation="vertical" className="mx-1 h-[20px] bg-[#4C4CE8]" />
            <Pressable>
              {({ pressed }) => (
                <Text className={pressed ? 'text-[#FFFFFF] pl-4' : 'text-[#4C4CE8] pl-4'}>비밀번호 찾기</Text>
              )}
            </Pressable>
          </HStack>
        </Box>
        <Box className="flex flex-col items-center mt-5">
          <VStack space="lg">
            <Text className="text-[#4C4CE8] text-center">SNS 로그인</Text>
            <HStack space="md">
              <Pressable>
                {({ pressed }) => (
                  <Image
                    source={NaverIcon}
                    style={{ width: 40, height: 40 }}
                    className={pressed ? 'opacity-70' : 'opacity-1'}
                  />
                )}
              </Pressable>
              <Pressable>
                {({ pressed }) => (
                  <Image
                    source={KakaoIcon}
                    style={{ width: 40, height: 40 }}
                    className={pressed ? 'opacity-70' : 'opacity-1'}
                  />
                )}
              </Pressable>
              <Pressable>
                {({ pressed }) => (
                  <Image
                    source={GoogleIcon}
                    style={{ width: 40, height: 40 }}
                    className={pressed ? 'opacity-70' : 'opacity-1'}
                  />
                )}
              </Pressable>
              <Pressable>
                {({ pressed }) => (
                  <Image
                    source={AppleIcon}
                    style={{ width: 40, height: 40 }}
                    className={pressed ? 'opacity-70' : 'opacity-1'}
                  />
                )}
              </Pressable>
            </HStack>
            <Pressable>
              {({ pressed }) => (
                <Text className={pressed ? 'text-[#4C4CE8] text-center' : 'text-[#FFFFFF] text-center'}>
                  구경만 할래요
                </Text>
              )}
            </Pressable>
          </VStack>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default LoginPage;
