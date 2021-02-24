import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Alert } from 'react-native';
import * as navigatorConstants from '../../../constants/navigatorConstants';
import Footer from './footer';

describe('Footer', () => {
  const props = {
    handleNavigation: jest.fn(),
    loginStore: {
      isLoading: false,
      login: {},
      passCodeValidation: true,
      isLoggingInUser: false,
      loginUser: jest.fn().mockReturnValue(
        {
          accounts: [
            { type: 'SAVING_ACCOUNT' },
            { type: 'OTHER' },
          ],
          id: 'id1',
        },
      ),
    },
    globalStoreV2: {
      setUserInfo: jest.fn(),
      setDefaultAccount: jest.fn(),
      getTasks: jest.fn(),
    },
  };
  const component = <Footer {...props} />;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(component);
  });

  it('should render component correctly', () => {
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('handleSubmitToLogin', () => {
    it('should handleSubmitToLogin should call setDefaultAccount and setUserInfo with result from loginUser api if id and defaultAccount exist', async () => {
      const formButton = wrapper.find('FormButton');
      await formButton.props().onPress();

      expect(props.globalStoreV2.setDefaultAccount).toHaveBeenCalledWith({ type: 'SAVING_ACCOUNT' });
      expect(props.globalStoreV2.setUserInfo).toHaveBeenCalledWith({
        accounts: [
          { type: 'SAVING_ACCOUNT' },
          { type: 'OTHER' },
        ],
        id: 'id1',
      });
      expect(props.globalStoreV2.getTasks).toHaveBeenCalled();
      expect(props.handleNavigation).toHaveBeenCalledWith(navigatorConstants.Home);
    });

    it('should not call setDefaultAccount, setUserInfo and getTasks if id not exist', async () => {
      wrapper.setProps({
        ...props,
        loginStore: {
          isLoading: false,
          login: {},
          passCodeValidation: true,
          isLoggingInUser: false,
          loginUser: jest.fn().mockReturnValue(
            {
              accounts: [
                { type: 'SAVING_ACCOUNT' },
                { type: 'OTHER' },
              ],
              id: '',
            },
          ),
        },
      });
      wrapper.update();
      const formButton = wrapper.find('FormButton');
      await formButton.props().onPress();

      expect(props.globalStoreV2.setDefaultAccount).not.toHaveBeenCalled();
      expect(props.globalStoreV2.setUserInfo).not.toHaveBeenCalled();
      expect(props.globalStoreV2.getTasks).not.toHaveBeenCalled();
      expect(props.handleNavigation).toHaveBeenCalledWith(navigatorConstants.Home);
    });
  });

  describe('handleLoginError', () => {
    it('should Alert error if login.error exist', () => {
      const spy = jest.spyOn(Alert, 'alert');
      wrapper.setProps({ loginStore: { login: { error: 'mockError' }, isLoading: true } });
      wrapper.update();
      wrapper.find('LoadingModalComponent').props().onDismiss();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should do nothing if login.error is empty', () => {
      const spy = jest.spyOn(Alert, 'alert');
      wrapper.setProps({ loginStore: { login: { error: '' }, isLoading: true } });
      wrapper.update();
      wrapper.find('LoadingModalComponent').props().onDismiss();

      expect(spy).toHaveBeenCalledTimes(0);
    });
  });
});
