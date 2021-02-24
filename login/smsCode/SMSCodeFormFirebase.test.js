import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import * as navigatorConstants from '@src/constants/navigatorConstants';
import { Alert } from 'react-native';
import * as firebase from 'firebase';
import * as SecureStore from 'expo-secure-store';
import { act } from 'react-dom/test-utils';
import SMSCodeFormFirebase from './SMSCodeFormFirebase';

jest.spyOn(Alert, 'alert');
describe('SMSCodeFormFirebase', () => {
  const props = {
    navigation: {
      navigate: jest.fn(),
    },
    loginStore: {
      login: { verifyId: 123 },
      saveInputChange: jest.fn(),
    },
    accountStore: {
      defaultAccountDetail: {},
    },
  };
  const component = <SMSCodeFormFirebase {...props} />;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(component);
  });

  it('should render component correctly', () => {
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('isTimeUp', () => {
    it('should render CountDownTimer by default', () => {
      const countDownTimer = wrapper.find('CountdownTimer');
      const resendCode = wrapper.find({ testID: 'resend-code' });

      expect(countDownTimer.exists()).toBeTruthy();
      expect(resendCode.exists()).toBeFalsy();
    });

    it('should render resendCode if time is up', () => {
      let countDownTimer = wrapper.find('CountdownTimer');
      let resendCode = wrapper.find({ testID: 'resend-code' });

      expect(countDownTimer.exists()).toBeTruthy();
      expect(resendCode.exists()).toBeFalsy();

      countDownTimer.props().onTimesUp();
      wrapper.update();
      countDownTimer = wrapper.find('CountdownTimer');
      resendCode = wrapper.find({ testID: 'resend-code' });

      expect(countDownTimer.exists()).toBeFalsy();
      expect(resendCode.exists()).toBeTruthy();
    });

    it('should call onResendSmsCodeClick if user click resend', () => {
      let countDownTimer = wrapper.find('CountdownTimer');
      let resendCode = wrapper.find({ testID: 'resend-code' });
      countDownTimer.props().onTimesUp();
      wrapper.update();
      countDownTimer = wrapper.find('CountdownTimer');
      resendCode = wrapper.find({ testID: 'resend-code' }).at(0);
      resendCode.simulate('click');
      expect(resendCode.exists()).toBeTruthy();
    });
  });

  describe('verifySmsCode', () => {
    firebase.auth.PhoneAuthProvider.credential = jest.fn().mockReturnValue('credential');
    firebase.auth().signInWithCredential = jest.fn().mockReturnValue({
      user: {
        getIdToken: jest.fn().mockReturnValue('idToken'),
      },
    });
    SecureStore.setItemAsync = jest.fn();
    it('should alert error message if something went wrong during sms validation', async () => {
      firebase.auth().signInWithCredential = jest.fn()
        .mockReturnValue(Promise.reject(new Error({ code: 1 })));
      const smsInput = wrapper.find('SMSCodeInput');
      smsInput.props().onInputChange('123456');
      const verifyButton = wrapper.find('FormButton');
      await verifyButton.simulate('click');

      expect(Alert.alert).toHaveBeenCalled();
    });

    it('should do nothing if smsCode not valid', async () => {
      const smsInput = wrapper.find('SMSCodeInput');
      smsInput.props().onInputChange('123');
      const verifyButton = wrapper.find('FormButton');
      await verifyButton.simulate('click');

      expect(Alert.alert).not.toHaveBeenCalled();
      expect(props.navigation.navigate).not.toHaveBeenCalled();
    });

    it('should do nothing if response not contain user', async () => {
      firebase.auth().signInWithCredential = jest.fn().mockReturnValue({});
      const smsInput = wrapper.find('SMSCodeInput');
      smsInput.props().onInputChange('123456');
      const verifyButton = wrapper.find('FormButton');
      await verifyButton.simulate('click');

      expect(Alert.alert).not.toHaveBeenCalled();
      expect(props.navigation.navigate).not.toHaveBeenCalled();
      expect(firebase.auth().signInWithCredential).toHaveBeenCalled();
      expect(firebase.auth.PhoneAuthProvider.credential).toHaveBeenCalled();
    });

    it('should do nothing if can not get access token', async () => {
      firebase.auth().signInWithCredential = jest.fn().mockReturnValue({
        user: {
          getIdToken: jest.fn().mockReturnValue(''),
        },
      });
      const smsInput = wrapper.find('SMSCodeInput');
      smsInput.props().onInputChange('123456');
      const verifyButton = wrapper.find('FormButton');
      await verifyButton.simulate('click');

      expect(Alert.alert).not.toHaveBeenCalled();
      expect(props.navigation.navigate).not.toHaveBeenCalled();
      expect(SecureStore.setItemAsync).not.toHaveBeenCalled();
      expect(firebase.auth().signInWithCredential).toHaveBeenCalled();
      expect(firebase.auth.PhoneAuthProvider.credential).toHaveBeenCalled();
    });

    it('should navigate to passCodeLogin page if all works fine', async () => {
      firebase.auth.PhoneAuthProvider.credential = jest.fn().mockReturnValue('credential');
      firebase.auth().signInWithCredential = jest.fn().mockReturnValue({
        user: {
          getIdToken: jest.fn().mockReturnValue('token'),
        },
      });
      const smsInput = wrapper.find('SMSCodeInput');
      smsInput.props().onInputChange('123456');
      const verifyButton = wrapper.find('FormButton');
      await act(async () => {
        await verifyButton.simulate('click');
      });

      expect(Alert.alert).not.toHaveBeenCalled();
      expect(SecureStore.setItemAsync).toHaveBeenCalled();
      expect(props.navigation.navigate).toHaveBeenCalled();
      expect(firebase.auth().signInWithCredential).toHaveBeenCalled();
      expect(firebase.auth.PhoneAuthProvider.credential).toHaveBeenCalled();
    });
  });
});
