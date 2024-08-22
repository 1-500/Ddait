import { StyleSheet, Text, View } from 'react-native';

const MyPositionRegisterForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>나라짱짱님의 위치는 어디신가요?</Text>
        <Text style={styles.subHeaderText}>주변 유저들을 추천해드릴게요!</Text>
      </View>
      <View />
    </View>
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
    marginTop: 10,
  },
});
export default MyPositionRegisterForm;
