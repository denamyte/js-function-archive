/** The decorator which wraps a function f and logs all its arguments
 *
 * @param {function} f An arbitrary function
 * @param {Array.<*>} log An array for logging arguments
 * @returns {function(): *} The wrapper over an initial function
 */
function makeLogging(f, log) {
    return function () {
        if (Array.isArray(log)) {
            for (var i = 0; i < arguments.length; i++) {
                log.push(arguments[i]);
            }
        }
        return f.apply(this, arguments);
    }
}

/** The decorator which wraps a function f and logs all its arguments (as arrays) in the log array
 *
 * @param {function} f An arbitrary function
 * @param {[[*]]} log An array for logging arguments (an array per function call)
 * @returns {function(): *} The wrapper over an initial function
 */
function makeComplexLogging(f, log) {
    return function () {
        if (Array.isArray(log)) {
            log.push([].slice.call(arguments, 0));
        }
        return f.apply(this, arguments);
    }
}

/** The decorator to make a caching wrapper over an arbitrary function.
 *  All the results with distinct arguments are being cached in an inner cache object.
 *  The initial function is not being called if the inner cache object already contains
 *  an argument-result record.
 *
 * @param {function} f An arbitrary function
 * @returns {function(): *} The wrapper over an initial function
 */
function makeCaching(f) {
    var cache = {};
    return function () {
        var arg = arguments[0];
        var result = cache[arg];
        if (result === undefined) {
            result = f.apply(this, arguments);
            cache[arg] = result;
        }
        return result;
    }
}