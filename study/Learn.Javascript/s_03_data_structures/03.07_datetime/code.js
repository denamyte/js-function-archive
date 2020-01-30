/** Returns the short form of weekday: Sd, Md, ...
 *
 * @param {Date} date
 * @returns {string} - The short form of a weekday
 */
function getWeekDay(date) {
    if (!date) return null;
    var weekdays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    return weekdays[date.getDay()];
}

/** Returns 1-based number of a weekday
 *
 * @param {Date} date
 * @returns {number} A 1-based number of a weekday
 */
function getLocalDay(date) {
    return date ? (date.getDay() === 0 ? 7 : date.getDay()) : NaN;
}

/** Returns the date (a serial number of a day in a month) which was days ago from the initial date object.
 *
 * @param {Date} date - An initial Date object from which to count
 * @param {number} days - A number of days to subtract from an initial Date object
 * @returns {number} - A serial number of a day in a month of the calculated date object
 */
function getDateAgo(date, days) {
    if (!date || ! days) return NaN;
    var newDate = new Date(date.getTime());
    newDate.setDate(newDate.getDate() - days);
    return newDate.getDate();
}

/** Returns the last day of the month
 *
 * @param {number} year - 4-digit year number
 * @param {number} month - A zero-based month of the year
 * @returns
 */
function getLastDayOfMonth(year, month) {
    var date = new Date(year, month, 32);
    return 32 - date.getDate();

    // or ->
    // var date = new Date(year, month + 1, 0);
    // return date.getDate();
}

/** Returns the number of seconds passed today
 * 
 * @returns {number} The number of seconds passed today
 */
function getSecondsTodayUntilNow() {
    var now = new Date();
    var todayZero = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.floor((now.getTime() - todayZero.getTime()) / 1000);
}

/** Returns the number of seconds until tomorrow
 *
 * @returns {number} The number of seconds untill tomorrow
 */
function getSecondsToTomorrow() {
    var now = new Date();
    var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return Math.floor((tomorrow.getTime() - now.getTime()) / 1000);
}

/** Returns a formatted string for the date
 *
 * @param {Date} date A date to format
 * @returns {string} A string in format 'dd.MM.YY'(?)
 */
function formatDateDDMMYY(date) {
    if (!date) return null;
    return [
        appendZerosForTwoDigits(date.getDate()),
        appendZerosForTwoDigits(date.getMonth() + 1),
        appendZerosForTwoDigits(date.getFullYear())
    ].join(".");
}

/** Appends a leading zeroes for 2-digit number string
 *
 * @param {number} num A number
 * @returns {string} A 2-digit string with leading zeroes if needed
 */
function appendZerosForTwoDigits(num) {
    num = num % 100;
    return num >= 10 ? "" + num : "0" + num;
}

/** Returns relationally formatted date string. The format depends on the time passed since the date
 *
 * @param {Date} date - The date to be formatted
 * @returns {string} The formatted string
 */
function relationalDateFormat(date) {
    if (!date) return null;
    var now = new Date();
    var diff = now - date;
    if (diff < 1000) {
        return 'just now';
    }
    if (diff < 60 * 1000) {
        return Math.floor(diff / 1000) + ' seconds ago';
    }
    if (diff < 60 * 60 * 1000) {
        return Math.floor(diff / (60 * 1000)) + ' minutes ago';
    }
    return [
            appendZerosForTwoDigits(date.getDate()),
            appendZerosForTwoDigits(date.getMonth() + 1),
            appendZerosForTwoDigits(date.getFullYear())
        ].join(".")
        + " "
        + [
            appendZerosForTwoDigits(date.getHours()),
            appendZerosForTwoDigits(date.getMinutes())
        ].join(":");
}