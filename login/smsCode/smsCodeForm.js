import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import SMSCodeInput from '../components/smsCodeInput';
import { NUMBER_OF_DIGITS } from './constants';

const SMSCodeForm = ({ loginStore: { saveInputChange } }) => (
  <SMSCodeInput
    onInputChange={(smsCode) => saveInputChange({ smsCode })}
    numberDigits={NUMBER_OF_DIGITS}
  />
);

SMSCodeForm.propTypes = {
  loginStore: PropTypes.shape({
    saveInputChange: PropTypes.func.isRequired,
  }).isRequired,
};

export default inject('loginStore')(observer(SMSCodeForm));
