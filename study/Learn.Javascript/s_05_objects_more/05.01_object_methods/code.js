/** A simple calculator.
 *
 * @type {{arg1: number, arg2: number, read: calculator.read, sum: (function(): number), mul: (function(): number)}}
 */
const calculator = {

    arg1: 0,
    arg2: 0,
    read: function () {
        this.arg1 = +prompt("Insert the first argument", 0);
        this.arg2 = +prompt("Insert the second argument", 0);
    },

    sum: function () {
        return this.arg1 + this.arg2;
    },

    mul: function () {
        return this.arg1 * this.arg2;
    }
};

/** A ladder with chained calls.
 *
 * @type {{step: number, up: (function(): ladder), down: (function(): ladder), showStep: ladder.showStep}}
 */
var ladder = {
    step: 0,
    zero: function() {
        this.step = 0;
        return this;
    },
    up: function() { // вверх по лестнице
        this.step++;
        return this;
    },
    down: function() { // вниз по лестнице
        this.step--;
        return this;
    },
    showStep: function() { // вывести текущую ступеньку
        alert( this.step );
    }
};
