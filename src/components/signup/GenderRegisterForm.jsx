import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/font';
import useUserFormStore from '../../store/sign/signup';
const MaleIcon = require('../../assets/images/maleIcon.png');
const FemaleIcon = require('../../assets/images/femaleIcon.png');
const NoneIcon = require('../../assets/images/NoneIcon.png');

const items = [
  { title: 'male', icon: MaleIcon },
  { title: 'female', icon: FemaleIcon },
  { title: 'none', icon: NoneIcon },
];
const GenderRegisterForm = () => {
  const { setGender, gender, nickName } = useUserFormStore();

  const handleCard = (title) => {
    setGender(title);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{nickName}님의 성별은</Text>
        <Text style={styles.headerText}>무엇인가요?</Text>
        <Text style={styles.subHeaderText}>필수정보가 아닙니다!</Text>
      </View>
      <View style={styles.genderContainer}>
        {items.map((item, index) => (
          <Card key={index} icon={item.icon} onPressIn={handleCard} gender={gender} title={item.title} />
        ))}
      </View>
    </View>
  );
};
const Card = ({ title, icon, onPressIn, gender }) => {
  const cardStyle = gender === title ? styles.selectedCardContainer : styles.cardContainer;

  return (
    <TouchableOpacity style={cardStyle} onPressIn={() => onPressIn(title)}>
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
    fontFamily: FONTS.PRETENDARD[600],
  },
  subHeaderText: {
    color: '#D9D9D9',
    fontSize: 16,
    fontFamily: FONTS.PRETENDARD[600],
    marginTop: 15,
  },

  genderContainer: {
    backgroundColor: '#1C1C1C',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 15,
  },
  selectedCardContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    padding: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',

    alignItems: 'center',
  },
  icon: {
    width: 83,
    height: 83,
    resizeMode: 'cover',
  },
});
export default GenderRegisterForm;
