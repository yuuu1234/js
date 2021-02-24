import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  View, Text, KeyboardAvoidingView, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { FormButton, LoadingModal } from '../../../components';
import * as navigatorConstants from '../../../constants/navigatorConstants';
import styles from './style';

const Footer = ({ handleNavigation, loginStore: { login, isLoading } }) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={-140}
  >
    <View style={styles.bottomButtonContainer}>
      <FormButton
        title="Continue"
        disable={!login.isPhoneNumberVerified}
        onPress={() => handleNavigation(navigatorConstants.PasscodeLogin)}
      />
      <Text style={styles.changedYourNumber}>Changed your number?</Text>
      <LoadingModal isShow={isLoading} />
    </View>
  </KeyboardAvoidingView>
);

Footer.propTypes = {
  handleNavigation: PropTypes.func.isRequired,
  loginStore: PropTypes.shape({
    login: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
};

export default inject('loginStore')(observer(Footer));
