import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import PassCodeForm from './passCodeForm';

describe('PassCodeForm', () => {
  const props = {
    navigation: {
      navigate: jest.fn(),
    },
    loginStore: {
      saveInputChange: jest.fn(),
    },
  };
  const component = <PassCodeForm {...props} />;
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
});
