function ucFirst(str) {
    return !str ? "" : str.charAt(0).toUpperCase() + str.slice(1);
}

/** Checks if str contains strings from the spamArray
 * @param {string} str string to check for spam
 * @param {Array.<string>} spamArray an array of spam words
 * @returns {boolean}
 */
function checkSpam(str, spamArray) {
    if (!str && !spamArray && !spamArray.length) return false;
    var lower = str.toLowerCase();
    for (var i in spamArray) {
        if (~lower.indexOf(spamArray[i].toLowerCase())) {
            return true;
        }
    }
    return false;
}

/**
 * Truncates str if it
 * @param {string} str A string to truncate
 * @param {number} maxlength The maximum length a string will have after truncation
 * @returns {string} The string after truncation
 */
function truncate(str, maxlength) {
    if (!str || str.length < maxlength || maxlength <= 0) {
        return str;
    }
    if (maxlength <= 3) {
        return "...".slice(0, maxlength);
    }
    return str.slice(0, maxlength - 3) + "...";
}

/**
 * Extracts the number from a price string
 * @param {string} str A price string with a currency sign
 * @return {number}
 */
function extractCurrencyValue(str) {
    if (!str) return 0;
    var extracted = str.slice(1);
    return isNumeric(extracted) ? +extracted : 0;
}