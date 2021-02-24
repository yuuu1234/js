import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { observer, inject } from 'mobx-react';
import InputPasscode from '../components/inputPasscode';
import styles from './style';

@observer
class PassCodeForm extends Component {
  handleCodeInput = (value, codes) => {
    const { loginStore: { saveInputChange } } = this.props;
    const passCode = codes.join('');
    saveInputChange({ passCode });
  }

  renderTitle = () => (
    <View style={styles.instructionContainer}>
      <View style={styles.instructionFixWidth}>
        <Text style={styles.instructionHeader}>Please Enter Your Passcode.</Text>
      </View>
    </View>
  )

  render() {
    return (
      <View>
        { this.renderTitle() }
        <InputPasscode onInputChange={this.handleCodeInput} testID="input-pass-code" />
      </View>
    );
  }
}

PassCodeForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  loginStore: PropTypes.shape({
    saveInputChange: PropTypes.func.isRequired,
  }).isRequired,
};

export default inject('loginStore')(observer(PassCodeForm));
