import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import { withSMSCodeTemplate } from './smsCodeTemplate';

const MockHeader = () => <div testId="mock-header">Header</div>;
const MockMain = ({ handleNavigation }) => <div handleNavigation={handleNavigation} testId="mock-main">Main</div>;
const MockFooter = ({ handleNavigation }) => <div handleNavigation={handleNavigation} testId="mock-footer">Footer</div>;

MockMain.propTypes = { handleNavigation: PropTypes.func.isRequired };
MockFooter.propTypes = { handleNavigation: PropTypes.func.isRequired };

describe('withSMSCodeTemplate', () => {
  const params = {
    Header: MockHeader,
    Main: MockMain,
    Footer: MockFooter,
  };
  const props = {
    navigation: {
      navigate: jest.fn(),
    },
  };
  const WithAuthComponent = withSMSCodeTemplate(params);
  const component = (
    <WithAuthComponent {...props} />
  );
  let wrapper;

  beforeEach(() => {
    wrapper = mount(component);
  });

  it('should render component correctly', () => {
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should call navigate correctly', () => {
    const main = wrapper.find({ testId: 'mock-main' });
    main.props().handleNavigation('mock screen');

    expect(props.navigation.navigate).toHaveBeenCalledWith('mock screen');
  });
});
