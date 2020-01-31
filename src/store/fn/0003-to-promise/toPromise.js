/**
 * Returns a wrapper which returns a Promise.
 * @param fn A function
 * @returns {function(...[*]): Promise<unknown>}
 */
const toPromise = fn => (...args) => new Promise(resolve => resolve(fn(...args)));

module.exports = toPromise;
