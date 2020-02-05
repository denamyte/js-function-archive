'use strict';

const EventEmitterPrototype = function () {
  this.events = {};
};

EventEmitterPrototype.prototype.on = function (name, fn) {
  const event = this.events[name];
  if (event) event.push(fn);
  else this.events[name] = [fn];
};

EventEmitterPrototype.prototype.emit = function (name, ...data) {
  const event = this.events[name];
  if (event) event.forEach(fn => fn(...data));
};

module.exports = EventEmitterPrototype;
