import { StyleSheet, TextInput } from 'react-native';
const SignUpInput = ({ placeholder }) => {
  return <TextInput placeholder={placeholder} style={styles.input} placeholderTextColor="#888888" />;
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: '#4C4CE8',
    padding: 8,
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});
export default SignUpInput;
