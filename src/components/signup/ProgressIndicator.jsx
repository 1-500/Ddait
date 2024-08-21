import { StyleSheet, View } from 'react-native';

const ProgressIndicator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dash} />
      <View style={styles.dash} />
      <View style={[styles.dash, styles.activeDash]} />
      <View style={styles.dash} />
      <View style={styles.dash} />
      <View style={styles.dash} />
      <View style={styles.dash} />
    </View>
  );
};
export default ProgressIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dash: {
    borderRadius: 20,
    width: 41,
    height: 7,
    backgroundColor: '#000000',
    marginHorizontal: 5,
  },
  activeDash: {
    backgroundColor: '#5D5DFC',
  },
});
