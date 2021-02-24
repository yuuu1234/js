import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import { withAuthTemplate } from './formTemplate';

const MockHeader = () => <div testId="mock-header">Header</div>;
const MockForm = ({ handleNavigation }) => <div handleNavigation={handleNavigation} testId="mock-form">Form</div>;
const MockFooter = ({ handleNavigation }) => <div handleNavigation={handleNavigation} testId="mock-footer">Footer</div>;

MockForm.propTypes = { handleNavigation: PropTypes.func.isRequired };
MockFooter.propTypes = { handleNavigation: PropTypes.func.isRequired };

describe('withAuthTemplate', () => {
  let Platform;

  const params = {
    Header: MockHeader,
    Form: MockForm,
    Footer: MockFooter,
  };
  const props = {
    navigation: {
      navigate: jest.fn(),
    },
  };
  const WithAuthComponent = withAuthTemplate(params);
  const component = (
    <WithAuthComponent {...props} />
  );
  let wrapper;

  beforeEach(() => {
    Platform = require('react-native').Platform;
    wrapper = mount(component);
  });

  it('should render component correctly', () => {
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should call navigate correctly', () => {
    const form = wrapper.find({ testId: 'mock-form' });
    form.props().handleNavigation('mock screen');

    expect(props.navigation.navigate).toHaveBeenCalledWith('mock screen');
  });

  it('should set behavior to null if platform is not ios', () => {
    Platform.OS = 'android';
    wrapper = mount(component);
    const keyboard = wrapper.find('KeyboardAvoidingView');
    expect(keyboard.props().behavior).toEqual(null);
  });
});
