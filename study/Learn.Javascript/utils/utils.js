
function inputUntilNumberWithConditions(query, gtNumber, gteNumber, isInteger, initial) {
    do {
        var number = inputUntilNumber(query, initial === undefined ? 1 : initial);
        if (isNumeric(gtNumber) && number <= gtNumber) {
            alert("Your number is not greater than " + gtNumber);
            continue;
        }
        if (gteNumber && number < gtNumber) {
            alert("Your number is not greater than or equal to " + gteNumber);
            continue;
        }
        if (isInteger && number !== Math.round(number)) {
            alert("Your number is not integer");
            continue;
        }
        return number;
    } while (true);
}

function inputUntilNumber(query, initial) {
    do {
        var input = prompt(query === undefined ? "Input a number" : query, initial === undefined ? 0 : initial);
        if (isNumeric(input)) return +input;
        alert("Your input '" + input + "' is not numeric");
    } while (true);
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/** Returns a pseudo-random number from a [min, max] range
 *
 * @param {number} min
 * @param {number} max
 */
function randomInRangeIncl(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
}

/** Returns the class i.e. [[Class]] of an arbitrary object
 *
 * @param {any} obj An arbitrary object
 * @returns {string} A string representing the class of an object
 */
function getClass(obj) {
    return {}.toString.call(obj).slice(8, -1);
}

/** In this function, the Child class prototypically inherits from the Parent class
 *
 * @param {Function} Child
 * @param {Function} Parent
 */
function extend(Child, Parent) {
    Child.prototype = inherit(Parent.prototype);
    Child.prototype.constructor = Child;
    Child.parent = Parent.prototype;
}

/** Creates a new prototype function with an existing function as its prototype
 *
 * @param proto - An existing function which is to be the prototype while the new prototype is being created
 * @returns {Function} A new prototype function which prototype is an existing function from arguments
 */
function inherit(proto) {
    function F() {}
    F.prototype = proto;
    return new F;
}

/** A Promise wrapper over an xhr-request with GET type
 *
 * @param {string} url A url for an xhr GET request.
 * @returns {Promise<any>} A promise returning either a result or an error when an xhr-request is loaded
 */
function httpGet(url) {

    return new Promise(function(resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function() {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function() {
            reject(new Error("Network Error"));
        };

        xhr.send();
    });

}