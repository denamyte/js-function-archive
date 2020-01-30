describe("sumWithClosures", function() {
    it("For arguments 1 and 2 returns 3", function() {
        assert.equal(sumWithClosures(1)(2), 3);
    });

    it("For arguments 5 and -1 returns 4", function() {
        assert.equal(sumWithClosures(5)(-1), 4);
    });

    it("For arguments -10 and -20 returns -30", function() {
        assert.equal(sumWithClosures(-10)(-20), -30);
    });

});

describe('makeBuffer', function () {

    var buffer;
    beforeEach(function () {
        buffer = makeBuffer();
    });

    it("returns an empty string by default", function () {
        assert.strictEqual(buffer(), "");
    });

    it("adds arguments into a buffer", function () {
        buffer('It is necessary');
        buffer(' to use');
        buffer(' closures!');
        assert.equal(buffer(), 'It is necessary to use closures!');
    });

    it("converts everything to string", function () {
        buffer(null);
        buffer(false);
        assert.equal(buffer(), "nullfalse");
    });

    it("clears the buffer by calling clear()", function() {
        buffer("test");
        buffer.clear();
        buffer("first, ");
        buffer("second");
        assert.equal(buffer(), "first, second");
    });
});

describe('compareByField', function () {

    var users;
    beforeEach(function () {
        users = [{
            name: 'Basil',
            surname: 'Ivanov',
            age: 20
        }, {
            name: 'Peter',
            surname: 'Chapaev',
            age: 25
        }, {
            name: 'Maria',
            surname: 'Bearborn',
            age: 18
        }];
    });

    it('properly sorts by "name" field', function () {
        assert.deepEqual(users.sort(compareByField('name')),
            [{
                name: 'Basil',
                surname: 'Ivanov',
                age: 20
            }, {
                name: 'Maria',
                surname: 'Bearborn',
                age: 18
            }, {
                name: 'Peter',
                surname: 'Chapaev',
                age: 25
            }]);
    });

    it('properly sorts by "surname" field', function () {
        assert.deepEqual(users.sort(compareByField('surname')),
            [{
                name: 'Maria',
                surname: 'Bearborn',
                age: 18
            }, {
                name: 'Peter',
                surname: 'Chapaev',
                age: 25
            }, {
                name: 'Basil',
                surname: 'Ivanov',
                age: 20
            }]);
    });

    it('properly sorts by "age" field', function () {
        assert.deepEqual(users.sort(compareByField('age')),
            [{
                name: 'Maria',
                surname: 'Bearborn',
                age: 18
            }, {
                name: 'Basil',
                surname: 'Ivanov',
                age: 20
            }, {
                name: 'Peter',
                surname: 'Chapaev',
                age: 25
            }]);
    });
});

describe('filtering arrays with predicates', function () {

    var arr;

    before(function() {
        arr = [1, 2, 3, 4, 5, 6, 7];
    });

    describe("inArray_ArrayPredicate", function() {
        var checkInArr;

        before(function() {
            checkInArr = inArray_ArrayPredicate(arr);
        });

        it("returns a filter for checking a value exists in the array", function() {
            assert.isTrue(checkInArr(5));
            assert.isFalse(checkInArr(0));
        });
    });


    describe("inBetween_ArrayPredicate", function() {
        var checkBetween36;

        before(function() {
            checkBetween36 = inBetween_ArrayPredicate(3, 6);
        });

        it("returns a filter for checking a value is between the bounds", function() {
            assert.isTrue(checkBetween36(5));
            assert.isFalse(checkBetween36(0));
        });
    });


    describe("filterArrayByPredicate", function() {

        it("filters through func", function() {
            assert.deepEqual(filterArrayByPredicate(arr, function(a) {
                return a % 2 == 0;
            }), [2, 4, 6]);
        });

        it("doesn't change the initial array", function() {
            filterArrayByPredicate(arr, function(a) {
                return a % 2 == 0;
            });
            assert.deepEqual(arr, [1, 2, 3, 4, 5, 6, 7]);
        });

        it("supports the inBetween filter", function() {
            assert.deepEqual(filterArrayByPredicate(arr, inBetween_ArrayPredicate(3, 6)), [3, 4, 5, 6]);
        });

        it("supports the inArray filter", function() {
            assert.deepEqual(filterArrayByPredicate(arr, inArray_ArrayPredicate([1, 2, 3])), [1, 2, 3]);
        });

    });

});

describe('makeArmy', function () {

    var army;
    before(function() {
        army = makeArmy();
        window.alert = sinon.stub(window, "alert");
    });

    it("army[0]() outputs 0", function() {
        army[0]();
        assert(alert.calledWith(0));
    });


    it("army[5]() outputs 5", function() {
        army[5]();
        assert(alert.calledWith(5));
    });

    after(function() {
        window.alert.restore();
    });

});