describe("getSums", function() {

    it("partial sums [1,2,3,4,5] equal [1,3,6,10,15]", function() {
        assert.deepEqual(getSums([1, 2, 3, 4, 5]), [1, 3, 6, 10, 15]);
    });

    it("partial sums [-2,-1,0,1] equal [-2,-3,-3,-2]", function() {
        assert.deepEqual(getSums([-2, -1, 0, 1]), [-2, -3, -3, -2]);
    });

    it("partial sums [] equal []", function() {
        assert.deepEqual(getSums([]), []);
    });

    it("partial sums [1] equal [1]", function() {
        assert.deepEqual(getSums([1]), [1]);
    });
});