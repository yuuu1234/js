import React from 'react';
import renderer from 'react-test-renderer';

import InputPasscode from './index';

test('Input passcode renders correctly', () => {
  jest.useFakeTimers();
  const tree = renderer.create(<InputPasscode />).toJSON();
  expect(tree).toMatchSnapshot();
});
