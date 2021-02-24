import { StyleSheet } from 'react-native';
import { Colors } from '@src/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  passCodeContainer: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  passCodeFooter: {
    marginBottom: 20,
  },
  resendCodeContainer: {
    paddingBottom: 50,
    textAlign: 'center',
  },
  resendContainer: {
    padding: 5,
  },
  resendButton: {
    textDecorationLine: 'underline',
    fontSize: 16,
    color: Colors.GreyText,
    textAlign: 'center',
  },
});

export default styles;
