import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { observer, inject } from 'mobx-react';
import { FormButton, LoadingModal } from '@src/components';
import { PASSCODE_MAX_LENGTH } from '@modules/login/passCode/constants';
import * as R from 'ramda';
import * as navigatorConstants from '@src/constants/navigatorConstants';
import InputPasscode from '../components/inputPasscode';
import styles from './style2';

export function checkIsPasscodeValid(code, length) {
  return code && String(code).length === length;
}

@observer
class PassCodeFormFirebase extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  handleCodeInput = (value, codes) => {
    const { loginStore: { saveInputChange } } = this.props;
    const passCode = codes.join('');
    saveInputChange({ passCode });
  }

  handleSubmitToLogin2 = () => { // TODO: Enable SMS code
    const { loginStore } = this.props;

    this.setState({ isLoading: true });
    loginStore.loginWithToken().then(this.handleLoginSuccess2);
  }

  handleLoginSuccess2 = (res) => { // TODO: Enable SMS code
    if (!res) return;
    const { navigation } = this.props;
    const defaultAccount = R.path(['accountStore', 'defaultAccountDetail'])(this.props);
    if (defaultAccount) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isLoading: false });
      navigation.navigate(navigatorConstants.Home);
    }
  }

  render() {
    const { isLoading } = this.state;
    const login = R.path(['loginStore', 'login'])(this.props);
    const isPasscodeValid = checkIsPasscodeValid(login.passCode, PASSCODE_MAX_LENGTH);

    const title = (
      <View style={styles.instructionContainer}>
        <View style={styles.instructionFixWidth}>
          <Text style={styles.instructionHeader}>Please Enter Your Passcode.</Text>
        </View>
      </View>
    );

    return (
      <View style={styles.passCodeContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {title}
          <InputPasscode onInputChange={this.handleCodeInput} testID="input-pass-code" />
        </ScrollView>

        <View style={styles.passCodefooter}>
          <FormButton
            title="Login"
            disable={!isPasscodeValid}
            onPress={this.handleSubmitToLogin2}
          />
          <Text style={styles.forgotPassCode}>Forgot your passcode?</Text>
        </View>
        <LoadingModal isShow={isLoading} onDismiss={this.handleLoginError} />
      </View>
    );
  }
}

PassCodeFormFirebase.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  loginStore: PropTypes.shape({
    login: PropTypes.object.isRequired,
    saveInputChange: PropTypes.func.isRequired,
    loginWithToken: PropTypes.func.isRequired,
  }).isRequired,
};

export default inject('loginStore', 'accountStore')(observer(PassCodeFormFirebase));
