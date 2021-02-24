import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import styles from './style';

const withSMSCodeTemplate = ({
  Header, Main, Footer,
}) => {
  @observer
  class Screen extends React.Component {
    handleNavigation = (screenType) => {
      const { navigation } = this.props;
      navigation.navigate(screenType);
    }

    render() {
      return (
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
          { Header && <Header /> }
          { Main && <Main handleNavigation={this.handleNavigation} /> }
          { Footer && <Footer handleNavigation={this.handleNavigation} /> }
        </KeyboardAvoidingView>
      );
    }
  }

  Screen.propTypes = {
    navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  };

  return Screen;
};

export { withSMSCodeTemplate };
