describe("multiBracketsSum", function() {

    it('multiBracketsSum(null) returns 0', function () {
        assert.equal(multiBracketsSum(null), 0);
    });

    it('multiBracketsSum(0) returns 0', function () {
        assert.equal(multiBracketsSum(0), 0);
    });

    it('multiBracketsSum(1)(2) returns 3', function () {
        assert.equal(multiBracketsSum(1)(2), 3);
    });

    it('multiBracketsSum(5)(-1)(2) returns 6', function () {
        assert.equal(multiBracketsSum(5)(-1)(2), 6);
    });

    it('multiBracketsSum(6)(-1)(-2)(-3) returns 0', function () {
        assert.equal(multiBracketsSum(6)(-1)(-2)(-3), 0);
    });

    it('multiBracketsSum(0)(1)(2)(3)(4)(5) returns 15', function () {
        assert.equal(multiBracketsSum(0)(1)(2)(3)(4)(5), 15);
    });

});

describe("mbs", function() {

    it('mbs(null) returns 0', function () {
        assert.equal(mbs(null), 0);
    });

    it('mbs(0) returns 0', function () {
        assert.equal(mbs(0), 0);
    });

    it('mbs(1)(2) returns 3', function () {
        assert.equal(mbs(1)(2), 3);
    });

    it('mbs(5)(-1)(2) returns 6', function () {
        assert.equal(mbs(5)(-1)(2), 6);
    });

    it('mbs(6)(-1)(-2)(-3) returns 0', function () {
        assert.equal(mbs(6)(-1)(-2)(-3), 0);
    });

    it('mbs(0)(1)(2)(3)(4)(5) returns 15', function () {
        assert.equal(mbs(0)(1)(2)(3)(4)(5), 15);
    });

});