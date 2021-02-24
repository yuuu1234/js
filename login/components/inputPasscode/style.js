import { StyleSheet } from 'react-native';

import { Colors } from '../../../../styles/index';

const styles = StyleSheet.create({
  dotsContainer: {
    marginTop: 23.75,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 13,
    height: 13,
    marginLeft: 13,
    marginRight: 13,
    borderWidth: 1,
    borderColor: Colors.PrimaryBlueDisabled,
    borderRadius: 50,
  },
  containedColor: {
    backgroundColor: Colors.PrimaryBlue,
    borderColor: Colors.PrimaryBlue,
  },
  uncontainedColor: {
    backgroundColor: '#97B5E2',
  },
  keyboardContainer: {
    width: '100%',
    height: 345,
    marginTop: 23.75,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardLineContainer: {
    marginTop: 19,
    display: 'flex',
    flexDirection: 'row',
  },
  keyContainer: {
    width: 75,
    height: 75,
    marginLeft: 14.25,
    marginRight: 14.25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  oneKey: {
    width: 75,
    height: 75,
    borderRadius: 50,
    borderColor: Colors.PrimaryBlue,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberFont: {
    fontSize: 36,
    color: Colors.PrimaryBlue,
    lineHeight: 43,
    textAlign: 'center',
  },
  textContainer: {
    width: 75,
    height: 75,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFont: {
    fontSize: 10,
    fontWeight: 'bold',
    lineHeight: 12,
    color: Colors.PrimaryBlue,
    textAlign: 'center',
  },
  blankBlock: {
    width: 75,
  },
});

export default styles;
