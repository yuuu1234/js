import { StyleSheet } from 'react-native';
import { Colors } from '@src/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  verifyButton: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003D9A',
    borderRadius: 15,
    width: 277,
    height: 41,
  },
  verifyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  verifyDisabledButton: {
    backgroundColor: '#97B5E2',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: 277,
    height: 41,
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
