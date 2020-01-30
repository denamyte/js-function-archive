function User() {

    var firstName = '', surname = '';

    this.setFirstName = function (fname) {
        firstName = fname;
    };

    this.setSurname = function (sname) {
        surname = sname;
    };

    this.getFullName = function () {
        return firstName + " " + surname;
    }
}