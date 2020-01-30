describe('sumArgs', function () {

    it('correctly sums all the numeric arguments', function () {
        assert.equal(sumArgs(1, 2, 3), 6);
    });

    it('correctly sums all numeric and string arguments', function () {
        assert.equal(sumArgs('1', 2, 3), '123');
    });

});

describe("applyAll", function() {

    it("applies a function to all the arguments starting from the 2nd", function() {
        var min = applyAll(Math.min, 1, 2, 3);
        assert.equal(min, 1);
    });

    it("if no arguments available, just calls a function", function() {
        var spy = sinon.spy();
        applyAll(spy);
        assert(spy.calledOnce);
        assert.equal(spy.firstCall.args.length, 0);
    });

});