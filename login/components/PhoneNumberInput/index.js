import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { mapPhoneNumberDigits, checkPhoneNumber } from '@src/utils';
import HongKongIcon from '@assets/svg/HongKong_Icon.svg';
import UKIcon from '@assets/svg/UK_Icon.svg';
import Verified from '@assets/svg/Verified.svg';
// import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { withTranslation } from 'react-i18next';
import {
  DropDown, InputField, KeyboardType, RulesCheck,
} from '../../../../components';
import CountryListModal from '../../../../components/countryListModal';
import styles from '../../phoneNumber/style';

const PhoneNumberMaxDigits = 12;
const defaultCountryCode = '+852';
const countryFlags = new Map([
  ['+852', <HongKongIcon />],
  ['+44', <UKIcon />],
  ['default', <HongKongIcon />],
]);

const VerifyButton = ({
  UI, onPress,
}) => {
  const {
    disabled, style, verifiedSymbol, text, label,
  } = UI;

  return (
    <TouchableOpacity
      style={style}
      disabled={disabled}
      accessibilityLabel={label}
      onPress={onPress}
    >
      {verifiedSymbol}
      <Text style={styles.textVerify}>{text}</Text>
    </TouchableOpacity>
  );
};

VerifyButton.propTypes = {
  /* eslint-disable-next-line */
  UI: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};

@observer
class PhoneNumberInput extends React.Component {
  constructor() {
    super();
    this.state = {
      countryListModalVisible: false,
      countryCode: defaultCountryCode,
      phoneNumber: '',
      digits: mapPhoneNumberDigits(defaultCountryCode),
      isValid: false,
    };
    this.inputRef = React.createRef();
  }

  getVerifyButtonUI() {
    const { isValid } = this.state;
    const { t, isVerified } = this.props;
    const disabled = isVerified || !isValid;
    const verifyButtonStyle = isValid
      ? styles.verifyButton : [styles.verifyButton, styles.buttonDisabled];
    const style = isVerified ? styles.verifiedButton : verifyButtonStyle;
    const verifiedSymbol = isVerified ? <Verified /> : null;
    const text = t(`login.phone_verification_${isVerified ? 'verified' : 'verify'}_button`);
    const label = isVerified ? 'btn-verifiedUserSMSCode' : 'btn-navigateUserSMSCodeScreen';

    return {
      disabled, style, verifiedSymbol, text, label,
    };
  }

  handleSelectCountry = (country) => {
    const { onCountryChange } = this.props;

    this.setState((state) => {
      const digits = mapPhoneNumberDigits(country.diallingCode);

      return {
        countryListModalVisible: !state.countryListModalVisible,
        countryCode: country.diallingCode,
        digits,
        isValid: checkPhoneNumber(state.phoneNumber, digits),
      };
    });
    onCountryChange(country.diallingCode);
    setTimeout(() => {
      this.inputRef.current.focus();
    }, 0);
  }

  handleSwitchCountryListModal = () => {
    this.setState((prevState) => ({
      countryListModalVisible: !prevState.countryListModalVisible,
    }));
  }

  handleInputOnChange = (phoneNumber) => {
    const { onInputChange } = this.props;

    this.setState((state) => ({
      phoneNumber,
      isValid: checkPhoneNumber(phoneNumber, state.digits),
    }));
    onInputChange(phoneNumber);
  }

  handleOnPressVerify = () => {
    const { countryCode, phoneNumber } = this.state;
    const { onPressVerify } = this.props;

    onPressVerify({ countryCode, phoneNumber });
  }

  render() {
    const { t } = this.props;
    const {
      countryCode, phoneNumber, digits, countryListModalVisible,
    } = this.state;
    const countryFlag = countryFlags.get(countryCode) || countryFlags.get('default');

    return (
      <View style={styles.containerRow}>
        <CountryListModal
          modalVisible={countryListModalVisible}
          onCountryPress={this.handleSelectCountry}
          onCloseModal={this.handleSwitchCountryListModal}
        />
        <DropDown
          title={t('login.phone_verification_country')}
          value={countryCode}
          onPress={this.handleSwitchCountryListModal}
        >
          {countryFlag}
        </DropDown>
        <View style={styles.inputFieldRow}>
          <InputField
            customRef={this.inputRef}
            placeholder={t('login.phone_verification_input_placeholder')}
            defaultValue={phoneNumber}
            customStyle={styles.inputFieldRowChild}
            keyboard={KeyboardType.Phone}
            maxLength={PhoneNumberMaxDigits}
            rules={RulesCheck.PhoneNumber}
            exactlyDigits={digits}
            onChangeInputText={(text) => this.handleInputOnChange(text)}
            /* eslint-disable-next-line */
            onDoneEditing={this.props.onDoneEditing}
          />
          <VerifyButton
            UI={this.getVerifyButtonUI()}
            onPress={this.handleOnPressVerify}
          />
        </View>
      </View>
    );
  }
}

PhoneNumberInput.propTypes = {
  onCountryChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onPressVerify: PropTypes.func.isRequired,
  isVerified: PropTypes.bool.isRequired,
  onDoneEditing: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(PhoneNumberInput);
