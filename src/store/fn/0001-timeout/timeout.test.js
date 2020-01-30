const timeout = require('./timeout');

jest.useFakeTimers();

// global.console = { log: jest.fn() };
global.console.log = jest.fn();
const fn = par => {
  console.log('Function called, par: ' + par);
};

describe('Testing timeout function', function () {

  it('should run initial functions when they are called within the specified time period', function () {
    const fn100 = timeout(100, fn);
    setTimeout(() => {
      fn100('must_be_called');
    }, 50);

    // todo: Write a valid test with timeouts

    expect(console.log).toBeCalledTimes(1);
  });

  it('should not run initial functions when they are called after the specified time period has finished', function () {
    const fn100 = timeout(100, fn);
    setTimeout(() => {
      fn100('must_not_be_called');
    }, 150);

    // todo: Write a valid test with timeouts

    expect(console.log).not.toBeCalled();
  });
});