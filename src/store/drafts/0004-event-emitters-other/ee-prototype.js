'use strict';

const EePrototype = function () {
  this.events = {};
};

EePrototype.prototype.on = function (name, fn) {
  const event = this.events[name];
  if (event) event.push(fn);
  else this.events[name] = [fn];
};

EePrototype.prototype.emit = function (name, ...data) {
  const event = this.events[name];
  if (event) event.forEach(fn => fn(...data));
};

module.exports = EePrototype;
