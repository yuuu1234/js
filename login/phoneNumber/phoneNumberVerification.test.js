import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import mockI18Next from 'react-i18next';
import PhoneNumberVerification, { COUNTRY_CODE_GB } from './phoneNumberVerification';

jest.unmock('../shared/utils');
jest.mock('react-i18next', () => ({
  withTranslation: () => (Component) => {
    /* eslint-disable-next-line */
    Component.defaultProps = { ...Component.defaultProps, t: () => '' };
    return Component;
  },
  useTranslation: jest.fn().mockReturnValue({ i18n: { changeLanguage: jest.fn() }, t: jest.fn() }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

const mockUtils = require('../shared/utils');

mockUtils.handleHttpResponse = jest.fn();
mockUtils.handlePhoneNumberVerification = jest.fn();

describe('PhoneNumberVerification', () => {
  const props = {
    handleNavigation: jest.fn(),
    loginStore: {
      login: {},
      saveInputChange: jest.fn(),
      getSMSCodeRequest: jest.fn().mockReturnValue('123'),
    },
  };
  const component = <PhoneNumberVerification {...props} />;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(component);
  });

  it('should render component correctly', () => {
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('onPressVerifyPhoneNumber', () => {
    it('onPressVerifyPhoneNumber should call handleHttpResponse with sms code and pass response to handlePhoneNumberVerification', async () => {
      mockUtils.handleHttpResponse = jest.fn().mockReturnValue('mock result');
      const phoneNumberInput = wrapper.find('PhoneNumberInput');
      await phoneNumberInput.props().onPressVerify();
      const { handleNavigation } = props;

      expect(props.loginStore.getSMSCodeRequest).toHaveBeenCalled();
      expect(mockUtils.handleHttpResponse).toHaveBeenCalledWith('123');
      expect(mockUtils.handlePhoneNumberVerification).toHaveBeenCalledWith('mock result', { handleNavigation });
    });
  });

  describe('onCountryChange', () => {
    it('onCountryChange should update countryCode and call i18n.changeLanguage with new language', () => {
      const phoneNumberInput = wrapper.find('PhoneNumberInput');
      const countryCode = '+86';
      phoneNumberInput.props().onCountryChange(countryCode);

      expect(props.loginStore.saveInputChange).toHaveBeenCalledWith({ countryCode }, 'phoneNumber');
    });

    it('onCountryChange should call changeLanguage with "en" if country code is COUNTRY_CODE_GB', () => {
      const phoneNumberInput = wrapper.find('PhoneNumberInput');
      const countryCode = COUNTRY_CODE_GB;
      phoneNumberInput.props().onCountryChange(countryCode);

      expect(props.loginStore.saveInputChange).toHaveBeenCalledWith({ countryCode }, 'phoneNumber');
    });
  });

  describe('onInputChange', () => {
    it('should call saveInputChange with phoneNumber', () => {
      const phoneNumberInput = wrapper.find('PhoneNumberInput');
      const mockPhone = 12345;
      phoneNumberInput.props().onInputChange(mockPhone);

      expect(props.loginStore.saveInputChange).toHaveBeenCalledWith({ phoneNumber: 12345 }, 'phoneNumber');
    });
  });
});
