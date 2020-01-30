function formatDate(date) {
    // What is date?
    var clazz = getClass(date);
    var arg = date;
    if (clazz === 'Date') {  // It's already a Date object
        // nothing to do (we could organize the code in some other way, without an empty if... :) )
    } else if (clazz === 'String') {  // A string Date representation
        date = new Date(arg);
    } else if (clazz === 'Number') {  // A number of milliseconds from 1970-01-01
        date = new Date(arg * 1000);
    } else if (clazz === 'Array') {  // An array with year, month, date [yyyy, mm, dd]
        date = new Date(arg[0], arg[1], arg[2]);
    }
    if (date)  {
        function complete2digits(digits) {
            digits = '' + digits;
            return digits.length > 1 ? digits : '0' + digits;
        }
        return complete2digits(date.getDate()) + '.'
            + complete2digits(date.getMonth() + 1) + '.'
            + ('' + date.getFullYear()).slice(-2);
    }
}