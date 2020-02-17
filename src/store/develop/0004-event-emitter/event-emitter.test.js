const emitter = require('./event-emitter.js');

describe('Testing an event emitter in closure', function () {

  /**
   * Generates a function logging this function parameter
   * @param text
   * @returns {function}
   */
  const genFn = (text) => () => console.log(text);
  /** @type {jest.Mock} */
  const logMock = console.log = jest.fn();
  /** @type {ee_types.emitter_object} */
  let ee;

  it('should normally subscribe a few different functions to different events', function () {

    // todo: Write this test, then the other tests

  });

  describe('Testing "emit" function of the event emitter', function () {
    beforeEach(() => {
      ee = emitter();
      const e1 = "event 1";
      const e2 = "event 2";
      const e1f1_msg = `${e1} is called by function 1`;
      const e1f2_msg = `${e1} is called by function 2`;
      const e2f1_msg = `${e2} is called by function 1`;
      const e2f2_msg = `${e2} is called by function 2`;
      ee.on(e1, genFn(e1f1_msg));
      ee.on(e1, genFn(e1f2_msg));
      expect(ee.count(e1)).toEqual(2);
      ee.on(e2, genFn(e2f1_msg));
      ee.on(e2, genFn(e2f2_msg));
      ee.emit(e1, null);
      expect(logMock).toBeCalledTimes(2);
      expect(logMock).toBeCalledWith(e1f1_msg);
      expect(logMock).toBeCalledWith(e1f2_msg);
    });
    // -- the subscribed functions are being called normally
    // -- if functions-subscriptions were added with "times" or "once" methods, emit should remove
    //      them when their counters are expired
    // -- "emit" should remove a subscription array if all functions were removed from it
    it('"emit" should call normally not wrapped functions', function () {

    });
  });
});