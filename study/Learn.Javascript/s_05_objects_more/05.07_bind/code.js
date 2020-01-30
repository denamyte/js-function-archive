"use strict";

/** A simple test function which prompts for a user's answer an then compares it with the parameter answer.
 *  If a user's answer coincide with the parameter answer an ok function is invoked, otherwise
 *  a fail function is invoked.
 *
 * @param {string} question A question to a user.
 * @param {string} answer A control answer to be compared to a user's answer
 * @param {function} ok An ok function
 * @param {function} fail A fail function.
 */
function ask(question, answer, ok, fail) {
    var result = prompt(question, '');
    if (result.toLowerCase() === answer.toLowerCase()) ok();
    else fail();
}


var user = {
    login: 'Basilio',
    password: '12345',

    loginOk: function() {
        alert( this.login + ' entered the site' );
    },

    loginFail: function() {
        alert( this.login + ': error entering the site' );
    },

    checkPassword: function() {
        ask("Your password?", this.password, this.loginOk.bind(this), this.loginFail.bind(this));
    }
};

var user2 = {
    login: 'Basilio2',
    password: '12345',

    // a method for calling from the ask function
    loginDone: function(result) {
        alert( this.login + (result ? ' entered the site' : ' error entering the site') );
    },

    checkPassword: function() {
        ask("Your password?", this.password,
            this.loginDone.bind(this, true),
            this.loginDone.bind(this, false)
        );
    }
};

