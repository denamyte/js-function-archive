/** Sums all the function's arguments
 *
 * @returns {number} The sum of all the arguments for the function
 */
function sumArgs() {
    return [].reduce.call(arguments, function (a, b) {
        return a + b;
    });
}

/** Applies the function func to all the arguments
 *
 * @param {function} func A function to apply
 * @param {?*} arg1 The first argument from many to be applied against the function
 */
function applyAll(func, arg1) {
    var argsFrom1 = [].slice.call(arguments, 1);
    if (func) {
        return func.apply(null, argsFrom1);
    }
}