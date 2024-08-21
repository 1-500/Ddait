import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DefaultInput from '../../components/CustomInput';
import { LAYOUT_PADDING } from '../../constants/space';

const HomePage = () => {
  return (
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
