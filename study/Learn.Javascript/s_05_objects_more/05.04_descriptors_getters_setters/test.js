describe('User021', function () {

    var user;

    beforeEach(function () {
        user = new User021('James Bond');
    });

    it('contains only 1 enumerable property', function () {
        var props = Object.keys(user);
        assert.equal(props.length, 1);
    });

    it('contains properties "firstName" and "lastName"', function () {
        var names = Object.getOwnPropertyNames(user);
        assert.isTrue(!!~names.indexOf('firstName'), "doesn't contain 'firstName'");
        assert.isTrue(!!~names.indexOf('lastName'), "doesn't contain 'lastName'");
    });

    it('returns "James" when user.firstName is called', function () {
        assert.equal(user.firstName, 'James');
    });

    it('changes the first name when user.firstName property is set', function () {
        user.firstName = 'Jimmy';
        assert.equal(user.fullName, 'Jimmy Bond');
    });

    it('returns "Bond" when user.lastName is called', function () {
        assert.equal(user.lastName, 'Bond');
    });

    it('changes the last name when user.lastName property is set', function () {
        user.lastName = 'Donkey';
        assert.equal(user.fullName, 'James Donkey');
    });

});