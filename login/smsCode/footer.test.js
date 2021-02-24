import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import * as navigatorConstants from '../../../constants/navigatorConstants';
import Footer from './footer';

describe('Footer', () => {
  const props = {
    handleNavigation: jest.fn(),
    loginStore: {
      verifyPhoneNumber: jest.fn().mockReturnValue(Promise.resolve({ isVerified: true })),
      clearSMSCode: jest.fn(),
      smsCodeValidation: true,
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

  describe('CountdownTimer', () => {
    it('should render CountdownTimer by default', () => {
      const countDownTimer = wrapper.find('CountdownTimer');

      expect(countDownTimer.exists()).toBeTruthy();
    });

    it('should render resend code area if isResendCode is true', () => {
      const countDownTimer = wrapper.find('CountdownTimer');
      let resendCode = wrapper.find({ testID: 'resend-code' });
      countDownTimer.props().onTimesUp();
      expect(resendCode.exists()).toBeFalsy();

      wrapper.update();
      resendCode = wrapper.find({ testID: 'resend-code' });
      expect(resendCode.exists()).toBeTruthy();
    });

    it('should hide resend code area if user click resend', () => {
      const countDownTimer = wrapper.find('CountdownTimer');
      let resendCode = wrapper.find({ testID: 'resend-code' });
      countDownTimer.props().onTimesUp();
      wrapper.update();
      resendCode = wrapper.find({ testID: 'resend-code' }).at(0);
      resendCode.simulate('click');
      wrapper.update();
      resendCode = wrapper.find({ testID: 'resend-code' }).at(0);

      expect(resendCode.exists()).toBeFalsy();
      expect(countDownTimer.exists()).toBeTruthy();
    });
  });

  describe('handleVerifyCode', () => {
    it('should navigate to phone number login page if smsCodeValidation && res.isVerified', async () => {
      const verifyButton = wrapper.find('FormButton');
      await verifyButton.simulate('click');

      expect(props.loginStore.clearSMSCode).toHaveBeenCalled();
      expect(props.handleNavigation).toHaveBeenCalledWith(navigatorConstants.PhoneNumberLogin);
    });

    it('should do nothing if res.isVerified is false', async () => {
      wrapper.setProps({
        loginStore: {
          verifyPhoneNumber: jest.fn().mockReturnValue(Promise.resolve({ isVerified: false })),
          clearSMSCode: jest.fn(),
          smsCodeValidation: true,
        },
      });
      wrapper.update();
      const verifyButton = wrapper.find('FormButton');
      await verifyButton.simulate('click');

      expect(props.loginStore.clearSMSCode).not.toHaveBeenCalled();
      expect(props.handleNavigation).not.toHaveBeenCalled();
    });
  });
});
