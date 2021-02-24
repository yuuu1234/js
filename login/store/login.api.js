import { prefixPhoneNumber } from '@src/utils/numberHelper';
import { httpRequest } from '../../../core/httpRequest';
import { ApiEndpointPhase2, CustomerServiceApi, getCustomerApis } from '../../../constants/apiConstants';

export const loginUserByAPI = async ({ phoneNumber, passCode, countryCode }) => {
  const phoneNum = prefixPhoneNumber(countryCode + phoneNumber);
  const requestUrl = `${ApiEndpointPhase2}/${CustomerServiceApi.FakeLogin}/${phoneNum}`;
  const res = await httpRequest.get(requestUrl);
  return res;
};

export const loginWithToken = async () => {
  // Token will be injected to http headers thru SecureStore
  const res = await httpRequest.get(getCustomerApis({}).getUserInfo);
  return res;
};
