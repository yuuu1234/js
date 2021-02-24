import { withPassCodeTemplate } from '../authTemplate/passCodeTemplate';
import PassCodeForm from './passCodeForm';
import Footer from './footer';

const PassCodeScreen = withPassCodeTemplate({ Main: PassCodeForm, Footer });

export default PassCodeScreen;
