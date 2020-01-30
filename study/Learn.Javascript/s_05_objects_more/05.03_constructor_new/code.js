/** A simple calculator object
 *
 * @constructor
 */
function Calculator() {

    /**
     * The first argument for the calculator
     * @type {number}
     */
    this.arg1 = 0;
    /**
     * The second argument for the calculator
     * @type {number}
     */
    this.arg2 = 0;
    /**
     * Reads two numbers with the prompt function.
     */
    this.read = function () {
        this.arg1 = +prompt("Insert the first argument", 0);
        this.arg2 = +prompt("Insert the second argument", 0);
    };

    /**
     * Returns the sum of the two calculators's arguments
     * @returns {number}
     */
    this.sum = function () {
        return this.arg1 + this.arg2;
    };

    /**
     * Returns the product of the two calculator's arguments
     * @returns {number}
     */
    this.mul = function () {
        return this.arg1 * this.arg2;
    }

}

/** Accumulates inputted numbers into an inner sum buffer
 *
 * @param {number} startingValue
 * @constructor
 */
function Accumulator(startingValue) {

    /**
     * The inner buffer for storing the whole sum
     * @type {number}
     */
    this.value = startingValue;

    /**
     * Reads another number to add to the sum
     */
    this.read = function () {
        this.value += +prompt("Insert the next number", 0);
    };

}

function CalculatorExt() {

    /** The storage of the known functions
     *
     * @type {{string: (function(number, number): number)}}
     */
    this.ops = {
        '+': function (a, b) {
            return a + b;
        },
        '-': function (a, b) {
            return a - b;
        }
    };

    /** Gets a string in format like '1 + 2' and calculates the result
     *
     * @param expr A mathematical expression like '1 + 2'.
     * @returns {number} The result of the inputted expression
     */
    this.calculate = function (expr) {
        if (!expr) return NaN;
        var arr = expr.split(' ', 3);
        if (arr.length !== 3) return NaN;

        var func = this.ops[arr[1]];
        var a = +arr[0], b = +arr[2];
        if (!func || isNaN(a) || isNaN(b)) return NaN;

        return func(a, b);
    };

    /** Adds a method to the known methods
     *
     * @param {string} name The new method sign
     * @param {function} func The new function for the method
     */
    this.addMethod = function (name, func) {
        if (name) {
            this.ops[name] = func;
        }
    };
}