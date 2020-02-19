'use strict';

/**
 * Namespace for event emitter types
 * @namespace ee_types
 */

/**
 * Namespace for functions of event emitter
 * @namespace fn
 * @memberOf ee_types
 */

/**
 * Extended function entry. Its instance is created for any function added into an emitter.
 * It contains an original function and an optional enhanced function (if an original function is added
 * with some additional conditions). When an event is fired, first the wrapped function is checked: if it exists,
 * it gets called, if not, the original function gets called.
 * @typedef ee_types.fn_entry
 * @property {string} event The event the original function is subscribed on.
 * @property {function} origin The original function added to an event emitter.
 * @property {number} [callCount] The amount of this function calls remaining. If falsy, the calls are not limited
 * @property {function} [wrapped] A wrapped function.
 */

/**
 * Function for subscribing on an event
 * @callback ee_types.fn.on
 * @param {string} eventName An event name to subscribe on.
 * @param {function | ee_types.fn_entry} f A function to be subscribed on an event.
 * @param {number} [timeout] A timeout to call
 * @returns {boolean} `true` if a subscription is added, `false` otherwise
 */

/**
 * Adds a subscription with a maximum call count.
 * @callback ee_types.fn.times
 * @param {string} eventName The name of an event to subscribe on
 * @param {function} f A function to be subscribed on an event
 * @param {number} callCount The maximum amount of times the function can be called. Pass 0 for unlimited calls.
 * @param {number} [timeout] The length of time period during which, starting from the moment of subscription,
 * a function can be called.
 * @returns {boolean} A flag indicating if the subscription is successful.
 */

/**
 * Adds a subscription which can be called only once.
 * @callback ee_types.fn.once
 * @param {string} eventName The name of an event to subscribe on
 * @param {function} f A function to be subscribed on an event
 * @param {number} timeout The length of time period during which, starting from the moment of subscription,
 * a function can be called.
 * @returns {boolean} A flag indicating if the subscription is successful.
 */

/**
 * Calls all the functions-listeners of a certain event.
 * @callback ee_types.fn.emit
 * @param {string} eventName An event name
 * @param {...*} data Parameters to call each subscribed function with
 */

/**
 * Removes a function subscribed to an event. Returns `true` if functions was deleted, `false` otherwise.
 * @callback ee_types.fn.remove
 * @param eventName The name of an event
 * @param f The function to be removed
 * @returns {boolean} `true` if functions was deleted, `false` otherwise
 */

/**
 * Clears the subscriptions on a certain event, or all subscriptions (if eventName parameter is omitted).
 * @callback ee_types.fn.clear
 * @param {string} [eventName] An event name
 */

/**
 * Returns the amount of subscriptions on an event
 * @callback ee_types.fn.count
 * @param {string} eventName An event name
 * @returns {number}
 */

/**
 * Returns the amount of listeners of a certain event
 * @callback ee_types.fn.listeners
 * @param {string} eventName An event name
 * @returns {(Function | fn_entry)[]}
 */

/**
 * Returns all event names
 * @callback ee_types.fn.names
 * @returns {string[]}
 */

//****************************************************

/**
 * Event emitter object. This object is returned when emitter function is called.
 * @typedef ee_types.emitter_object
 * @property {ee_types.fn.on} on Adds a subscription on a certain event. Returns `true`
 * if a subscription is added, `false` otherwise.
 * @property {ee_types.fn.times} times Adds a subscription with a maximum call count.
 * @property {ee_types.fn.once} once Adds a subscription with only one possible call.
 * @property {ee_types.fn.emit} emit Calls all the functions-listeners of a certain event.
 * @property {ee_types.fn.remove} remove Removes a function subscribed to an event. Returns `true`
 * if functions was deleted, `false` otherwise.
 * @property {ee_types.fn.clear} clear Clears the subscriptions on a certain event,
 * or all subscriptions (if eventName parameter is omitted).
 * @property {ee_types.fn.count} count Returns the amount of subscriptions on an event.
 * @property {ee_types.fn.listeners} listeners Returns the amount of listeners of a certain event.
 * @property {ee_types.fn.names} names Returns all event names.
 */

/**
 * Creates an extended function entry.
 * @param {string} event The event the original function is subscribed on.
 * @param {function} origin An original function.
 * @param {number} [callCount] A number of function calls remaining.
 * @param {function} [wrapped] A wrapped function.
 * @returns {ee_types.fn_entry}
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
 * Finds and index of a functions or a wrapper in an array of functions and wrappers.
 * @see {@link Array#findIndex}
 * @param {[function | ee_types.fn_entry]} eventAr
 * @param {function} f
 * @returns {number}
 */
const findIndex = (eventAr, f) => {
  return eventAr.findIndex(item => item === f || item.origin === f);
};
/**
 * Returns an event emitter.
 * @returns {ee_types.emitter_object}
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
     * @param {function | ee_types.fn_entry} f A function to be subscribed on an event.
     * @param {number} timeout The length of time period during which, starting from the moment of subscription,
     * a function can be called.
     * @returns {boolean} `true` if a subscription is added, `false` otherwise
     */
    on: (eventName, f, timeout) => {
      const eventAr = events.get(eventName);
      if (eventAr) {  //
        if (~findIndex(eventAr, f)) {
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
     * Adds a subscription with a maximum call count
     * @param {string} eventName The name of an event to subscribe on
     * @param {function} f A function to be subscribed on an event
     * @param {number} callCount The maximum amount of times the function can be called. Pass 0 for unlimited calls.
     * @param {number} timeout The length of time period during which, starting from the moment of subscription,
     * a function can be called.
     * @returns {boolean} A flag indicating if the subscription is successful.
     */
    times: (eventName, f, callCount, timeout) => {
      return ee.on(eventName, fnEntry(eventName, f, callCount), timeout);
    },
    /**
     * Adds a subscription which can be called only once.
     * @param {string} eventName The name of an event to subscribe on
     * @param {function} f A function to be subscribed on an event
     * @param {number} timeout The length of time period during which, starting from the moment of subscription,
     * a function can be called.
     * @returns {boolean} A flag indicating if the subscription is successful.
     */
    once: (eventName, f, timeout) => {
      return ee.times(eventName, f, 1, timeout);
    },
    /**
     * Calls all the functions-listeners of a certain event.
     * @param {string} eventName An event name
     * @param {any} data Parameters to call each subscribed function with
     */
    emit: (eventName, ...data) => {
      const eventsAr = events.get(eventName);
      if (!eventsAr) return;
      const removeSubs = [];
      eventsAr.forEach((f, index) => {
        if (f.callCount && f.callCount > 0) {
          f.callCount--;
          if (f.callCount === 0) {
            removeSubs.push(f);
          }
        }
        (f.wrapped || f.origin || f)(...data);
      });

      if (!removeSubs.length)
        return;
      let lastIndex = 0;
      removeSubs.forEach(sub => {
        let foundIndex = eventsAr.indexOf(sub, lastIndex);
        if (~foundIndex) {
          lastIndex = foundIndex;
          eventsAr.splice(foundIndex, 1);
        }
      });
      if (!eventsAr.length)
        events.delete(eventName);
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
      return !event ? [] : event.slice().map(
        f => f.origin
          ? fnEntry(f.event, f.origin, f.callCount, f.wrapped)  // we should return a copy, not a stored function entry
          : f
      );
    },
    /**
     * Returns all event names
     * @returns {string[]}
     */
    names: () => [...events.keys()]

  };
  return ee;
};

module.exports = emitter;
