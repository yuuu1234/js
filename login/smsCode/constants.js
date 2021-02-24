import numeral from 'numeral';

export const COUNTDOWN_TEXT = 'Code Expires in';
export const UNITTEXT = 'secs';
export const SECONDS_LIMIT = 60;
export const NUMBER_OF_DIGITS = 6;
export const TITLE_USER_SMS_INPUT_SCREEN = 'We Are Sending You An SMS Code';
export const FIREBASE_ERROR_MESSAGES = {
  'auth/invalid-phone-number': 'The phone number is too long.',
  'auth/invalid-verification-code': 'The SMS code is invalid. Please double check or resend it.',
  default: 'There has been an error processing your request.',
};

export function isSmsCodeValid(code, length) {
  return code && code.length === length && code === numeral(code).value().toString();
}
