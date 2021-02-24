import React from 'react';
import {
  SafeAreaView, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import styles from './style';

const withAuthTemplate = ({ Header, Form, Footer }) => {
  @observer
  class Screen extends React.Component {
    handleNavigation = (screenType) => {
      const { navigation } = this.props;
      navigation.navigate(screenType);
    }

    render() {
      return (
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ flexGrow: 1 }}
            >
              {Header && <Header />}
              {Form && <Form handleNavigation={this.handleNavigation} />}
            </ScrollView>
            {Footer && <Footer handleNavigation={this.handleNavigation} />}
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }
  }

  Screen.propTypes = {
    navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
  };

  return Screen;
};

export { withAuthTemplate };
