import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import * as navigatorConstants from '@src/constants/navigatorConstants';
import PassCodeFormFirebase, { checkIsPasscodeValid } from './passCodeFormFirebase';

describe('PassCodeFormFirebase', () => {
  const props = {
    navigation: {
      navigate: jest.fn(),
    },
    loginStore: {
      login: {},
      saveInputChange: jest.fn(),
      loginWithToken: jest.fn().mockReturnValue(Promise.resolve('mock token')),
    },
    accountStore: {
      defaultAccountDetail: {},
    },
  };
  const component = <PassCodeFormFirebase {...props} />;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(component);
  });

  it('should render component correctly', () => {
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('handleCodeInput', () => {
    it('should call saveInputChange with joined string', () => {
      wrapper.find({ testID: 'input-pass-code' }).props().onInputChange('', [1, 2, 3]);

      expect(props.loginStore.saveInputChange).toHaveBeenCalledWith({ passCode: '123' });
    });
  });

  describe('handleSubmitToLogin2', () => {
    it('should do nothing if res not exist', async () => {
      wrapper.setProps({
        navigation: {
          navigate: jest.fn(),
        },
        loginStore: {
          login: {},
          saveInputChange: jest.fn(),
          loginWithToken: jest.fn().mockReturnValue(Promise.resolve('')),
        },
        accountStore: {
          defaultAccountDetail: {},
        },
      });
      wrapper.update();
      await wrapper.find('FormButton').props().onPress();

      expect(props.navigation.navigate).toHaveBeenCalledTimes(0);
    });

    it('should do nothing if res exist but defaultAccount not exist', async () => {
      wrapper.setProps({
        navigation: {
          navigate: jest.fn(),
        },
        loginStore: {
          login: {},
          saveInputChange: jest.fn(),
          loginWithToken: jest.fn().mockReturnValue(Promise.resolve('mock token')),
        },
        accountStore: {
          defaultAccountDetail: null,
        },
      });
      wrapper.update();
      await wrapper.find('FormButton').props().onPress();

      expect(props.navigation.navigate).toHaveBeenCalledTimes(0);
    });

    it('should navigate to Home if res exist and defaultAccount exist', async () => {
      const navigateSpy = jest.fn();
      wrapper.setProps({
        navigation: {
          navigate: navigateSpy,
        },
        loginStore: {
          login: {},
          saveInputChange: jest.fn(),
          loginWithToken: jest.fn().mockReturnValue(Promise.resolve('mock token')),
        },
        accountStore: {
          defaultAccountDetail: 'mock default account',
        },
      });
      wrapper.update();
      await wrapper.find('FormButton').props().onPress();

      expect(navigateSpy).toHaveBeenCalledWith(navigatorConstants.Home);
    });
  });

  describe('checkIsPasscodeValid', () => {
    it('should return code\'s length equal to length in paramter or not', () => {
      expect(checkIsPasscodeValid(123, 3)).toBeTruthy();
      expect(checkIsPasscodeValid(123, 4)).toBeFalsy();
    });
  });
});
