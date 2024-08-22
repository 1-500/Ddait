import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import CustomButton from '../../components/CustomButton';
import DefaultInput from '../../components/CustomInput';
import { LAYOUT_PADDING } from '../../constants/space';

const HomePage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>HomePage</Text>
        <CustomButton theme="primary" size="medium" text="Press me" />
      </View>
      <View style={[styles.container, LAYOUT_PADDING]}>
        <Text>input</Text>
        <DefaultInput
          theme="primary"
          size="medium"
          value=""
          placeholder="플레이스홀더야"
          secureTextEntry={false}
          isPassword={true}
          isError={true}
        />
        <Text>input</Text>
        <DefaultInput
          theme="user"
          size="medium"
          value=""
          placeholder="플레이스홀더야"
          secureTextEntry={false}
          isPassword={true}
          isError={true}
        />
        <Text>input</Text>
        <DefaultInput
          theme="search"
          size="medium"
          value=""
          placeholder="플레이스홀더야"
          secureTextEntry={false}
          isPassword={true}
          isError={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
