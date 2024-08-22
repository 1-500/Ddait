import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import CustomCard from '../../components/CustomCardComponent';
import { TAG_COLORS, TEXT_COLORS } from '../../constants/colors';

const HomePage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>HomePage</Text>
        <CustomCard
          title="스쿼트 챌린지 들어오세요!"
          tags={[
            { label: '헬스', color: TAG_COLORS.weight },
            { label: '스쿼트', color: TAG_COLORS.runnging },
          ]}
          additionalInfo={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: TEXT_COLORS.primary, marginLeft: 4 }}>3/10</Text>
            </View>
          }
          footer={<Text style={{ color: TEXT_COLORS.primary }}>23.08.01 ~ 23.09.01</Text>}
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
