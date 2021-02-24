import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'mobx-react';
import PhoneNumberForm from './phoneNumberVerification';
import Footer from './footer';
import { withAuthTemplate } from '../authTemplate/formTemplate';
import LoginStore from '../store/login.store';

const store = new LoginStore();
const Screen = withAuthTemplate({ Form: PhoneNumberForm, Footer });
it('Login screen should render correctly', async () => {
  const tree = renderer.create(<Provider loginStore={store}><Screen /></Provider>).toJSON();

  expect(tree).toMatchSnapshot();
});
