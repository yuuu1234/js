import React, { useRef, useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import {
  View, ScrollView, Text, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { prefixPhoneNumber } from '@src/utils/numberHelper';
import { FIREBASE_ERROR_MESSAGES } from '@src/modules/login/smsCode/constants';
import { SMSCodeLogin } from '@src/constants/navigatorConstants';
import PhoneNumberInput from '../components/PhoneNumberInput';
import { FormButton, LoadingModal, TranslationText } from '../../../components';
import firebase from '../../../constants/firebase';
import styles from './style';

const loginTitle = 'Login into your Existing Nou Account';

export const COUNTRY_CODE_GB = '+44';

const PhoneNumberVerification = ({
  navigation,
  loginStore: { login, saveInputChange },
}) => {
  const { i18n } = useTranslation();

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [countryCode, setCountryCode] = useState('+852');
  const [isLoading, setIsLoading] = useState(false);
  const recaptchaVerifierRef = useRef(null);

  useEffect(() => {
    if (login.verifyId) {
      setIsLoading(false);
      navigation.navigate(SMSCodeLogin);
    }
  }, [login.verifyId]);

  const verifyPhoneNumber = async () => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      setIsLoading(true);
      const verifyId = await phoneProvider.verifyPhoneNumber(
        prefixPhoneNumber(`${countryCode + phoneNumber}`),
        recaptchaVerifierRef.current,
      );
      if (verifyId) {
        saveInputChange({ verifyId });
        saveInputChange({ phoneNumber });
      }
    } catch (e) {
      Alert.alert('Error', FIREBASE_ERROR_MESSAGES[e.code] || FIREBASE_ERROR_MESSAGES.default);
    }
  };

  const onCountryChange = (code) => {
    setCountryCode(code);
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{loginTitle}</Text>
          <Text style={styles.description}>
            <TranslationText lng="hello" />
            <TranslationText lng="hello1" />
          </Text>
          <PhoneNumberInput
            isVerified={login.isPhoneNumberVerified}
            onCountryChange={onCountryChange}
            onInputChange={setPhoneNumber}
            onPressVerify={verifyPhoneNumber}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomButtonContainer}>
        <FormButton
          title="Continue"
          disable={!login.verifyId}
          onPress={() => {}}
        />
        <Text style={styles.changedYourNumber}>Changed your number?</Text>
        <LoadingModal isShow={isLoading} />
      </View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifierRef}
        firebaseConfig={firebase.app().options}
      />
    </>
  );
};

PhoneNumberVerification.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  loginStore: PropTypes.shape({
    login: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    saveInputChange: PropTypes.func.isRequired,
  }).isRequired,
};

export default inject('loginStore')(observer(PhoneNumberVerification));
