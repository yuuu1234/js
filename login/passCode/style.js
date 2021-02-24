import { StyleSheet } from 'react-native';
import {
  Colors,
  headingH3BoldStyle,
  textLinkSecondaryStyle,
  bottomButtonContainer,
} from '@src/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    overflow: 'scroll',
    width: '100%',
  },
  instructionContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  instructionFixWidth: {
    display: 'flex',
    width: '70%',
    alignItems: 'center',
  },
  instructionHeader: {
    ...headingH3BoldStyle,
    color: Colors.PrimaryBlue,
    textAlign: 'center',
    marginTop: 31,
  },
  instructionDescription: {
    color: Colors.GreyText,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 22,
  },
  disableButtonColor: {
    backgroundColor: Colors.PrimaryBlueDisabled,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 1,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  extra: {
    width: '100%',
    height: 30,
  },
  forgotPassCode: {
    ...textLinkSecondaryStyle,
    alignSelf: 'center',
  },
});

export default styles;
