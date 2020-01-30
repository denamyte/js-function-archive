/** Returns an array of partial sums of the argument array
 *
 * @param {Array.<number>} arr
 * @returns {Array.<number>} An array of partial sums
 */
function getSums(arr) {
    'use strict';
    if (!Array.isArray(arr) || !arr.length) return [];
    let sums = [];
    arr.reduce((prev, curr, index) => sums[index] = prev + curr, 0);
    return sums;
}