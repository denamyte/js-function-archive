'use strict';

const emitter = () => {
  const events = new Map();
  const wrapped = new Map();
  const ee = {
    on: (name, f, timeout = 0) => {
      const event = events.get(name);
      if (event) event.push(f);
      else events.set(name, [f]);
      if (timeout) setTimeout(() => {
        ee.remove(name, f);
      }, timeout);
    },
    emit: (name, ...data) => {
      const event = events.get(name);
      if (event) event.forEach(f => f(...data));
    },
    once: (name, f) => {
      const g = (...a) => {
        ee.remove(name, g);
        f(...a);
      };
      wrapped.set(f, g);
      ee.on(name, g);
    },
    remove: (name,  f) => {
      const event = events.get(name);
      if (!event) return;
      const g = wrapped.get(f);
      if (g) {
        wrapped.delete(f);
        f = g;
      }
      let i = event.indexOf(f);
      if (i !== -1) {
        event.splice(i, 1);
        if (!event.length) events.delete(name);
      }
    },
    clear: name => {
      if (name) events.delete(name);
      // todo: we should also clear the wrapped map, deleting entries which values are in events
      //  sfa
      else events.clear();
    },
    count: name => {
      const event = events.get(name);
      return event ? event.length : 0;
    },
    listeners: name => {
      const event = events.get(name);
      return event ? event.slice() : [];
    },
    names: () => [...events.keys()]
  };
  return ee;
};

module.exports = emitter;
