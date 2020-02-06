const emitter = require('./eventEmitter-3');

const toEmit = () => data => console.dir(data);

/** @type {jest.Mock} */
const dirMock = console.dir = jest.fn();
jest.useFakeTimers();

describe('Testing the production ready event emitter closure implementation', function () {
  let em;

  beforeEach(() => {
    dirMock.mockClear();
    em = emitter();
  });

  it('"on" and "emit" should work in simple use', function () {
    em.on('e1', toEmit());
    const m1 = { message: 'e1 emitted 1' };
    const m2 = { message: 'e1 emitted 2' };
    const not = { message: 'not emitted' };
    em.emit('e1', m1);
    em.emit('e1', m2);
    em.emit('other', not);
    expect(dirMock).toBeCalledWith(m1);
    expect(dirMock).toBeCalledWith(m2);
    expect(dirMock).not.toBeCalledWith(not);
    expect(dirMock).toBeCalledTimes(2);
  });

  it('"once" should trigger only once', function () {
    em.once('once1', toEmit());
    em.once('once2', toEmit());
    const m1 = { message: 'once1 emitted' };
    const m2 = { message: 'once2 emitted' };
    const not = { message: 'not emitted' };
    em.emit('once1', m1);
    em.emit('once1', not);
    em.emit('once2', m2);
    em.emit('once2', not);
    expect(dirMock).toBeCalledWith(m1);
    expect(dirMock).toBeCalledWith(m2);
    expect(dirMock).not.toBeCalledWith(not);
    expect(dirMock).toBeCalledTimes(2);
  });

  it('"on" function with the parameter "timeout" should properly expire the subscription after the timeout', function () {
    const timeout = 1000;
    const timeout2 = 400;
    em.on('e1', toEmit(), timeout);
    const m1 = { message: 'v1 emitted' };
    em.emit('e1', m1);
    jest.advanceTimersByTime(timeout2);  // 400/1000 passed
    em.emit('e1', m1);
    jest.advanceTimersByTime(timeout2);  // 800/1000 passed
    em.emit('e1', m1);
    expect(em.listeners('e1').length).toBe(1);
    expect(em.names()).toEqual(['e1']);

    jest.advanceTimersByTime(timeout2); // 1200/1000 passed; timeout is over
    expect(em.listeners('e1').length).toBe(0);
    expect(em.names()).toEqual([]);

    expect(dirMock).toBeCalledWith(m1);
    expect(dirMock).toBeCalledTimes(3);
  });

});