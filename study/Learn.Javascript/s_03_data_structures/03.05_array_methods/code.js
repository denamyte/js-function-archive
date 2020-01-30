/** Adds the word in a words string, if that words string does not yet contain it
 *
 * @param {string} words A string of space-separated words
 * @param {string} word A word to be added into words
 * @returns {string} a new string with the new word added
 */
function addNonexistentWord(words, word) {
    if ((words || words === '') && word) {
        if (!~words.split(" ").indexOf(word)) {
            return words + (words.length ? " " : "") + word;
        }
    }
    return words;
}

/** Adds cls into the obj.className string if this property does not yet contain it
 *
 * @param {Object} obj An object which should contain field 'className'
 * @param {string} cls A class string to be added
 */
function addClass(obj, cls) {
    if (!obj || obj.className === undefined || !cls) return;
    obj.className = addNonexistentWord(obj.className, cls);
}

/** Capitalizes the first letter of the string
 *
 * @param {string} str
 * @returns {string} The string with the first letter capitalized
 */
function capitalizeFirstLetter(str) {
    if (str && str.length) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
}

/** Accepts string with words separated with hyphens, capitalizes words preceded by hyphens and deletes hyphens
 *
 * @param {string} str A hyphens-separated string
 * @returns {string} Camelized string
 */
function camelize(str) {
    if (str) {
        var arr = str.split('-');
        for (var i = 1; i < arr.length; i++) {
            arr[i] = capitalizeFirstLetter(arr[i]);
        }
        return arr.join('');
    }
    return str;
}

/** Removes the word from the words string
 *
 * @param {string} words A string of space-separated words
 * @param {string} word A word to be removed from words
 * @returns {string} A new string with the word removed
 */
function removeExistingWords(words, word) {
    if ((words || words === '') && word) {
        var split = words.split(' ');
        var filterFunc = function (value) {
            return value !== word
        };
        var filtered = split.filter(filterFunc);
        return filtered.join(' ');
    }
    return words;
}

/** Removes cls from the obj.className string
 *
 * @param {Object} obj An object which should contain field 'className'
 * @param {string} cls A class string to be removed
 */
function removeClass(obj, cls) {
    if (!obj || obj.className === undefined || !cls) return;
    obj.className = removeExistingWords(obj.className, cls);
}

/** Removes from the arr array all numbers in range [a, b]
 *
 * @param {Array.<number>} arr An array to filter
 * @param {number} a The range minimum
 * @param {number} b The range maximum
 */
function filterRangeInPlace(arr, a, b) {
    if (Array.isArray(arr) && a <= b) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] < a || arr[i] > b) {
                arr.splice(i, 1);
                i--;
            }
        }
    }
}

/** Sorts and reverses an array
 *
 * @param {Array.<number>} arr An array to sort
 * @returns {Array.<number>} The sorted and reversed array
 */
function sortReversed(arr) {
    if (Array.isArray(arr)) {
        return arr.sort((a, b) => a - b).reverse();
    }
    return arr;
}

/** Copies and sorts a string array
 *
 * @param {Array.<string>} arr
 * @returns {Array.<string>} The new sorted array
 */
function copyAndSortArray(arr) {
    if (Array.isArray(arr)) {
        return arr.slice().sort();
    }
    return [];
}

/** Changes an array members order randomly
 *
 * @param {Array.<number>} arr An array to change order
 */
function randomArrayOrder(arr) {
    if (Array.isArray(arr)) {
        arr.sort((a, b) => randomInRangeIncl(-10, 9));
    }
}

/** Sorts an array of objects by their property
 *
 * @param {Array.<Object>} objArray An array of objects
 * @param {string} prop A property by which an object array will be sorted
 * @returns {Array.<number>} An array of the sort property values
 */
function sortObjectsByProperty(objArray, prop) {
    if (Array.isArray(objArray) && prop) {
        objArray.sort((a, b) => {
            if (!a) return -1;
            if (!b) return 1;
            return a[prop] - b[prop];
        });
        return objArray.map(value => value[prop]);
    }
    return [];
}

/** Returns an array of list values
 *
 * @param {Object} list A simply connected list
 * @returns {Array.<Object>} An array of list values
 */
function printListByLoop(list) {
    var values = [];
    var listPos = list;
    while (listPos) {
        values.push(listPos.value);
        listPos = listPos.next;
    }
    return values;
}

/** Returns an array of list values
 *
 * @param {Array.<Object>} values The currently accumulated list of values
 * @param {Object} list A simply connected list
 * @returns {Array.<Object>} An array of list values
 */
function printListByRecursion(values, list) {
    if (!list) return values;
    return printListByRecursion(values.concat(list.value), list.next);
}

/** Returns a reversed array of list values obtained by recursion
 *
 * @param {Object} list A simply connected list
 * @param {Array.<Object>} values The currently accumulated list of values
 * @returns {Array.<Object>} An array of list values
 */
function printReverseListByRecursion(list, values) {
    if (list.next) printReverseListByRecursion(list.next, values);
    values.push(list.value);
    return values;
}

/** Cleans an array of words from anagrams
 *
 * @param {Array.<string>} arr
 * @returns {Array.<string>} A new array cleaned from anagrams
 */
function aclean(arr) {
    /** An array containing unique words as they are in the initial array
     *
     * @type {Array.<string>}
     */
    var cleaned = [];
    if (Array.isArray(arr)) {
        /** An array containing unique words with lexically sorted letters
         *
         * @type {Array.<string>}
         */
        var testArray = [];
        for (var i = 0; i < arr.length; i++) {
            var word = arr[i];
            if (word) {
                // Prepare the next word for testing
                var testWord = word.toLowerCase().split('').sort().join('');
                // Testing if the the test array does not contain the new word
                if (!~testArray.indexOf(testWord)) {
                    // Add the initial words in both arrays
                    testArray.push(testWord);
                    cleaned.push(word);
                }
            }
        }
    }
    return cleaned;
}

/** Consumes the array and returns a new array containing only unique members from the initial one
 *
 * @param {Array.<string>} arr
 * @returns {Array.<string>} An array with unique members
 */
function unique(arr) {
    var unique = [];
    if (Array.isArray(arr)) {
        for (var i = 0; i < arr.length; i++) {
            if (!~unique.indexOf(arr[i])) {
                unique.push(arr[i]);
            }
        }
    }
    return unique;
}