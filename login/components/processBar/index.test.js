import React from 'react';
import renderer from 'react-test-renderer';

import ProgressBar from './';

test('ProgressBar screen renders correctly', () => {
  const tree = renderer.create(<ProgressBar index={0} />).toJSON();
  expect(tree).toMatchSnapshot();
});
