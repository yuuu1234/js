import { withAuthTemplate } from '../authTemplate/formTemplate';
import phoneNumberVerification from './phoneNumberVerification';
import Footer from './footer';

const PhoneNumberLogin = withAuthTemplate({ Form: phoneNumberVerification, Footer });

export default PhoneNumberLogin;
