import { useRoute } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import HeaderComponents from '../../../components/HeaderComponents';
import { COLORS } from '../../../constants/colors';
import { FONT_SIZES, FONTS } from '../../../constants/font';

const FoodInfo = ({ navigation }) => {
  const route = useRoute();
  const { name, calories, serving_size } = route.params;

  return (
    <SafeAreaView>
      <HeaderComponents title={name} />
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, marginVertical: 30 }}>
          <CustomInput size="medium" theme="primary" value={serving_size.toString()} />
          <CustomInput size="medium" theme="primary" value="g" />
        </View>

        <View style={styles.foodInfoContainer}>
          <View style={styles.mainRow}>
            <Text style={styles.mainValue}>{calories}</Text>
            <Text style={styles.unit}>kcal</Text>
          </View>
          <View style={[styles.row, styles.borderedRow]}>
            <Text style={styles.label}>탄수화물</Text>
            <Text style={styles.value}>0g</Text>
          </View>
          <View style={[styles.row, styles.borderedRow]}>
            <Text style={styles.label}>단백질</Text>
            <Text style={styles.value}>24.5g</Text>
          </View>
          <View style={[styles.row, styles.lastRow]}>
            <Text style={styles.label}>지방</Text>
            <Text style={styles.value}>1.8g</Text>
          </View>
        </View>
        <View style={{ marginVertical: 20 }}>
          <CustomButton theme="primary" size="large" text="추가하기" />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default FoodInfo;

const styles = StyleSheet.create({
  foodInfoContainer: {},
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  mainValue: {
    fontFamily: FONTS.PRETENDARD[600],
    fontSize: FONT_SIZES.xl,
    color: COLORS.white,
  },
  unit: {
    fontFamily: FONTS.PRETENDARD[600],
    fontSize: FONT_SIZES.sm,
    color: '#888',
  },
  label: {
    fontSize: 16,
    color: 'white',
  },
  value: {
    fontSize: 16,
    color: 'white',
  },
  borderedRow: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
});
