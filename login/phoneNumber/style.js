import { StyleSheet } from 'react-native';
import {
  Colors,
  baseButtonStyle,
  baseTextStyle, bodySmallStyle,
  TCStyle,
  chartsGraphsBoldStyle,
  headingH3BoldStyle,
  textLinkSecondaryStyle,
  bottomButtonContainer,
} from '../../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  containerRow: {
    flexDirection: 'row',
  },
  contentContainer: {
    paddingHorizontal: 49,
  },
  title: {
    ...headingH3BoldStyle,
    color: Colors.PrimaryBlue,
    marginTop: 31,
    lineHeight: 28,
  },
  description: {
    ...bodySmallStyle,
    color: Colors.GreyText,
    marginVertical: 16,
    lineHeight: 22,
  },
  inputField: {
    width: '100%',
    marginTop: 10,
  },
  inputFieldRow: {
    flex: 1,
    marginLeft: 8,
    marginTop: 10,
  },
  inputFieldRowChild: {
    width: '100%',
  },
  termConditionContainer: {
    flexDirection: 'row',
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termConditionText: {
    ...TCStyle,
    color: Colors.GreyText,
  },
  termConditionLinkText: {
    color: Colors.PrimaryBlue,
  },
  button: {
    ...baseButtonStyle,
    marginVertical: 20,
    marginHorizontal: 49,
  },
  buttonDisabled: {
    backgroundColor: Colors.PrimaryBlueDisabled,
  },
  buttonText: {
    ...baseTextStyle,
    color: Colors.White,
  },
  verifyButton: {
    ...baseButtonStyle,
    position: 'absolute',
    top: 10,
    right: 0,
    marginVertical: 10,
    borderRadius: 5,
    height: 23,
    width: 51,
    display: 'flex',
    padding: 3,
  },
  verifiedButton: {
    ...baseButtonStyle,
    position: 'absolute',
    top: 10,
    right: 0,
    marginVertical: 10,
    backgroundColor: Colors.PositiveGreen,
    borderRadius: 5,
    height: 23,
    width: 68,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
  textVerify: {
    ...chartsGraphsBoldStyle,
    color: Colors.White,
  },
  changedYourNumber: {
    ...textLinkSecondaryStyle,
    alignSelf: 'center',
  },
  bottomButtonContainer: {
    ...bottomButtonContainer,
  },
});

export default styles;
