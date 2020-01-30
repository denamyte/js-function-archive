/** Gets the last element of a array
 *
 * @param {Array.<string>} ar An array for obtaining the last element
 * @returns {string} The last element of an array
 */
function lastElementOfArray(ar) {
    if (!ar || !ar.length) {
        return undefined;
    }
    return ar[ar.length - 1];
}

/** Adds a new element into an array
 *
 * @param {Array} ar An array into wich a new element should be added
 * @param elem A new element to be added into the array
 */
function addNewElement(ar, elem) {
    if (ar && ar.length >= 0) {
        ar.push(elem);
    }
}

/** Computes the sum of an array of numbers
 *
 * @param {Array.<number>} ar The array of numbers
 * @returns {number} The sum of an array
 */
function arraySum(ar) {
    var sum = 0;
    if (ar && ar.length) {
        for (var i = 0; i < ar.length; i++) {
            sum += ar[i];
        }
    }
    return sum;
}

/** Searches a value in an array
 *
 * @param {Array} ar Array for being looked for
 * @param {any} value a value to look for
 * @returns {number} zero-based index if the value is found or -1 otherwise
 */
function find(ar, value) {
    if (!ar || !ar.length || !value) return -1;
    for (var i = 0; i < ar.length; i++) {
        if (ar[i] === value) return i;
    }
    return -1;
}

/** Filters an array arr and returns the new array, which contains only elements from arr in range [a, b]
 *
 * @param {Array.<number>} arr An array for filtering
 * @param {number} a min value of the range
 * @param {number} b max value of the range
 */
function filterRange(arr, a, b) {
    var filtered = [];
    if (arr && arr.length) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] >= a && arr[i] <= b) {
                filtered.push(arr[i]);
            }
        }
    }
    return filtered;
}

/** Returns the array of all simple numbers starting from 2 until cap
 *
 * @param {number} cap The maximum number until which to search simple numbers
 * @returns {Array.<number>} The simple numbers found
 */
function eratosthenesSieve(cap) {
    var numbers = [false, false];
    for (var i = 2; i <= cap; i++) {
        numbers.push(true);
    }
    var currIndex = 1;
    while (currIndex * currIndex <= cap) {
        // find next not-null array element
        while (currIndex <= cap && !numbers[currIndex]) {
            currIndex++;
        }
        // Cancel all reiteration of currIndex
        if (currIndex * currIndex <= cap) {
            for (var powIndex = currIndex * 2; powIndex <= cap; powIndex += currIndex) {
                numbers[powIndex] = false;
            }
        }
        currIndex++;
    }
    var snum = [];
    for (i = 2; i <= cap; i++) {
        if (numbers[i]) {
            snum.push(i);
        }
    }
    return snum;
}

/** Returns the sum of continuous sub-array of the arr array, which sum is maximum
 *
 * @param arr
 * @returns {number} The sum of continuous sub-array, which sum is maximum.
 */
function getMaxSubSum(arr) {
    var sum = 0, highestSum = 0;
    if (Array.isArray(arr)) {
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
            highestSum = Math.max(sum, highestSum);
            if (sum < 0) {
                sum = 0;
            }
        }
    }
    return highestSum;
}



