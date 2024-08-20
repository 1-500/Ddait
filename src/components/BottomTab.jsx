import React, { useRef } from 'react';
import { Animated, Dimensions, Image } from 'react-native';

import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';

// 아이콘 이미지
const bottomTabBackground = require('../assets/images/bottomtab_bg.png');
const homeOnIcon = require('../assets/images/home_on.png');
const homeOffIcon = require('../assets/images/home_off.png');
const trophyOnIcon = require('../assets/images/trophy_on.png');
const trophyOffIcon = require('../assets/images/trophy_off.png');
const friendOnIcon = require('../assets/images/friend_on.png');
const friendOffIcon = require('../assets/images/friend_off.png');
const settingOnIcon = require('../assets/images/setting_on.png');
const settingOffIcon = require('../assets/images/setting_off.png');
const plusButtonIcon = require('../assets/images/plus_button.png');

const { width } = Dimensions.get('window');

const BottomTab = ({ state, navigation }) => {
  const tab1Value = useRef(new Animated.Value(0)).current;
  const tab2Value = useRef(new Animated.Value(0)).current;
  const tab3Value = useRef(new Animated.Value(0)).current;
  const tab4Value = useRef(new Animated.Value(0)).current;

  const scaleAnimated = (value, animatedValue) =>
    Animated.timing(animatedValue, {
      useNativeDriver: true,
      toValue: value,
      duration: 150,
    });

  const animatedValues = {
    0: tab1Value,
    1: tab2Value,
    2: tab3Value,
    3: tab4Value,
  };

  const iconFlag = (label, bool) => {
    switch (label) {
      case 'Home':
        return bool ? homeOnIcon : homeOffIcon;
      case 'Competition':
        return bool ? trophyOnIcon : trophyOffIcon;
      case 'Friend':
        return bool ? friendOnIcon : friendOffIcon;
      default:
        return bool ? settingOnIcon : settingOffIcon;
    }
  };

  return (
    <Box>
      <Image source={bottomTabBackground} style={{ position: 'absolute', bottom: 0, width: width, height: 100 }} />
      <Box position="absolute" bottom={0} width="100%" borderColor="gray.200" style={{ paddingBottom: 16 }}>
        <HStack justifyContent="space-around" alignItems="center">
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const animatedOf = animatedValues[index];

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }

              scaleAnimated(1, animatedOf).start(({ finished }) => {
                if (finished) {
                  scaleAnimated(0, animatedOf).start();
                }
              });
            };

            return (
              <Pressable
                key={index}
                onPress={onPress}
                style={[
                  { flex: 1, alignItems: 'center' },
                  index === 1 && { marginRight: width * 0.08 },
                  index === 2 && { marginLeft: width * 0.08 },
                ]}
              >
                {({ pressed }) => (
                  <Animated.Image
                    source={iconFlag(route.name, isFocused)}
                    resizeMode="contain"
                    style={[
                      {
                        width: 40,
                        height: 40,
                        transform: [
                          {
                            scale: animatedOf.interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 0.9],
                            }),
                          },
                        ],
                      },
                      pressed && { opacity: 0.6 },
                    ]}
                  />
                )}
              </Pressable>
            );
          })}
        </HStack>
        <Pressable
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            left: width / 2 - 25, // Adjust the button to be centered
            bottom: 55,
            borderRadius: 50,
          }}
        >
          {({ pressed }) => (
            <Image
              source={plusButtonIcon}
              style={[{ width: 50, height: 50, resizeMode: 'contain' }, pressed && { opacity: 0.6 }]}
            />
          )}
        </Pressable>
      </Box>
    </Box>
  );
};

export default BottomTab;
