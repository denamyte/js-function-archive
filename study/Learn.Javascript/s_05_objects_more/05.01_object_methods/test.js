describe("calculator", function() {

    before(function() {
        sinon.stub(window, "prompt");

        prompt.onCall(0).returns("2");
        prompt.onCall(1).returns("3");

        calculator.read();
    });

    it("after input of 2 & 3 the sum equals to 5", function() {
        assert.equal(calculator.sum(), 5);
    });

    it("after input of 2 & 3 the product equals to 5", function() {
        assert.equal(calculator.mul(), 6);
    });

    after(function() {
        prompt.restore();
    });
});


describe('ladder', function () {

    it('after 4 ups and 2 downs return 2', function () {
        var alertStub = sinon.stub(window, 'alert');
        ladder.zero().up().down().down().up().up().up().showStep();
        assert(alertStub.calledWith(2), 'doesn\'t return 2');
        window.alert.restore();
    });

});