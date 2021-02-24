import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';
import CountDownTimer from '../../../components/countDownTimer';
import { FormButton } from '../../../components/formButton';
import {
  COUNTDOWN_TEXT,
  UNITTEXT,
  SECONDS_LIMIT,
} from './constants';
import * as navigatorConstants from '../../../constants/navigatorConstants';
import styles from './style';

@observer
class SMSCodeScreen extends Component {
  constructor() {
    super();
    this.state = { isResendCode: false };
  }

  handleTimesUp = () => {
    this.setState({ isResendCode: true });
  }

  handleResendCode = () => {
    // this.props.loginStore.resendSMSCode().then()
    this.setState({ isResendCode: false });
  }

  handleVerifyCode = () => {
    const { loginStore: { verifyPhoneNumber } } = this.props;
    verifyPhoneNumber().then(this.verifyCodeSuccess);
  }

  verifyCodeSuccess = (res) => {
    const { handleNavigation, loginStore: { smsCodeValidation, clearSMSCode } } = this.props;
    if (smsCodeValidation && res.isVerified) {
      clearSMSCode();
      handleNavigation(navigatorConstants.PhoneNumberLogin);
    }
  }

  renderResendLink = () => {
    const { isResendCode } = this.state;

    return (
      <View style={styles.resendCodeContainer}>
        {!isResendCode ? (
          <CountDownTimer
            title={COUNTDOWN_TEXT}
            unitText={UNITTEXT}
            secondsLimit={SECONDS_LIMIT}
            onTimesUp={this.handleTimesUp}
          />
        ) : (
          <TouchableOpacity
            testID="resend-code"
            onPress={this.handleResendCode}
            style={styles.resendContainer}
            accessibilityLabel="btn-resendSMSCode"
          >
            <Text style={styles.resendButton}>Resend Code</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  render() {
    const { loginStore: { smsCodeValidation } } = this.props;

    return (
      <View>
        {this.renderResendLink()}
        <FormButton
          title="Verify"
          disable={!smsCodeValidation}
          onPress={this.handleVerifyCode}
        />
      </View>

    );
  }
}

SMSCodeScreen.propTypes = {
  handleNavigation: PropTypes.func.isRequired,
  loginStore: PropTypes.shape({
    verifyPhoneNumber: PropTypes.func.isRequired,
    clearSMSCode: PropTypes.func.isRequired,
    smsCodeValidation: PropTypes.bool.isRequired,
  }).isRequired,
};

export default inject('loginStore')(observer(SMSCodeScreen));
