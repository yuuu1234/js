import { observable, action } from 'mobx';

const inputCodes = observable({ codes: [] });

inputCodes.addOneCode = action((code) => {
  inputCodes.codes.push(code);
});

inputCodes.deleteOneCode = action(() => {
  inputCodes.codes.pop();
});

inputCodes.clearAll = action(() => {
  if (inputCodes.codes) {
    inputCodes.codes.length = 0;
  }
});

export default inputCodes;
