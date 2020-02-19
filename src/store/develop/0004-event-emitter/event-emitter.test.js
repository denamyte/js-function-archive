const emitter = require('./event-emitter.js');

jest.useFakeTimers();

describe('Testing an event emitter in closure', function () {

  /**
   * Generates a function logging this function parameter
   * @param text
   * @returns {function}
   */
  const genFn = (text) => (text2) => console.log(text2 || text);
  /** @type {Mock} */
  const logMock = console.log = jest.fn();

  describe('Testing "times", "once" and "emit" methods of the event emitter', function () {
    /** @type {ee_types.emitter_object} */
    let ee;
    beforeEach(() => {
      ee = emitter();
      logMock.mockClear();
    });
    it('"emit" should call normally not wrapped functions', function () {
      const e1 = "event 1";
      const e2 = "event 2";
      const e1f1_msg = `${e1} calls function 1`;
      const e1f2_msg = `${e1} calls function 2`;
      const e2f1_msg = `${e2} calls function 1`;
      const e2f2_msg = `${e2} calls function 2`;
      ee.on(e1, genFn(e1f1_msg));
      ee.on(e1, genFn(e1f2_msg));
      ee.on(e2, genFn(e2f1_msg));
      ee.on(e2, genFn(e2f2_msg));
      [e1, e2].forEach(event => expect(ee.count(event)).toEqual(2));
      const callCount = 10;
      for (let i = 0; i < callCount; i++) {
        ee.emit(e1, null);
        ee.emit(e2, null);
      }
      [e1f1_msg, e1f2_msg, e2f1_msg, e2f2_msg].forEach(msg => expect(logMock).toHaveBeenCalledWith(msg));
      expect(logMock).toHaveBeenCalledTimes(callCount * 4);
      [e1, e2].forEach(event => expect(ee.count(event)).toEqual(2)); // functions are not removed
    });

    it('"emit" should remove listeners if they were added with ' +
      '"times" or "once" methods, and their counters are expired; it also should delete' +
      'an event entry from the events map if all listeners on this particular event' +
      'were deleted', function () {
      const e1 = "event 1";
      const calls = [
        [`${e1} calls function 1`, 1],
        [`${e1} calls function 2`, 3],
        [`${e1} calls function 3`, 5]
      ];
      calls.forEach(call => ee.times(e1, genFn(call[0]), call[1]));
      expect(ee.count(e1)).toBe(3);

      ee.emit(e1);  // emit count = 1; 2 listeners remain
      expect(ee.count(e1)).toBe(2);
      expect(ee.names().length).toBe(1);
      ee.emit(e1);
      ee.emit(e1);  // emit count = 3; 1 listeners remain
      expect(ee.count(e1)).toBe(1);
      expect(ee.names().length).toBe(1);
      ee.emit(e1);
      ee.emit(e1);  // emit count = 5; 0 listeners remain
      expect(ee.count(e1)).toBe(0);
      expect(ee.names().length).toBe(0);  // event e1 should have already be deleted
      expect(logMock).toBeCalledTimes(9);

      // Testing "once"
      calls.forEach(call => ee.once(e1, genFn(call[0])));
      expect(ee.count(e1)).toBe(3);
      ee.emit(e1);
      expect(ee.count(e1)).toBe(0);
    });

    it('"emit" should pass its params into a listener', function () {
      const passedParam = "passedParam";
      const e1 = "event 1";
      ee.on(e1, genFn("not relevant"));
      ee.on(e1, genFn("not relevant again"));
      ee.emit(e1, passedParam);
      expect(logMock).toBeCalledTimes(2);
      expect(logMock).toHaveBeenNthCalledWith(1, passedParam);
      expect(logMock).toHaveBeenNthCalledWith(2, passedParam);
    });

    it('listeners added with "once" and "times" methods should be wrapped functions', function () {
      // Two functions will be added with "once" and "times" methods and then will be checked if they are wrapped ones
      // Another function will be added with "on" method and then will be checked if it is itself
      const f1 = genFn("some text");
      const f2 = genFn("some other text");
      const f3 = genFn("text again");
      const e1 = "event 1";
      ee.once(e1, f1);
      ee.times(e1, f2, 3);
      ee.on(e1, f3);
      let [l1, l2, l3] = ee.listeners(e1);
      expect(l1.origin).toBe(f1);
      expect(l2.origin).toBe(f2);
      expect(l3).toBe(f3);
    });
  });

  describe('Testing "on" method of the emitter emitter', function () {
    /** @type {ee_types.emitter_object} */
    let ee;
    beforeEach(() => {
      ee = emitter();
      logMock.mockClear();
    });

    it('should add a unique listener but should not add an already added listener', function () {
      const f1 = genFn("f1");
      const f2 = genFn("f2");
      const e1 = "e1";
      ee.on(e1, f1);  // a unique listener added
      expect(ee.count(e1)).toBe(1);
      ee.on(e1, f2);  // another unique listener added
      expect(ee.count(e1)).toBe(2);
      ee.on(e1, f1);  // NOT unique listener added
      ee.on(e1, f2);  // another NOT unique listener added
      expect(ee.count(e1)).toBe(2);
    });

    it('should add the same listeners only into different events', function () {
      const f1 = genFn("f1");
      const e1 = "e1";
      const e2 = "e2";
      ee.on(e1, f1);
      ee.on(e1, f1);
      expect(ee.count(e1)).toEqual(1);
      ee.on(e2, f1);
      ee.on(e2, f1);
      expect(ee.count(e2)).toEqual(1);
      expect(ee.names()).toEqual([e1, e2]);
    });

    xit('listeners with a timeout should be unsubscribed when timeout is over', function () {

    });
  });
});