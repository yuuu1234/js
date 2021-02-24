import React from 'react';
import { View } from 'react-native';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { inject } from 'mobx-react';
import i18next from 'i18next';
import passCodeScreen from './passCode';
import verifyPhoneNumberScreen from './phoneNumber';
import smsCodeScreen from './smsCode';
// import passCodeScreen from './passCode/passCodeFormFirebase'; // TODO: Enable SMS code login
// eslint-disable-next-line max-len
// import verifyPhoneNumberScreen from './phoneNumber/phoneNumberVerificationFirebase'; // TODO: Enable SMS code login
// import smsCodeScreen from './smsCode/SMSCodeFormFirebase'; // TODO: Enable SMS code login
import * as navigatorConstants from '../../constants/navigatorConstants';
import ChevronLeft from '../../../assets/svg/Chevron_Left.svg';
import { defaultNavigationOptions, backButtonStyles } from '../../styles';

const loginStack = createStackNavigator({
  [navigatorConstants.PasscodeLogin]: {
    screen: passCodeScreen,
    navigationOptions: ({ navigation }) => ({
      headerTitle: i18next.t('login.login_nav_title'),
      headerTitleStyle: defaultNavigationOptions.headerTitleStyleBlack,
      headerLeft: () => (
        <HeaderBackButton
          labelVisible={false}
          backImage={() => <View style={backButtonStyles.backButton}><ChevronLeft /></View>}
          onPress={() => {
            navigation.goBack(null);
          }}
        />
      ),
      headerShown: true,
    }),
  },

  [navigatorConstants.PhoneNumberLogin]: {
    screen: verifyPhoneNumberScreen,
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTitle: i18next.t('login.login_nav_title'),
      headerTitleStyle: defaultNavigationOptions.headerTitleStyleBlack,
      headerLeft: () => {
        const { clearAllData } = screenProps.loginStore;
        const onPress = () => {
          if (clearAllData) clearAllData();
          navigation.goBack(null);
        };
        return (
          <HeaderBackButton
            labelVisible={false}
            backImage={() => <View style={backButtonStyles.backButton}><ChevronLeft /></View>}
            onPress={onPress}
          />
        );
      },
      headerShown: true,
    }),
  },

  [navigatorConstants.SMSCodeLogin]: {
    screen: smsCodeScreen,
    navigationOptions: () => ({
      headerTitle: i18next.t('login.phone_verification_nav_title'),
      headerTitleStyle: defaultNavigationOptions.headerTitleStyleBlack,
      headerShown: true,
    }),
  },
},
{
  initialRouteName: navigatorConstants.PhoneNumberLogin,
  defaultNavigationOptions,
});

const LoginRouter = inject((stores) => ({
  screenProps: {
    ...stores,
  },
}))(loginStack);

export default LoginRouter;
