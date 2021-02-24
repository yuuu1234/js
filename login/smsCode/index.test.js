import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Provider } from 'mobx-react';
import SMSCodeForm from './smsCodeForm';
import Footer from './footer';
import { withSMSCodeTemplate } from '../authTemplate/smsCodeTemplate';
import LoginStore from '../store/login.store';

const store = new LoginStore();
const Screen = withSMSCodeTemplate({ Main: SMSCodeForm, Footer });
it('SMSCodeScreen should render correctly', async () => {
  let tree;
  jest.useFakeTimers();
  await act(async () => {
    tree = await renderer
      .create(<Provider loginStore={store}><Screen /></Provider>)
      .toJSON();
  });

  expect(tree).toMatchSnapshot();
});
