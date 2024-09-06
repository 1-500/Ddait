import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '../../../constants/colors';
import { LAYOUT_PADDING } from '../../../constants/space';

const SentRequests = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SentRequests Page</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...LAYOUT_PADDING,
    alignItems: 'center',
  },
  text: {
    marginTop: 100,
    color: COLORS.white,
  },
});
export default SentRequests;
