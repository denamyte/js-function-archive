'use strict';

/**
 * A function entry. Its instance is being created for any function added into the emitter.
 * It contains an original function and an optional enhanced function (if an original function is being added
 * with some additional conditions). When an event is fired, first the wrapped function is checked: if it exists,
 * it gets called, if not, the original function gets called.
 * @typedef fn_entry
 * @property {string} event The event the original function is subscribed on.
 * @property {function} origin The original function added to an event emitter.
 * @property {number} [callCount] The amount of this function calls remaining. If false, the calls are not limited
 * @property {function} [wrapped] A wrapped function.
 */

/**
 *
 * @param {string} event The event the original function is subscribed on.
 * @param {function} origin An original function.
 * @param {number} [callCount] A number of function calls remaining.
 * @param {function} [wrapped] A wrapped function.
 * @returns {fn_entry}
 */
const fnEntry = (event, origin, callCount, wrapped) => {
  return {
    event,
    origin,
    callCount,
    wrapped,
  }
};

/**
 *
 * @param {[function | fn_entry]} eventAr
 * @param {function} f
 */
const findIndex = (eventAr, f) => {
  return eventAr.findIndex(item => item === f || item.origin === f);
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

  const ee = {
    /**
     * Adds a subscription on a certain event. Returns `true` if a subscription is added, `false` otherwise.
     * @param {string} eventName An event name to subscribe on.
     * @param {function | fn_entry} f A function to be subscribed on an event.
     * @param {number} timeout A timeout to call
     * @returns {boolean} `true` if a subscription is added, `false` otherwise
     */
    on: (eventName, f, timeout) => {
      const eventAr = events.get(eventName);
      if (eventAr) {
        if (findIndex(eventAr, f)) {
          return false;
        }
        eventAr.push(f);
      } else events.set(eventName, [f]);
      if (timeout) setTimeout(() => {
        ee.remove(eventName, f);
      }, timeout);
      return true;
    },
    /**
     * Adds a subscription
     * @param eventName
     * @param f
     * @param callCount
     * @param timeout
     * @returns {boolean}
     */
    times: (eventName, f, callCount, timeout) => {
      return ee.on(eventName, fnEntry(eventName, f, callCount), timeout);
    },
    once: (eventName, f, timeout) => {
      return ee.times(eventName, f, 1, timeout);
    },
    /**
     * Calls all the functions-listeners of a certain event.
     * @param {string} eventName An event name
     * @param {any} data Parameters to call each subscribed function with
     */
    emit: (eventName, ...data) => {
      const event = events.get(eventName);
      if (event) event.forEach(f => {
        if (f.callCount > 0) {
          f.callCount--;
          if (!f.callCount)
            setTimeout(() => ee.remove(eventName, f), 0);
        }
        (f.wrapped || f.origin || f)(...data);
      });
    },
    /**
     * Removes a function subscribed to an event. Returns `true` if functions was deleted, `false` otherwise.
     * @param eventName The name of an event
     * @param f The function to be removed
     * @returns {boolean} `true` if functions was deleted, `false` otherwise
     */
    remove: (eventName, f) => {
      const eventAr = events.get(eventName);
      if (!eventAr) return false;
      const index = findIndex(eventAr, f);
      if (index === -1) return false;
      if (eventAr.length === 1) {
        events.delete(eventName);
      } else {
        eventAr.splice(index, 1);
      }
      return true;
    },
    /**
     * Clears the subscriptions on a certain event, or all subscriptions (if eventName parameter is omitted).
     * @param {string} [eventName] An event name
     */
    clear: eventName => {
      if (eventName) events.delete(eventName);
      else events.clear();
    },
    /**
     * Returns the amount of subscriptions on an event
     * @param {string} eventName An event name
     * @returns {number}
     */
    count: eventName => {
      const event = events.get(eventName);
      return event ? event.length : 0;
    },
    /**
     * Returns the amount of listeners of a certain event
     * @param {string} eventName An event name
     * @returns {(Function | fn_entry)[]}
     */
    listeners: eventName => {
      const event = events.get(eventName);
      return event ? event.slice() : [];
    },
    /**
     * Returns all event names
     * @returns {string[]}
     */
    names: () => [...events.keys()]



  };
  return ee;
};