import React from 'react';
import { Platform } from 'react-native';
import renderer from 'react-test-renderer';
import SMSCodeInput from './index';

test('User sms Code screen renders correctly', async () => {
  const numberDigits = 4;
  const onCanVerifySMSCode = jest.fn();
  const onCanNotVerifySMSCode = jest.fn();
  const keyboardType = Platform.OS === 'ios' ? 'number-pad' : 'numeric';
  const tree = renderer
    .create(
      <SMSCodeInput
        numberDigits={numberDigits}
        onCanVerifySMSCode={onCanVerifySMSCode}
        onCanNotVerifySMSCode={onCanNotVerifySMSCode}
        keyboardType={keyboardType}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
