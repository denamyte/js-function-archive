'use strict';

/**
 * A function entry. Its instance is being created for any function added into the emitter.
 * It contains an original function and an optional enhanced function (if an original function is being added
 * with some additional conditions). When an event is fired, first the wrapped function is checked: if it exists,
 * it gets called, if not, the original function gets called.
 * @typedef fn_entry
 * @property {string} event The event the original function is subscribed on.
 * @property {function} origin The original function added to an event emitter.
 * @property {function} [wrapped] A wrapped function.
 */

/**
 *
 * @param {string} event The event the original function is subscribed on.
 * @param {function} origin An original function.
 * @param {function} [wrapped] A wrapped function.
 * @returns {fn_entry}
 */
const fnEntry = (event, origin, wrapped) => {
  return {
    event,
    origin,
    wrapped,
  }
};
/**
 *
 * @returns {{}}
 */
const emitter = () => {

  /**
   * The events map. The keys are event names, the values are arrays of original functions or function entries.
   * @type {Map<string, [function|fn_entry]>}.
   */
  const events = new Map();
  // /**
  //  * The wrapped functions map. The keys are event names, the values are functions
  //  * @type {Map<string, [fn_entry]>}.
  //  */
  // const wrapped = new Map();
  const ee = {
    on: (eventName, f, timeout) => {
      const eventAr = events.get(eventName);
      if (eventAr) eventAr.push(f);
      else events.set(eventName, [f]);
      if (timeout) setTimeout(() => {
        ee.remove(eventName, f);
      }, timeout);
    },
    remove: (eventName, f) => {
      const eventAr = events.get(eventName);
      if (!eventAr) return;
      // either
      eventAr.filter(item => item !== f && !item.origin && item.origin !== f)
      // or
      // indices of found functions
      let foundAr = eventAr.map((item, index) => (item === f || (item.origin === f) ? index : -1)).filter(value => value > -1);

      // todo: remove found functions or function entries from the 'eventAr'. If 'eventAr' is empty. remove 'eventName' key from 'events'

    }

  };
  return ee;
};