import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import InputDigit from '@src/components/inputDigits';
import { TITLE_USER_SMS_INPUT_SCREEN } from '../../smsCode/constants';

import styles from './style';

export default class SMSCodeInput extends Component {
  constructor() {
    super();
    this.state = {
      smsInputText: '',
      isFilledAll: false,
    };
  }

  onChangeTextInput = (value) => {
    const {
      onInputChange,
      numberDigits,
    } = this.props;

    onInputChange(value);

    this.setState({
      isFilledAll: value.length === numberDigits,
      smsInputText: value,
    });
  };

  render() {
    const { smsInputText, isFilledAll } = this.state;
    const { numberDigits, formatter } = this.props;

    return (
      <View>
        <Text style={styles.informTitle}>{TITLE_USER_SMS_INPUT_SCREEN}</Text>
        <InputDigit
          value={smsInputText}
          digits={numberDigits}
          digitStyles={[isFilledAll && styles.inputFilledContainer]}
          onTextChange={this.onChangeTextInput}
          accessibilityLabelPrefix="btn-inputSMSCode-"
          formatter={formatter}
        />
      </View>
    );
  }
}

SMSCodeInput.propTypes = {
  numberDigits: PropTypes.number.isRequired,
  onInputChange: PropTypes.func.isRequired,
  formatter: PropTypes.func,
};

SMSCodeInput.defaultProps = {
  formatter: (value) => value,
};
