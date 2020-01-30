/**
 * Checks if obj does not contain any properties
 * @param {Object} obj Object to check out
 * @returns {boolean} true, if obj is empty, otherwise false.
 */
function isEmpty(obj) {
    if (!obj) return false;
    var count = 0;
    for (var prop in obj) {
        ++count;
    }
    return count === 0;
}

/** Sums all the salaries in the salaries object
 *
 * @param {Object} salaries The salaries object
 * @return {number} The sum of the salaries
 */
function salariesSum(salaries) {
    if (!salaries) return 0;
    var sum = 0;
    for (var prop in salaries) {
        if (salaries.hasOwnProperty(prop)) {
            sum += parseFloat(salaries[prop]);
        }
    }
    return sum;
}

/** Searches for a coworker with a biggest salary in the salaries object
 *
 * @param {Object} salaries The salaries object
 * @return {string} The name of a coworker with a biggest salary
 */
function biggestSalaryProp(salaries) {
    var biggestProp = "No co-worker";
    if (!salaries) return biggestProp;
    var biggestSalary = 0;
    for (var prop in salaries) {
        if (salaries.hasOwnProperty(prop)) {
            var salary = parseFloat(salaries[prop]);
            if (salary > biggestSalary) {
                biggestSalary = salary;
                biggestProp = prop;
            }
        }
    }
    return biggestProp;
}

function multiplyNumeric(obj) {
    if (!obj) return;
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            var value = obj[prop];
            if (isNumeric(value)) {
                obj[prop] = 2 * value;
            }
        }
    }
}