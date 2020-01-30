
describe('lastElementOfArray', function () {
    it('For an array with elements returns the last element', function () {
        assert.equal(lastElementOfArray(['apple', 'orange', 'grape']), 'grape');
    });
    it('For an undefined object returns undefined', function () {
        assert.equal(lastElementOfArray(undefined), undefined, 'The result is not undefined')
    });
    it('For an empty object returns undefined', function () {
        assert.equal(lastElementOfArray([]), undefined, 'The result is not undefined');
    });
});

describe('addNewElement', function () {
    it('For a defined array adds a new element at its end', function () {
        var ar = ['apple', 'orange'];
        var length1 = ar.length;
        addNewElement(ar, 'grape');
        var length2 = ar.length;
        assert.equal(length2 - length1, 1, 'The array length has not changed');
        assert.equal(ar[ar.length - 1], 'grape', 'The last element of the array is not the added element');
    });
    it('There is no effect for an undefined object', function () {
        var ar = undefined;
        addNewElement(ar, 'grape');
        assert.equal(ar, undefined);
    });
});

describe('arraySum', function () {
    it('Returns the sum of an array', function () {
        assert.equal(arraySum([1, 2, 3]), 6);
    });
});

describe("find", function() {

    describe("returns the position, on which the element is", function() {
        it("in the array [1,2,3] finds 1 at position 0", function() {
            assert.equal(find([1, 2, 3], 1), 0);
        });
        it("in the array [1,2,3] finds 2 at position 1", function() {
            assert.equal(find([1, 2, 3], 2), 1);
        });
        it("in the array [1,2,3] finds 3 at position 2", function() {
            assert.equal(find([1, 2, 3], 3), 2);
        });
    });

    it("if element is not found, returns -1", function() {
        assert.equal(find([1, 2, 3], 0), -1);
    });

    it("distinguish false или null from 0", function() {
        assert.equal(find([false, true, null], 0), -1);
    });

    it("distinguish 1 and true", function() {
        assert.equal(find([1, 2, 3], true), -1);
    });
});

describe("filterRange", function() {

    it("returns the filtered values", function() {

        var arr = [5, 3, 8, 1];
        var filtered = filterRange(arr, 1, 4);
        assert.deepEqual(filtered, [3, 1]);
    });

    it("doesn't change the initial array", function() {

        var arr = [5, 3, 8, 1];
        var filtered = filterRange(arr, 1, 4);
        assert.deepEqual(arr, [5,3,8,1]);
    });

});

describe('eratosthenesSieve', function () {

    it('returns [2, 3, 5, 7] from 10 first numbers', function () {
        var simples = [2, 3, 5, 7];
        assert.deepEqual(eratosthenesSieve(10), simples);
    });

    it('returns [11, 13, 17, 19] from 20 first numbers, starting from the 5th simple number', function () {
        var simples = [11, 13, 17, 19];
        assert.deepEqual(eratosthenesSieve(20).slice(4), simples);
    });
});

describe("getMaxSubSum", function() {
    it("maximal subsum of [1, 2, 3] equals 6", function() {
        assert.equal(getMaxSubSum([1, 2, 3]), 6);
    });

    it("maximal subsum of [-1, 2, 3, -9] equals 5", function() {
        assert.equal(getMaxSubSum([-1, 2, 3, -9]), 5);
    });

    it("maximal subsum of [-1, 2, 3, -9, 11] equals 11", function() {
        assert.equal(getMaxSubSum([-1, 2, 3, -9, 11]), 11);
    });

    it("maximal subsum of [-2, -1, 1, 2] equals 3", function() {
        assert.equal(getMaxSubSum([-2, -1, 1, 2]), 3);
    });

    it("maximal subsum of [100, -9, 2, -3, 5] equals 100", function() {
        assert.equal(getMaxSubSum([100, -9, 2, -3, 5]), 100);
    });

    it("maximal subsum of [] equals 0", function() {
        assert.equal(getMaxSubSum([]), 0);
    });

    it("maximal subsum of [-1] equals 0", function() {
        assert.equal(getMaxSubSum([-1]), 0);
    });

    it("maximal subsum of [-1, -2] equals 0", function() {
        assert.equal(getMaxSubSum([-1, -2]), 0);
    });
});