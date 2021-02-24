import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Alert,
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { FormButton, LoadingModal } from '../../../components';
import * as navigatorConstants from '../../../constants/navigatorConstants';
import styles from './style';

const mockLoginErrorTitle = 'Login Error';
const mockLoginErrorMsg = "Mobile phone number doesn't exist or password doesn't match";
@observer
class Footer extends Component {
  handleLoginSuccess = (res) => {
    const { globalStoreV2, handleNavigation } = this.props;
    const { accounts, id } = res;
    if (id) {
      const defaultAccount = accounts.find((account) => account.type === 'SAVING_ACCOUNT');
      globalStoreV2.setDefaultAccount(defaultAccount);
      globalStoreV2.setUserInfo(res);
      globalStoreV2.getTasks();
    }
    handleNavigation(navigatorConstants.Home);
  }

  handleLoginError = () => {
    const { loginStore: { login } } = this.props;
    if (login.error) {
      Alert.alert(mockLoginErrorTitle, mockLoginErrorMsg);
    }
  }

  handleSubmitToLogin = async () => {
    const { loginStore: { loginUser } } = this.props;

    const result = await loginUser();
    this.handleLoginSuccess(result);
  }

  render() {
    const { loginStore: { isLoading, passCodeValidation } } = this.props;
    const disable = !passCodeValidation;
    return (
      <View>
        <FormButton
          title="Login"
          disable={disable}
          onPress={this.handleSubmitToLogin}
        />
        <Text style={styles.forgotPassCode}>Forgot your passcode?</Text>
        <LoadingModal isShow={isLoading} onDismiss={this.handleLoginError} />
      </View>
    );
  }
}

Footer.propTypes = {
  handleNavigation: PropTypes.func.isRequired,
  loginStore: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    login: PropTypes.object.isRequired,
    passCodeValidation: PropTypes.bool.isRequired,
    isLoggingInUser: PropTypes.bool.isRequired,
    loginUser: PropTypes.func.isRequired,
  }).isRequired,
  globalStoreV2: PropTypes.shape({
    setUserInfo: PropTypes.func.isRequired,
    setDefaultAccount: PropTypes.func.isRequired,
    getTasks: PropTypes.func.isRequired,
  }).isRequired,
};

export default inject('loginStore', 'globalStoreV2')(observer(Footer));
