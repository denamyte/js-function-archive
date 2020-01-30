
describe("ucFirst", function() {
    it('Uppercases the first symbol', function() {
        assert.strictEqual(ucFirst("john"), "John");
    });

    it("Doesn't die on an empty string", function() {
        assert.strictEqual(ucFirst(""), "");
    });
});

describe("checkSpam", function() {
    it('finds spam in "buy ViAgRA now"', function() {
        assert.isTrue(checkSpam('buy ViAgRA now', ['viagra', 'XXX']));
    });

    it('finds spam in "free xxxxx"', function() {
        assert.isTrue(checkSpam('free xxxxx', ['viagra', 'XXX']));
    });

    it('no spam in "innocent rabbit"', function() {
        assert.isFalse(checkSpam('innocent rabbit', ['viagra', 'XXX']));
    });
});

describe("truncate", function() {
    it("truncate the long string to the given lenth (including the ellipsis)", function() {
        assert.equal(
            truncate("What I'd like to tell on this topic is:", 20),
            "What I'd like to ..."
        );
    });

    it("doesn't change short strings", function() {
        assert.equal(
            truncate("Hi everyone!", 20),
            "Hi everyone!"
        );
    });

});

describe("extractCurrencyValue", function() {

    it("for the string $120 returns the number 120", function() {
        assert.strictEqual(extractCurrencyValue('$120'), 120);
    });


});