// External Dependencies
import {
  observable, flow, action, computed,
} from 'mobx';
import * as R from 'ramda';

// Internal Dependencies
import { loginUserByAPI, loginWithToken } from './login.api';
import { verifyPhoneNumber } from '../../onboarding/store/onboarding.api';
import { HttpStatusCode } from '../../../constants/enums';
import { getLoginErrors } from './login.error';

const defaultCountryCode = '+852';
const initialLoginState = {
  isPhoneNumberVerified: false,
  isLoading: false,
  countryCode: defaultCountryCode,
  phoneNumber: '',
  smsCode: '',
  verifyId: '',
  passCode: '',
  error: '',
};
class AuthStore {
  @observable login = initialLoginState;

  @observable isLoading = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action saveInputChange = (payload, type) => {
    this.login = { ...this.login, ...payload };
    if (type === 'phoneNumber') this.login.isPhoneNumberVerified = false;
  };

  @computed get passCodeValidation() {
    return R.pathEq(['login', 'passCode', 'length'], 6)(this);
  }

  @computed get smsCodeValidation() {
    return R.pathEq(['login', 'smsCode', 'length'], 6)(this);
  }

  @action clearAllData = () => {
    this.login = initialLoginState;
  };

  @action clearSMSCode = () => {
    this.login.smsCode = '';
  };

  getSMSCodeRequest = flow(
    function* () {
      const { phoneNumber, countryCode } = this.login;
      const number = countryCode + phoneNumber; // to do: regulate phone number format
      this.isLoading = true;
      let result;
      const res = yield verifyPhoneNumber({ phoneNumber: number });
      const data = R.path(['data', 'data'], res);
      const error = R.path(['data', 'error'], res);
      const status = R.path(['status'], res);
      if (status === HttpStatusCode.SUCCESS) {
        if (error) {
          result = getLoginErrors(error);
        } else {
          result = { noExist: data };
        }
      } else {
        result = getLoginErrors();
      }
      this.isLoading = false;
      return result;
    }.bind(this),
  );

  // mock
  @action verifyPhoneNumber = () => new Promise((resolve, reject) => {
    if (this.login.smsCode.length === 6) {
      this.login.isPhoneNumberVerified = true;
      resolve({ isVerified: true });
    } else {
      reject(Error('Your number is not recognized as a registered user'));
    }
  });

  // resendSMSCodeRequest = () => { }

  /* eslint func-names: 0 */
  loginUser = flow(
    function* (params = {}) {
      this.isLoading = true;
      this.login.isPhoneNumberVerified = false;
      let result;
      const { phoneNumber, countryCode, passCode } = this.login;

      const res = yield loginUserByAPI({
        phoneNumber: params.phoneNumber || phoneNumber,
        passCode: params.passCode || passCode,
        countryCode: params.countryCode || countryCode,
      });
      const data = R.path(['data'], res);
      const error = R.path(['error'], res);

      if (error) {
        result = getLoginErrors(error);
        this.login.error = result;
      } else {
        const userInfo = {
          ...data,
          userId: data.customerId,
          fakeUserId: data.id,
          address: data.address[0],
        };
        this.rootStore.globalStoreV2.setUserInfo(data);
        yield this.rootStore.globalStore.fetchAllCustomerData({
          phoneNumber: phoneNumber || params.phoneNumber,
          countryCode,
        });
        result = data;
      }
      this.isLoading = false;
      return result;
    }.bind(this),
  );

  /* eslint func-names: 0 */
  loginWithToken = flow(
    // eslint-disable-next-line consistent-return
    function* () {
      try {
        const res = yield loginWithToken();
        if (res) {
          const userInfo = {
            ...res,
            userId: res.customerId,
            address: res.address[0],
          };
          yield this.rootStore.globalStore.fetchAllCustomerData({
            phoneNumber: res.phone,
            countryCode: res.countryCode,
          });
          return res;
        }
      } catch (error) {
        console.log(error);
      }
    }.bind(this),
  );
}

export default AuthStore;
