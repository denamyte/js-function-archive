describe("addClass", function() {

    it("adds a nonexistent class", function() {
        var obj = {
            className: 'open menu'
        };
        addClass(obj, 'new');
        assert.deepEqual(obj, {
            className: 'open menu new'
        });
    });

    it("doesn't add an existent class", function() {
        var obj = {
            className: 'open menu'
        };
        addClass(obj, 'open');
        assert.deepEqual(obj, {
            className: 'open menu'
        });
    });

    it("doesn't add extra spaces for a nonexistent class", function() {
        var obj = {
            className: ''
        };
        addClass(obj, 'open');
        assert.deepEqual(obj, {
            className: 'open'
        });
    });

});

describe("camelize", function() {

    it("leaves an empty line as is", function() {
        assert.equal(camelize(""), "");
    });

    it("turns background-color into backgroundColor", function() {
        assert.equal(camelize("background-color"), "backgroundColor");
    });

    it("turns list-style-image into listStyleImage", function() {
        assert.equal(camelize("list-style-image"), "listStyleImage");
    });

    it("turns -webkit-transition into WebkitTransition", function() {
        assert.equal(camelize("-webkit-transition"), "WebkitTransition");
    });

});

describe("removeClass", function() {

    it("does nothing, if there is no class", function() {
        var obj = {
            className: 'open menu'
        };
        removeClass(obj, 'new');
        assert.deepEqual(obj, {
            className: 'open menu'
        });
    });

    it("doesn't change an empty property", function() {
        var obj = {
            className: ''
        };
        removeClass(obj, 'new');
        assert.deepEqual(obj, {
            className: ""
        });
    });

    it("removes class leaving no extra spaces", function() {
        var obj = {
            className: 'open menu'
        };
        removeClass(obj, 'open');
        assert.deepEqual(obj, {
            className: "menu"
        });
    });

    it("results in an empty string if the property contains only the class", function() {
        var obj = {
            className: "menu"
        };
        removeClass(obj, 'menu');
        assert.deepEqual(obj, {
            className: ""
        });
    });

    it("removes class from the middle of the list", function() {
        var obj = {
            className: "open menu now"
        };
        removeClass(obj, 'menu');
        assert.deepEqual(obj, {
            className: "open now"
        });
    });

    it("removes a repetitive class from the middle of the list", function() {
        var obj = {
            className: "open menu menu zero"
        };
        removeClass(obj, 'menu');
        assert.deepEqual(obj, {
            className: "open zero"
        });
    });

});

describe("filterRangeInPlace", function() {

    it("changes the array, remaining only the values in the range", function() {
        var arr = [5, 3, 8, 1];
        filterRangeInPlace(arr, 1, 4);
        assert.deepEqual(arr, [3, 1]);
    });

});

describe('sortReversed', function () {

    it('sorts and reverses an array in place', function () {
        var arr = [5, 2, 1, -10, 8];
        sortReversed(arr);
        assert.deepEqual(arr, [8, 5, 2, 1, -10]);
    });

});

describe('copyAndSortArray', function () {

    it('Returns copied and sorted array', function () {
        var arr = ["HTML", "JavaScript", "CSS"];
        var copied = copyAndSortArray(arr);
        assert.deepEqual(copied, ["CSS", "HTML", "JavaScript"]);
    });

    it('Doesn\'t change the original array', function () {
        var arr = ["HTML", "JavaScript", "CSS"];
        copyAndSortArray(arr);
        assert.deepEqual(arr, ["HTML", "JavaScript", "CSS"]);
    });

});

describe('sortObjectsByProperty', function () {

    it('sorts normally configured objects', function () {
        var person1 = { name: "person1", age: 23 };
        var person2 = { name: "person2", age: 18 };
        var person3 = { name: "person3", age: 6 };

        var objArray = [person1, person2, person3];
        sortObjectsByProperty(objArray, "age");

        assert.deepEqual(objArray, [person3, person2, person1]);
    });

    it('returns an array of the sort property values', function () {
        var person1 = { name: "person1", age: 23 };
        var person2 = { name: "person2", age: 18 };
        var person3 = { name: "person3", age: 6 };

        var objArray = [person1, person2, person3];
        var props = sortObjectsByProperty(objArray, "age");

        assert.deepEqual(props, [6, 18, 23]);
    });

});

describe('printListByLoop', function () {

    it('returns list values obtained by loop', function () {
        var list = {
            value: 1,
            next: {
                value: 2,
                next: {
                    value: 3,
                    next: {
                        value: 4,
                        next: null
                    }
                }
            }
        };

        var values = printListByLoop(list);
        assert.deepEqual(values, [1, 2, 3, 4]);
    });

});

describe('printListByRecursion', function () {

    it('returns list values obtained by recursion', function () {
        var list = {
            value: 1,
            next: {
                value: 2,
                next: {
                    value: 3,
                    next: {
                        value: 4,
                        next: null
                    }
                }
            }
        };

        var values = printListByRecursion([], list);
        assert.deepEqual(values, [1, 2, 3, 4]);
    });

});

describe('printReverseListByRecursion', function () {

    it('returns list values in the reversed order obtained by recursion', function () {
        var list = {
            value: 1,
            next: {
                value: 2,
                next: {
                    value: 3,
                    next: {
                        value: 4,
                        next: null
                    }
                }
            }
        };

        var values = printReverseListByRecursion(list, []);
        assert.deepEqual(values, [4, 3, 2, 1]);
    });

});

function intersection(arr1, arr2) {
    return arr1.filter(function(item) {
        return arr2.indexOf(item) != -1;
    });
}

describe("aclean", function() {

    it("contains only 1 word from each anagram set", function() {
        var arr = ["воз", "киборг", "корсет", "зов", "гробик", "костер", "сектор"];

        var result = aclean(arr);
        assert.equal(result.length, 3);

        assert.equal(intersection(result, ["гробик", "киборг"]).length, 1);
        assert.equal(intersection(result, ["воз", "зов"]).length, 1);
        assert.equal(intersection(result, ["корсет", "сектор", "костер"]).length, 1);

    });

    it("don't recognize the capitalization", function() {
        var arr = ["воз", "ЗОВ"];
        assert.equal(aclean(arr).length, 1);
    });

});

describe("unique", function() {
    it("removes repeating elements from the array", function() {
        var strings = ["кришна", "кришна", "харе", "харе",
            "харе", "харе", "кришна", "кришна", "8-()"
        ];

        assert.deepEqual(unique(strings), ["кришна", "харе", "8-()"]);
    });

    it("doesn't change the initial array", function() {
        var strings = ["кришна", "кришна", "харе", "харе"];
        unique(strings);

        assert.deepEqual(strings, ["кришна", "кришна", "харе", "харе"]);
    });
});

