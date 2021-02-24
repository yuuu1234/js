import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import store from './store';
import { PASSCODE_MAX_LENGTH as passcodeLength } from '../../passCode/constants';
import styles from './style';
import FaceRecognizeButton from '../../../../../assets/svg/FaceRecognizeButton.svg';

// const passcodeLength = passcodeContants.PASSCODE_MAX_LENGTH;

const InputPasscode = observer(({ onInputChange }) => {
  useEffect(store.clearAll, []);
  // generate the dots for passcode
  const dots = () => {
    const genDots = [];
    for (let i = 0; i < passcodeLength; i += 1) {
      genDots.push(
        <View
          key={i}
          style={[
            styles.dot,
            i < store.codes.length
              ? styles.containedColor
              : styles.uncontainedColor,
          ]}
        />,
      );
    }
    return genDots;
  };

  // generate keyboard numbers from 1 to 9
  const numbers = () => (
    Array(3).fill().map((_, row) => (
      /* eslint-disable-next-line */
      <View key={`row ${row}`} style={styles.keyboardLineContainer}>
        {/* eslint-disable-next-line */}
        {Array(3).fill().map((_, col) => (
          /* eslint-disable-next-line */
          <View key={`col ${col}`} style={styles.keyContainer}>
            {/* eslint-disable-next-line */}
            <TouchableOpacity onPress={() => handleTap(col + 1 + 3 * row)}
              accessibilityLabel={`login-passCode-${col + 1 + 3 * row}`}
            >
              <View style={styles.oneKey}>
                <Text style={styles.numberFont}>{col + 1 + 3 * row}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    ))
  );

  const handleTap = (input) => {
    if (input === 'del') {
      store.deleteOneCode();
      onInputChange(input, store.codes);
      return;
    }
    if (store.codes.length < passcodeLength) {
      store.addOneCode(input);
      onInputChange(input, store.codes);
    }
  };

  // generate the last line of the keyboard
  const lastLine = () => (
    <View style={styles.keyboardLineContainer}>
      <View style={styles.keyContainer}>
        <View style={styles.blankBlock} />
      </View>
      <View style={styles.keyContainer}>
        <TouchableOpacity onPress={() => handleTap(0)} accessibilityLabel="login-passCode-0">
          <View style={styles.oneKey}>
            <Text style={styles.numberFont}>0</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.keyContainer}>
        <TouchableOpacity onPress={() => handleTap('del')} accessibilityLabel="login-passCode-del">
          <View style={styles.textContainer}>
            {store.codes.length > 0
              ? <Text style={styles.textFont}>Delete</Text> : <FaceRecognizeButton />}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <View style={styles.dotsContainer}>{dots()}</View>
      <View style={styles.keyboardContainer}>
        {numbers()}
        {lastLine()}
      </View>
    </View>
  );
});

export default InputPasscode;
