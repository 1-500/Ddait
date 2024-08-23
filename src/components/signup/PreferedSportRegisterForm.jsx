import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MoutainIcon = require('../../assets/images/mountain.png');
const WeightTrainningIcon = require('../../assets/images/weight.png');
const RunningIcon = require('../../assets/images/runner-woman.png');
const CatIcon = require('../../assets/images/cat.png');

const items = [
  { title: '웨이트', icon: WeightTrainningIcon },
  { title: '등산', icon: MoutainIcon },
  { title: '러닝', icon: RunningIcon },
  { title: '고양이', icon: CatIcon },
];
const PreferedSportRegisterForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>나라님이 좋아하는</Text>
        <Text style={styles.headerText}>운동은 무엇인가요?</Text>
        <Text style={styles.subHeaderText}>선호하는 운동 위주로 경쟁을 시켜드려요</Text>
      </View>
      <View style={styles.preferedSportContainer}>
        {items.map((item, index) => (
          <Card key={index} title={item.title} icon={item.icon} />
        ))}
      </View>
    </View>
  );
};
const Card = ({ title, icon }) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <Text style={styles.title}>{title}</Text>
      <Image source={icon} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  headerContainer: {
    marginTop: 30,
    marginBottom: 24,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  subHeaderText: {
    color: '#D9D9D9',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
  },
  preferedSportContainer: {
    backgroundColor: '#1C1C1C',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  cardContainer: {
    width: 160,
    height: 160,
    backgroundColor: '#333333',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
export default PreferedSportRegisterForm;
