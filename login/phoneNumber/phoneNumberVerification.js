import React from 'react';
import { inject, observer } from 'mobx-react';
import { View, ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import PhoneNumberInput from '../components/PhoneNumberInput';
import styles from './style';
import { handleHttpResponse, handlePhoneNumberVerification } from '../shared/utils';

export const COUNTRY_CODE_GB = '+44';

const PhoneNumberVerification = ({
  handleNavigation,
  loginStore: { login, saveInputChange, getSMSCodeRequest },
}) => {
  const { i18n, t } = useTranslation();
  const onPressVerifyPhoneNumber = async () => {
    const response = await getSMSCodeRequest();
    const result = handleHttpResponse(response);
    handlePhoneNumberVerification(result, { handleNavigation });
  };

  const onCountryChange = (countryCode) => {
    saveInputChange({ countryCode }, 'phoneNumber');
  };

  const onInputChange = (phoneNumber) => {
    saveInputChange({ phoneNumber }, 'phoneNumber');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          {t('login.phone_verification_title')}
        </Text>
        <Text style={styles.description}>
          {t('login.phone_verification_desc')}
        </Text>
        <PhoneNumberInput
          isVerified={login.isPhoneNumberVerified}
          onCountryChange={onCountryChange}
          onInputChange={onInputChange}
          onPressVerify={onPressVerifyPhoneNumber}
        />
      </View>
    </ScrollView>
  );
};

PhoneNumberVerification.propTypes = {
  handleNavigation: PropTypes.func.isRequired,
  loginStore: PropTypes.shape({
    login: PropTypes.object.isRequired,
    saveInputChange: PropTypes.func.isRequired,
    getSMSCodeRequest: PropTypes.func.isRequired,
  }).isRequired,
};

export default inject('loginStore')(observer(PhoneNumberVerification));
