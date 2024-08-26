import axios from 'axios';
import React, { useEffect } from 'react';
import { processColor, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import CustomCard from '../../components/CustomCardComponent';
import CustomInput from '../../components/CustomInput';
import HeaderComponents from '../../components/HeaderComponents';
import { COLORS } from '../../constants/colors';
import { LAYOUT_PADDING } from '../../constants/space';

const HomePage = () => {
  /* eslint-disable */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/workout-record?user_id=2');
        console.log(res.data); // 응답 데이터에 접근
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    /* eslint-enable */
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkBackground }}>
      <HeaderComponents icon="home" />
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
        <CustomInput value="hi" />
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
