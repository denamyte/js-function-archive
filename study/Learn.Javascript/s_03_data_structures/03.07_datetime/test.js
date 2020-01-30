describe("getWeekDay", function() {
    it("January 3d, 2014 - Friday", function() {
        assert.equal(getWeekDay(new Date(2014, 0, 3)), 'FR');
    });

    it("January 4th, 2014 - Saturday", function() {
        assert.equal(getWeekDay(new Date(2014, 0, 4)), 'SA');
    });

    it("January 5th, 2014 - Sunday", function() {
        assert.equal(getWeekDay(new Date(2014, 0, 5)), 'SU');
    });

    it("January 6, 2014 - Monday", function() {
        assert.equal(getWeekDay(new Date(2014, 0, 6)), 'MO');
    });

    it("January 7, 2014 - Tuesday", function() {
        assert.equal(getWeekDay(new Date(2014, 0, 7)), 'TU');
    });

    it("January 8, 2014 - Wednesday", function() {
        assert.equal(getWeekDay(new Date(2014, 0, 8)), 'WE');
    });

    it("January 9, 2014 - Thursday", function() {
        assert.equal(getWeekDay(new Date(2014, 0, 9)), 'TH');
    });
});

describe("getLocalDay", function() {
    it("January 3d, 2014 - Friday", function() {
        assert.equal(getLocalDay(new Date(2014, 0, 3)), 5);
    });

    it("January 4th, 2014 - Saturday", function() {
        assert.equal(getLocalDay(new Date(2014, 0, 4)), 6);
    });

    it("January 5th, 2014 - Sunday", function() {
        assert.equal(getLocalDay(new Date(2014, 0, 5)), 7);
    });

    it("January 6, 2014 - Monday", function() {
        assert.equal(getLocalDay(new Date(2014, 0, 6)), 1);
    });

    it("January 7, 2014 - Tuesday", function() {
        assert.equal(getLocalDay(new Date(2014, 0, 7)), 2);
    });

    it("January 8, 2014 - Wednesday", function() {
        assert.equal(getLocalDay(new Date(2014, 0, 8)), 3);
    });

    it("January 9, 2014 - Thursday", function() {
        assert.equal(getLocalDay(new Date(2014, 0, 9)), 4);
    });
});

describe("getDateAgo", function() {

    it("1 day till 02.01.2015 -> number 1", function() {
        assert.equal(getDateAgo(new Date(2015, 0, 2), 1), 1);
    });


    it("2 days till 02.01.2015 -> number 31", function() {
        assert.equal(getDateAgo(new Date(2015, 0, 2), 2), 31);
    });

    it("100 days till 02.01.2015 -> number 24", function() {
        assert.equal(getDateAgo(new Date(2015, 0, 2), 100), 24);
    });

    it("365 days till 02.01.2015 -> number 2", function() {
        assert.equal(getDateAgo(new Date(2015, 0, 2), 365), 2);
    });

    it("doesn't change a Date object transferred to the function", function() {
        var date = new Date(2015, 0, 2);
        var dateCopy = new Date(date);
        getDateAgo(dateCopy, 100);
        assert.equal(date.getTime(), dateCopy.getTime());
    });

});

describe("getLastDayOfMonth", function() {
    it("the last day of January 2012 - 31", function() {
        assert.equal(getLastDayOfMonth(2012, 0), 31);
    });

    it("the last day of February 2012 - 29 (leap year)", function() {
        assert.equal(getLastDayOfMonth(2012, 1), 29);
    });

    it("the last day of February 2013 - 28", function() {
        assert.equal(getLastDayOfMonth(2013, 1), 28);
    });
});

describe("formatDateDDMMYY", function() {
    it("formats correctly the date 01/30/14", function() {
        assert.equal(formatDateDDMMYY(new Date(2014, 0, 30)), '30.01.14');
    });

    it("правильно форматирует дату 01/01/01", function() {
        assert.equal(formatDateDDMMYY(new Date(2001, 0, 1)), '01.01.01');
    });

    it("правильно форматирует дату 01/01/00", function() {
        assert.equal(formatDateDDMMYY(new Date(2000, 0, 1)), '01.01.00');
    });
});

describe("relationalDateFormat", function() {
    it('returns the date 1 ms ago as "just now"', function() {
        assert.equal(relationalDateFormat(new Date(new Date - 1)), 'just now');
    });

    it('returns the date "30 seconds ago"', function() {
        assert.equal(relationalDateFormat(new Date(new Date - 30 * 1000)), "30 seconds ago");
    });

    it('returns the date "5 minutes ago"', function() {
        assert.equal(relationalDateFormat(new Date(new Date - 5 * 60 * 1000)), "5 minutes ago");
    });

    it('returns the old date in format dd.MM.YY hh:mm', function() {
        assert.equal(relationalDateFormat(new Date(2014, 2, 1, 11, 22, 33)), "01.03.14 11:22");
    });

});