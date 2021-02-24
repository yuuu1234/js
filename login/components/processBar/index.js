import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';
import styles from './styles';
import StepOne from '../../../../../assets/svg/StepOne.svg';
import StepTwo from '../../../../../assets/svg/StepTwo.svg';
import StepThree from '../../../../../assets/svg/StepThree.svg';

const { width } = Dimensions.get('window');

const ProgressBar = ({ index }) => {
  let content;
  switch (index) {
    case 0:
      content = <StepOne width={width} />;
      break;
    case 1:
      content = <StepTwo width={width} />;
      break;
    case 2:
      content = <StepThree width={width} />;
      break;
    default:
      content = <StepOne width={width} />;
      break;
  }
  return (
    <View style={styles.container}>
      {content}
    </View>
  );
};

ProgressBar.propTypes = {
  index: PropTypes.number.isRequired,
};

export default ProgressBar;
