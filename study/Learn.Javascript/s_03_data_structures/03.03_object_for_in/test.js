describe("isEmpty", function() {
    it("returns true for an empty object", function() {
        assert.isTrue(isEmpty({}));
    });

    it("returns false if a property exists", function() {
        assert.isFalse(isEmpty({
            anything: false
        }));
    });
});

describe('salariesSum', function () {
    it('returns proper sum for a filled object', function () {
        assert.equal(salariesSum({
            "Mitarbeiter 1": 100,
            "Mitarbeiter 2": 300,
            "Mitarbeiter 3": 250
        }), 650, 'The sum of 100, 300 and 250 is not 650')
    });
    it('returns 0 for an empty object', function () {
        assert.equal(salariesSum({}), 0);
    });
    it('returns 0 for an undefined object', function () {
        assert.equal(salariesSum(undefined), 0);
    });
    it('returns 0 for a null object', function () {
        assert.equal(salariesSum(null), 0);
    });
});

describe('biggestSalaryProp', function () {
    it('returns the proper biggest salary in filled object', function () {
        assert.equal(biggestSalaryProp({
            "Mitarbeiter 1": 100,
            "Mitarbeiter 2": 300,
            "Mitarbeiter 3": 250
        }), "Mitarbeiter 2")
    });
    describe('biggestSalaryProp_zero_cases', function () {
        it('returns "No co-worker" if salaries object is empty', function () {
            assert.equal(biggestSalaryProp({}), "No co-worker");
        });
        it('returns "No co-worker" if salaries object is not defined', function () {
            assert.equal(biggestSalaryProp(undefined), "No co-worker");
        });
        it('returns "No co-worker" if salaries object is null', function () {
            assert.equal(biggestSalaryProp(null), "No co-worker");
        });
    });
});

describe("multiplyNumeric", function() {
    it("multiplies all numeric properties by 2", function() {
        var menu = {
            width: 200,
            height: 300,
            title: "My menu"
        };
        multiplyNumeric(menu);
        assert.equal(menu.width, 400);
        assert.equal(menu.height, 600);
        assert.equal(menu.title, "My menu");
    });

    it("returns nothing", function() {
        assert.isUndefined( multiplyNumeric({}) );
    });

});