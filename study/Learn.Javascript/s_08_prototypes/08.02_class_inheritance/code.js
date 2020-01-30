
function Clock_1(options) {

    var template = options.template;
    var timer;

    function render() {
        var date = new Date();

        var hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        var min = date.getMinutes();
        if (min < 10) min = '0' + min;

        var sec = date.getSeconds();
        if (sec < 10) sec = '0' + sec;

        var output = template.replace('h', hours).replace('m', min).replace('s', sec);

        console.log(output);
    }

    this.stop = function() {
        clearInterval(timer);
    };

    this.start = function() {
        render();
        timer = setInterval(render, 1000);
    }

}

function Clock_1_proto(options) {
    this._template = options.template;
    this._timer;
}

Clock_1_proto.prototype.render = function () {
    var date = new Date();

    var hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    var min = date.getMinutes();
    if (min < 10) min = '0' + min;

    var sec = date.getSeconds();
    if (sec < 10) sec = '0' + sec;

    var output = this._template.replace('h', hours).replace('m', min).replace('s', sec);

    console.log(output);
};

Clock_1_proto.prototype.stop = function () {
    clearInterval(this._timer);
};

Clock_1_proto.prototype.start = function () {
    this.render();
    var self = this;
    this._timer = setInterval(function() {
        self.render();
    }, 1000);
};

// **********************************************************************
// Creating an extended clock from an existing clock

function Clock2_parent(options) {
    this._template = options.template;
}

Clock2_parent.prototype.render = function render() {
    var date = new Date();

    var hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    var min = date.getMinutes();
    if (min < 10) min = '0' + min;

    var sec = date.getSeconds();
    if (sec < 10) sec = '0' + sec;

    var output = this._template.replace('h', hours).replace('m', min).replace('s', sec);

    console.log(output);
};

Clock2_parent.prototype.stop = function() {
    clearInterval(this._timer);
};

Clock2_parent.prototype.start = function() {
    this.render();
    var self = this;
    this._timer = setInterval(function() {
        self.render();
    }, 1000);
};

//******************

function Clock2_extended(options) {
    Clock2_parent.apply(this, arguments);
    this._precision = +options.precision || 1000;
}

extend(Clock2_extended, Clock2_parent);

Clock2_extended.prototype.start = function () {
    this.render();
    var self = this;
    this._timer = setInterval(function() {
        self.render();
    }, this._precision);
};

// **************************************************************************
// Extending Menu with animation

function Menu(state) {
    this._state = state || this.STATE_CLOSED;
}

Menu.prototype.STATE_OPEN = 1;
Menu.prototype.STATE_CLOSED = 0;

Menu.prototype.open = function() {
    this._state = this.STATE_OPEN;
};

Menu.prototype.close = function() {
    this._state = this.STATE_CLOSED;
};

Menu.prototype._stateAsString = function() {
    switch (this._state) {
        case this.STATE_OPEN:
            return 'opened';

        case this.STATE_CLOSED:
            return 'closed';
    }
};

Menu.prototype.showState = function() {
    var show = console.log || alert;
    show(this._stateAsString());
};

// **************

function AnimatingMenu(state) {
    Menu.apply(this, arguments);
}

extend(AnimatingMenu, Menu);

AnimatingMenu.prototype.STATE_ANIMATING = 2;

AnimatingMenu.prototype.open = function () {
    var self = this;

    this._state = this.STATE_ANIMATING;
    this._timer = setTimeout(function () {
        Menu.prototype.open.call(self);
    }, 1000)
};

AnimatingMenu.prototype.close = function () {
    clearTimeout(this._timer);
    Menu.prototype.close.call(this);
};

AnimatingMenu.prototype._stateAsString = function () {
    switch (this._state) {
        case this.STATE_ANIMATING:
            return 'animating';

        default:
            return Menu.prototype._stateAsString.call(this);
    }
};


