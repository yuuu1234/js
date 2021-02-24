import React from 'react';
import _ from 'lodash';
import { __ } from 'ramda';
import { changeTextToShow } from '@src/utils';
import SMSCodeInput from './basicSMSCodeInput';

const digitFormatter = changeTextToShow(__, '*');
const SMSCodeInputWithFormatter = (props) => (
  <SMSCodeInput formatter={digitFormatter} {...props} />
);

export default SMSCodeInputWithFormatter;
