const timeout = require('./timeout');

jest.useFakeTimers();

/** @type {jest.Mock} */
const logMock = console.log = jest.fn();
const fn = par => {
  logMock(par);
};

describe('Testing timeout function', function () {

  beforeEach(() => {
    logMock.mockClear();
  });

  it('should run initial functions when they are called within the specified time period', () => {
    const fnMsec = 100;
    const waitMsec = 50;
    const message = 'must_be_called';
    const fn100 = timeout(fnMsec, fn);
    setTimeout(() => {
      fn100(message);
    }, waitMsec);

    expect(logMock).not.toBeCalled();
    jest.advanceTimersByTime(100000);
    expect(logMock).not.toBeCalledWith('Timeout reached');
    expect(logMock).toBeCalledWith(message);
  });

  it('should not run initial functions when they are called after the specified time period has passed', () => {
    const fnMsec = 100;
    const waitMsec = 150;
    const message = 'not_to_be_called';
    const fn100 = timeout(fnMsec, fn);
    setTimeout(() => {
      fn100(message);
    }, waitMsec);

    expect(logMock).not.toBeCalled();
    jest.advanceTimersByTime(100000);
    expect(logMock).not.toBeCalledWith(message);
    expect(logMock).toBeCalledWith('Timeout reached');
  });
});