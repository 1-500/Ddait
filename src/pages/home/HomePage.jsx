import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import CustomCard from '../../components/CustomCardComponent';
import { LAYOUT_PADDING } from '../../constants/space';

const HomePage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>HomePage</Text>
        <CustomCard
          title="스쿼트 챌린지 들어오세요!"
          tags={[
            { label: '헬스', category: 'weight' },
            { label: '스쿼트', category: 'runnging' },
          ]}
          additionalInfo={'3/10'}
          footer={'23.08.01 ~ 23.09.01'}
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
    ...LAYOUT_PADDING,
  },
});
