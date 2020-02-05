'use strict';

const emitter = () => {
  let events = {};
  const ee = {
    on: (name, f, timeout = 0) => {
      const event = events[name] || [];
      events[name] = event;
      event.push(f);
      if (timeout) {
        setTimeout(() => {
          ee.remove(name, f);
        }, timeout);
      }
    },
    emit: (name, ...data) => {
      const event = events[name];
      event && event.forEach(f => f(...data));
    },
    once: (name, f) => {
      const g = (...a) => {
        ee.remove(name, g);
        f(...a);
      };
      ee.on(name, g);
    },
    remove: (name, f) => {
      const event = events[name];
      if (!event) return;
      const i = event.indexOf(f);
      if (i !== -1) event .splice(i, 1);
    },
    clear: name => {
      if (name) delete events[name];
      else events = {};
    },
    count: name => {
      const event = events[name];
      return event ? event.length : 0;
    },
    listeners: name => {
      const event = events[name];
      return event.slice();
    },
    names: () => Object.keys(events)
  };
  return ee;
};
