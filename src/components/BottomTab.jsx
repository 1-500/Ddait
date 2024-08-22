import React, { useRef } from 'react';
import { Animated, Dimensions, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';

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

const BottomTabComponents = ({ state, navigation, insets, descriptors }) => {
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

  return (
    <View>
      <ImageBackground source={bottomTabBackground} style={styles.bottomTabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = route.name;
          const isFocused = state.index === index;
          const animatedOf = animatedValues[index];

          const iconFlag = (bool) => {
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
            <TouchableOpacity
              key={index}
              activeOpacity={0.6}
              onPress={onPress}
              style={[
                { flex: 1, alignItems: 'center' },
                index === 1 && { marginRight: width * 0.08 },
                index === 2 && { marginLeft: width * 0.08 },
              ]}
              className={['flex-1 items-center'].join(' ')}
            >
              <Animated.Image
                source={iconFlag(isFocused)}
                resizeMode={'contain'}
                style={{
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
                }}
              />
            </TouchableOpacity>
          );
        })}
      </ImageBackground>
      <TouchableOpacity style={styles.addButton} activeOpacity={0.6}>
        <Image source={plusButtonIcon} style={styles.plusButtonIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabComponents;

const styles = StyleSheet.create({
  bottomTabContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    height: 100,
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  addButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: width / 2,
    bottom: 80,
    borderRadius: 50,
    width: 1,
    height: 1,
  },
  plusButtonIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
