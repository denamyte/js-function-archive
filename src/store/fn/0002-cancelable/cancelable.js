const cancelable = fn => {
  const wrapper = (...args) => fn ? fn(...args) : undefined;
  wrapper.cancel = () => fn = null;
  return wrapper;
};

module.exports = cancelable;