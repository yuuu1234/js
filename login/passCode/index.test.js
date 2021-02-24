import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'mobx-react';
import GlobalStoreV2 from '@src/stores/globalV2.store';
import PassCodeForm from './passCodeFormFirebase';
import Footer from './footer';
import { withPassCodeTemplate } from '../authTemplate/passCodeTemplate';
import LoginStore from '../store/login.store';

const store = new LoginStore();
const Screen = withPassCodeTemplate({ main: PassCodeForm, Footer });
it('Pass code screen should render correctly', async () => {
  const tree = renderer.create(
    <Provider loginStore={store} globalStoreV2={new GlobalStoreV2()}><Screen /></Provider>,
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
