describe("makeLogging", function() {
    it("logs the calls' arguments to the array log", function() {
        var work = sinon.spy();

        var log = [];
        work = makeLogging(work, log);
        assert.deepEqual(log, []);

        work(1);
        assert.deepEqual(log, [1]);

        work(2);
        assert.deepEqual(log, [1, 2]);
    });

    it("transfers a call of the function, returns its result", function() {
        var log = [];

        function work(x) {
            return x * 2;
        }

        work = sinon.spy(work);
        var spy = work;
        work = makeLogging(work, log);

        assert.equal(work(1), 2);
        assert(spy.calledWith(1));
    });


    it("saves the context of the call for the methods of an object", function() {
        var log = [];

        var calculator = {
            double: function(x) {
                return x * 2;
            }
        };

        calculator.double = sinon.spy(calculator.double);
        var spy = calculator.double;
        calculator.double = makeLogging(calculator.double, log);

        assert.equal(calculator.double(1), 2);
        assert(spy.calledWith(1));
        assert(spy.calledOn(calculator));
    });

});


describe("makeComplexLogging", function() {
    it("logs the calls' arguments to the array log", function() {
        var work = sinon.spy();

        var log = [];
        work = makeComplexLogging(work, log);
        assert.deepEqual(log, []);

        work(1, 2);
        assert.deepEqual(log, [
            [1, 2]
        ]);

        work(3, 4);
        assert.deepEqual(log, [
            [1, 2],
            [3, 4]
        ]);
    });

    it("transfers a call of the function, returns its result", function() {
        var log = [];

        function sum(a, b) {
            return a + b;
        }

        sum = sinon.spy(sum);
        var spy = sum;
        sum = makeComplexLogging(sum, log);

        assert.equal(sum(1, 2), 3);
        assert(spy.calledWith(1, 2));
    });


    it("saves the context of the call for the methods of an object", function() {
        var log = [];

        var calculator = {
            sum: function(a, b) {
                return a + b;
            }
        };

        calculator.sum = sinon.spy(calculator.sum);
        var spy = calculator.sum;
        calculator.sum = makeComplexLogging(calculator.sum, log);

        assert.equal(calculator.sum(1, 2), 3);
        assert(spy.calledWith(1, 2));
        assert(spy.calledOn(calculator));
    });

});

describe("makeCaching", function() {

    it("remembers the previous return value of the function with the same argument", function() {
        function f(x) {
            return Math.random() * x;
        }

        f = makeCaching(f);

        var a = f(1);
        var b = f(1);
        assert.equal(a, b);

        var anotherValue = f(2);
        // almost surely another value
        assert.notEqual(a, anotherValue);
    });

    it("saves the call context", function() {
        var obj = {
            spy: sinon.spy()
        };

        var spy = obj.spy;
        obj.spy = makeCaching(obj.spy);
        obj.spy(123);
        assert(spy.calledWith(123));
        assert(spy.calledOn(obj));
    });

});