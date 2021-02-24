import { pathOr, prop } from 'ramda';

const loginErrors = {
  default: {
    title: 'Error',
    message: 'Internal server error',
    dropdownAlert: false,
    popup: true,
  },
};

const defaultError = prop('default')(loginErrors);

export const getLoginErrors = (errorResponse) => {
  const errorKey = pathOr('default', ['code'], errorResponse);
  const errorObj = pathOr(defaultError, [errorKey], loginErrors);

  return {
    error: {
      ...errorObj,
      message: errorObj.message || errorResponse.message || defaultError.message,
    },
  };
};
