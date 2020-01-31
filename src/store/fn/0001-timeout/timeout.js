const timeout = (msec, fn) => {
  let timer = setTimeout(() => {
    if (timer) console.log('Timeout reached');  // remove this line in production
    timer = null;
  }, msec);
  return (...args) => {
    if (timer) {
      timer = null;
      fn(...args);
    }
  };
};

module.exports = timeout;