const cancelable = require('./cancelable');

/** @type {jest.Mock} */
const logMock = console.log = jest.fn();

const fn = par => {
  console.log(par);
};

describe('Testing cancelable function', function () {

  it('should run when not cancelled and must not run when have been cancelled', function () {
    const c_fn = cancelable(fn);

    c_fn('first');
    expect(logMock).toBeCalledWith('first');
    c_fn.cancel();
    c_fn('second');
    expect(logMock).not.toBeCalledWith('second');
    expect(logMock).toBeCalledTimes(1);
  });
});