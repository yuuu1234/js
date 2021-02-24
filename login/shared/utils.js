import { Alert } from 'react-native';
import { isPlainObject, get } from 'lodash';
import * as navigatorConstants from '../../../constants/navigatorConstants';

const handleHttpError = (error) => {
  const {
    title, message, dropdownAlert, popup,
  } = error;

  if (popup) {
    setTimeout(() => {
      Alert.alert(title, message);
    }, 500);
  }

  return message;
};

export const handleHttpResponse = (response) => {
  let result;
  if (isPlainObject(response) && response.error) {
    result = handleHttpError(response.error);
  } else {
    result = response;
  }
  return result;
};

export const handlePhoneNumberVerification = (result, { handleNavigation }) => {
  const noExist = get(result, 'noExist');
  if (noExist === false) {
    handleNavigation(navigatorConstants.SMSCodeLogin);
  }

  if (noExist === true) {
    setTimeout(() => {
      Alert.alert('Error', 'Phone number does not exist');
    }, 500);
  }
};
