import { StyleSheet, Text, View } from 'react-native';

const CompleteRegisterForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>회원가입을 마쳤습니다.</Text>
        <Text style={styles.headerText}>이제 재밌게 운동하러 가볼까요?</Text>
      </View>
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
    marginTop: 15,
  },
});
export default CompleteRegisterForm;
