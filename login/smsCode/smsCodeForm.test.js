import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import SMSCodeForm from './smsCodeForm';

describe('SMSCodeForm', () => {
  const props = {
    loginStore: {
      saveInputChange: jest.fn(),
    },
  };
  const component = <SMSCodeForm {...props} />;
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
      wrapper.find('SMSCodeInputWithFormatter').props().onInputChange(123);

      expect(props.loginStore.saveInputChange).toHaveBeenCalledWith({ smsCode: 123 });
    });
  });
});
