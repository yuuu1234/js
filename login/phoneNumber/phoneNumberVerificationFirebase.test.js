import React, { useState as useStateMock, ReactElement } from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import * as firebase from 'firebase';
import { FIREBASE_ERROR_MESSAGES } from '@src/modules/login/smsCode/constants';
import { SMSCodeLogin } from '@src/constants/navigatorConstants';
import { Alert } from 'react-native';
import mockI18Next from 'react-i18next';
import PhoneNumberVerification, { COUNTRY_CODE_GB } from './phoneNumberVerificationFirebase';

jest.mock('react-i18next', () => ({
  withTranslation: () => (Component) => {
    /* eslint-disable-next-line */
    Component.defaultProps = { ...Component.defaultProps, t: () => '' };
    return Component;
  },
  useTranslation: jest.fn().mockReturnValue({ i18n: { changeLanguage: jest.fn() } }),
  Translation: () => <div />,
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));
jest.spyOn(Alert, 'alert');
let mockVerifyPhoneNumber = jest.fn().mockReturnValue('mock verifyId');
// eslint-disable-next-line prefer-arrow-callback
firebase.auth.PhoneAuthProvider = jest.fn().mockImplementation(function () {
  this.verifyPhoneNumber = mockVerifyPhoneNumber;
});

describe('PhoneNumberVerification', () => {
  const props = {
    navigation: {
      navigate: jest.fn(),
    },
    loginStore: {
      login: {},
      isLoading: false,
      saveInputChange: jest.fn(),
    },
  };
  const component = <PhoneNumberVerification {...props} />;
  let wrapper;

  const setState = jest.fn();
  useStateMock.mockImplementation((init) => [init, setState]);

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    wrapper = mount(component);
  });

  it('should render component correctly', () => {
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('verifyPhoneNumber', () => {
    it('should saveInputChange verifyId and phoneNumber if verifyId exist', async () => {
      const phoneNumberInput = wrapper.find('PhoneNumberInput');
      await phoneNumberInput.props().onPressVerify();

      expect(props.loginStore.saveInputChange).toHaveBeenCalledWith({ verifyId: 'mock verifyId' });
      expect(props.loginStore.saveInputChange).toHaveBeenCalledWith({ phoneNumber: null });
    });

    it('should not call saveInputChange if verifyId not exist', async () => {
      mockVerifyPhoneNumber = jest.fn().mockReturnValue(null);
      const phoneNumberInput = wrapper.find('PhoneNumberInput');
      await phoneNumberInput.props().onPressVerify();

      expect(props.loginStore.saveInputChange).toHaveBeenCalledTimes(0);
    });

    it('should catch error with matched code message', async () => {
      const code = 'auth/invalid-phone-number';
      mockVerifyPhoneNumber = jest.fn().mockImplementation(() => { throw new Error({ code }); });
    });

    it('should catch error correctly if error code not match', async () => {
      mockVerifyPhoneNumber = jest.fn().mockReturnValue(Promise.reject(new Error({ code: 1 })));
      const phoneNumberInput = wrapper.find('PhoneNumberInput');
      await phoneNumberInput.props().onPressVerify();

      expect(Alert.alert).toHaveBeenCalledWith('Error', FIREBASE_ERROR_MESSAGES.default);
    });
  });

  describe('onCountryChange', () => {
    it('onCountryChange should update countryCode and call i18n.changeLanguage with new language', () => {
      const phoneNumberInput = wrapper.find('PhoneNumberInput');
      const countryCode = '+86';
      phoneNumberInput.props().onCountryChange(countryCode);

      expect(setState).toHaveBeenCalledWith(countryCode);
    });

    it('onCountryChange should call changeLanguage with "en" if country code is COUNTRY_CODE_GB', () => {
      const phoneNumberInput = wrapper.find('PhoneNumberInput');
      const countryCode = COUNTRY_CODE_GB;
      phoneNumberInput.props().onCountryChange(countryCode);

      expect(setState).toHaveBeenCalledWith(countryCode);
    });
  });

  describe('useEffect login.verifyId', () => {
    it('should setIsLoading to false and navigate to SMSCodeLogin page', () => {
      wrapper.setProps({
        loginStore: {
          login: { verifyId: 'mock id' },
          isLoading: false,
          saveInputChange: jest.fn(),
        },
      });
      wrapper.update();

      expect(setState).toHaveBeenCalledWith(false);
      expect(props.navigation.navigate).toHaveBeenCalledWith(SMSCodeLogin);
    });
  });

  describe('FormButton', () => {
    it('should have onPress function', () => {
      const formButton = wrapper.find('FormButton');
      formButton.props().onPress();
      expect(formButton.props().onPress).toBeInstanceOf(Function);
    });
  });
});
