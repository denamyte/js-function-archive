/** returns a function which should work like sum(a)(b) = a+b.
 *
 * @param {number} arg1
 * @return {function} A function which holds a closure to this function's variables
 */
function sumWithClosures(arg1) {
    /** A function which holds a closure to the outer variable and returns the sum of her own variable and the outer one.
     *
     * @param {number} arg2 A second argument for the sum
     * @return {number} The sum of the outer and own arguments
     */
    function inner(arg2) {
        return arg1 + arg2;
    }

    return inner;
}

/** Creates a string buffer which works with a variable-buffer hidden in the main function's closure.
 *
 * @returns {function} A string buffer object
 */
function makeBuffer() {

    var buffer = "";

    /** A buffer function, accumulating strings in a variable from the main function.
     *
     * @param {string} value A value to add to the string buffer.
     * @returns {string} An accumulated buffer string.
     */
    function buff(value) {
        if (arguments.length) {
            buffer += value;
        } else {
            return buffer;
        }
    }

    buff.clear = function () {
        buffer = "";
    };

    return buff;
}

/** Returns a function which compares between each other the fields o1[field] and o2[field]
 *
 * @param {string} field
 * @returns {function} A function which compares between each other the fields o1[field] and o2[field]
 */
function compareByField(field) {

    return function (o1, o2) {
        return o1[field] > o2[field] ? 1 : -1;
    };

}

/** Filters an array by a predicate function and returns a new array which comply with it.
 *
 * @param {number[]} arr
 * @param func
 */
function filterArrayByPredicate(arr, func) {
    if (!arr || !func) {
        return [];
    }
    // var filtered = arr.slice(0);
    return arr.slice(0).filter(func);
}

/** Returns a function which is to be a predicate to the function Array.filter(), and accepts the same parameters.
 * Sorts an array by choosing its members which are in bounds [low, high].
 *
 * @param {number} low - The upper bound for the filter
 * @param {number} high - The lower bound fot tye filter
 * @returns {function} A function to filter a number array
 */
function inBetween_ArrayPredicate(low, high) {

    return function (value, index, array) {
        return value >= low && value <= high;
    };
}

/** Returns a function which is to be a predicate to the function Array.filter(), and accepts the same parameters.
 * Sorts an array by choosing its members which intersect with a test array.
 *
 * @param {Array.<number>} arr - An array to sort the main array as intersection with this
 */
function inArray_ArrayPredicate(arr) {

    return function (value, index, array) {
        return !!~arr.indexOf(value);
    };
}

/** Returns an array of 'shooters' each of which should return his ordinal number
 *
 * @returns {Array.<function>}
 */
function makeArmy() {

    var shooters = [];

    var shooterMaker = function(num) { // function-shooter
        return function() {
            alert(num); // returns his(its) number
        }
    };

    for (var i = 0; i < 10; i++) {
        shooters.push(shooterMaker(i));
    }

    return shooters;
}