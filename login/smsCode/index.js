import { withSMSCodeTemplate } from '../authTemplate/smsCodeTemplate';
import SMSCodeForm from './smsCodeForm';
import Footer from './footer';

const SMSCodeScreen = withSMSCodeTemplate({ Main: SMSCodeForm, Footer });

export default SMSCodeScreen;
