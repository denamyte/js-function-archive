
describe("Calculator", function() {
    var calculator;
    before(function() {

        sinon.stub(window, "prompt");

        prompt.onCall(0).returns("2");
        prompt.onCall(1).returns("3");

        calculator = new Calculator();
        calculator.read();
    });

    it("after input 2 and 3 the sum is 5", function() {
        assert.equal(calculator.sum(), 5);
    });

    it("after input 2 and 3 the product is 6", function() {
        assert.equal(calculator.mul(), 6);
    });

    after(function() {
        prompt.restore();
    });

});

describe("Accumulator(1)", function() {
    var accumulator;
    before(function() {
        accumulator = new Accumulator(1);
    });

    beforeEach(function() {
        sinon.stub(window, "prompt")
    });

    afterEach(function() {
        prompt.restore();
    });

    it("the initial value 1", function() {
        assert.equal(accumulator.value, 1);
    });

    it("after inputting 0 the value is 1", function() {
        prompt.returns("0");
        accumulator.read();
        assert.equal(accumulator.value, 1);
    });

    it("after inputting 1 the value is 2", function() {
        prompt.returns("1");
        accumulator.read();
        assert.equal(accumulator.value, 2);
    });

    it("after inputting 2 the value is 4", function() {
        prompt.returns("2");
        accumulator.read();
        assert.equal(accumulator.value, 4);
    });

});

describe('CalculatorExt', function () {

    var calculator;
    before(function() {
        calculator = new CalculatorExt();
    });

    it("calculate(12 + 34) = 46", function() {
        assert.equal(calculator.calculate("12 + 34"), 46);
    });

    it("calculate(34 - 12) = 22", function() {
        assert.equal(calculator.calculate("34 - 12"), 22);
    });

    it("adding the product: calculate(2 * 3) = 6", function() {
        calculator.addMethod("*", function(a, b) {
            return a * b;
        });
        assert.equal(calculator.calculate("2 * 3"), 6);
    });

    it("adding the exponentiation: calculate(2 ** 3) = 8", function() {
        calculator.addMethod("**", function(a, b) {
            return Math.pow(a, b);
        });
        assert.equal(calculator.calculate("2 ** 3"), 8);
    });

});

