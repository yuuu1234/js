import React from 'react';
import { View, ScrollView } from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import styles from './style';

const withPassCodeTemplate = ({ Header, Main, Footer }) => {
  @observer
  class Screen extends React.Component {
    handleNavigation = (screenType) => {
      const { navigation } = this.props;
      navigation.navigate(screenType);
    }

    render() {
      return (
        <View style={styles.passCodeContainer}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            { Header && <Header /> }
            { Main && <Main handleNavigation={this.handleNavigation} /> }
          </ScrollView>
          { Footer && (
            <View style={styles.passCodeFooter}>
              <Footer handleNavigation={this.handleNavigation} />
            </View>
          ) }
        </View>
      );
    }
  }

  Screen.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  return Screen;
};

export { withPassCodeTemplate };
