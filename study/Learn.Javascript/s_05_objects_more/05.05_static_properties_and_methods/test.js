describe("Article022.showStats", function() {
    before(function() {
        sinon.stub(window, "alert");
        this.clock = sinon.useFakeTimers();
    });

    after(function() {
        window.alert.restore();
        this.clock.restore();
    });

    it("Shows the number of articles and the date of the creation of the last article", function() {
        new Article022();
        this.clock.tick(100);
        var article = new Article022();
        Article022.showStats();

        assert(alert.calledWith('Total: 2, The last: ' + article.created));
    });

    it("and one more article...", function() {
        this.clock.tick(100);
        var article = new Article022();
        Article022.showStats();

        assert(alert.calledWith('Total: 3, The last: ' + article.created));
    });
});