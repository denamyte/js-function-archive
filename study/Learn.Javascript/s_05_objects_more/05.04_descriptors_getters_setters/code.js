function User021(fullName) {
    this.fullName = fullName;

    Object.defineProperties(this, {
        firstName: {
            get: function () {
                return this.fullName.split(' ')[0];
            },
            set: function (value) {
                this.fullName = [value, this.fullName.split(' ')[1]].join(' ');
            }
        },

        lastName: {
            get: function () {
                return this.fullName.split(' ')[1];
            },
            set: function (value) {
                this.fullName = [this.fullName.split(' ')[0], value].join(' ');
            }
        }
    });
}

