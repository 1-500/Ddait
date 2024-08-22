import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const MaleIcon = require('../../assets/images/maleIcon.png');
const FemaleIcon = require('../../assets/images/femaleIcon.png');
const NoneIcon = require('../../assets/images/NoneIcon.png');

const items = [{ icon: MaleIcon }, { icon: FemaleIcon }, { icon: NoneIcon }];
const GenderRegisterForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>나라님의 성별은</Text>
        <Text style={styles.headerText}>무엇인가요?</Text>
        <Text style={styles.subHeaderText}>필수정보가 아닙니다!</Text>
      </View>
      <View style={styles.genderContainer}>
        {items.map((item, index) => (
          <Card key={index} icon={item.icon} />
        ))}
      </View>
    </View>
  );
};
const Card = ({ title, icon }) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
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
  genderContainer: {
    backgroundColor: '#1C1C1C',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 15,
  },
  cardContainer: {
    width: 83,
    height: 83,
  },
  icon: {
    width: 83,
    height: 83,
    resizeMode: 'cover',
  },
});
export default GenderRegisterForm;
