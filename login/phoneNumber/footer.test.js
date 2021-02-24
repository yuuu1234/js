import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Footer from './footer';
import * as navigatorConstants from '../../../constants/navigatorConstants';

describe('Footer', () => {
  const props = {
    loginStore: {
      login: { isPhoneNumberVerified: true },
      isLoading: false,
    },
    handleNavigation: jest.fn(),
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

  it('should call navigate with PasscodeLogin if user press FormButton', () => {
    const formButton = wrapper.find('FormButton');
    formButton.simulate('click');

    expect(props.handleNavigation).toHaveBeenCalledWith(navigatorConstants.PasscodeLogin);
  });

  it('should set LoadingModal isShow to true if isLoading is true', () => {
    let loadingModal = wrapper.find('LoadingModalComponent');
    expect(loadingModal.props().isShow).toBeFalsy();

    wrapper.setProps({ loginStore: { login: { isPhoneNumberVerified: true }, isLoading: true } });
    wrapper.update();
    loadingModal = wrapper.find('LoadingModalComponent');

    expect(loadingModal.props().isShow).toBeTruthy();
  });

  it('should disable FormButton if isPhoneNumberVerified is false', () => {
    let formButton = wrapper.find('FormButton');
    expect(formButton.props().disable).toBeFalsy();

    wrapper.setProps({ loginStore: { login: { isPhoneNumberVerified: false } } });
    wrapper.update();
    formButton = wrapper.find('FormButton');

    expect(formButton.props().disable).toBeTruthy();
  });
});
