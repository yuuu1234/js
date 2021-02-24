import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import {
  Alert, KeyboardAvoidingView, Text, TouchableOpacity, View,
} from 'react-native';
import { prefixBearerToken } from '@src/utils/helper';
import * as SecureStore from 'expo-secure-store';
import styles from '@modules/login/authTemplate/style';
import { FormButton } from '@src/components';
import CountDownTimer from '@src/components/countDownTimer';
import { PasscodeLogin } from '@src/constants/navigatorConstants';
import {
  FIREBASE_ERROR_MESSAGES,
  COUNTDOWN_TEXT,
  isSmsCodeValid,
  NUMBER_OF_DIGITS,
  SECONDS_LIMIT,
  UNITTEXT,
} from '@src/modules/login/smsCode/constants';

import { TOKEN } from '@src/constants';
import firebase from '../../../constants/firebase';
import SMSCodeInput from '../components/smsCodeInput/basicSMSCodeInput';

const SMSCodeFormFirebase = ({ navigation, loginStore: { login, saveInputChange } }) => {
  const [smsCode, setSmsCode] = useState('');
  const [isTimeUp, setIsTimeUp] = useState(false);

  function onResendSmsCodeClick() {

  }

  async function verifySmsCode() {
    if (login.verifyId && isSmsCodeValid(smsCode, NUMBER_OF_DIGITS)) {
      try {
        const credential = firebase.auth.PhoneAuthProvider.credential(login.verifyId, smsCode);
        const res = await firebase.auth().signInWithCredential(credential);
        if (res.user) {
          const accessToken = await res.user.getIdToken();
          if (accessToken) {
            await SecureStore.setItemAsync(TOKEN, prefixBearerToken(accessToken));
            saveInputChange({ verifyId: null });
            navigation.navigate(PasscodeLogin); // conveniently switching to next screen
          }
        }
      } catch (e) {
        console.log({ e });
        Alert.alert('Error', FIREBASE_ERROR_MESSAGES[e.code] || FIREBASE_ERROR_MESSAGES.default);
      }
    }
  }

  const countdownTimer = (
    <View style={styles.resendCodeContainer}>
      {isTimeUp ? (
        <TouchableOpacity
          testID="resend-code"
          onPress={onResendSmsCodeClick}
          style={styles.resendContainer}
          accessibilityLabel="btn-resendSMSCode"
        >
          <Text style={styles.resendButton}>Resend Code</Text>
        </TouchableOpacity>
      ) : (
        <CountDownTimer
          title={COUNTDOWN_TEXT}
          unitText={UNITTEXT}
          secondsLimit={SECONDS_LIMIT}
          onTimesUp={() => setIsTimeUp(true)}
        />
      )}
    </View>
  );

  const isCodeValid = isSmsCodeValid(smsCode, NUMBER_OF_DIGITS);

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <SMSCodeInput
        onInputChange={(code) => setSmsCode(code)}
        numberDigits={NUMBER_OF_DIGITS}
      />
      <View>
        {countdownTimer}
        <FormButton
          title="Verify"
          disable={!isCodeValid}
          onPress={verifySmsCode}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

SMSCodeFormFirebase.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  loginStore: PropTypes.shape({
    login: PropTypes.object.isRequired,
    saveInputChange: PropTypes.func.isRequired,
  }).isRequired,
};

export default inject('loginStore')(observer(SMSCodeFormFirebase));
