function addDeferToFunctionPrototype() {
    Function.prototype.defer1 = function (ms) {
        var self = this;
        return function () {
            var args = arguments;
            setTimeout(function () {
                self.apply(self, args);
            }, ms);
        };
    };
    Function.prototype.defer2 = function(ms) {
        return (...keys) => {
            setTimeout(this, ms, ...keys);
        };
    };
}
