
function Article022() {

    this.created = new Date();
    Article022.lastCreated = new Date(this.created.getTime());
    Article022.count++;

}

Article022.count = 0;
Article022.lastCreated = undefined;

Article022.showStats = function () {
    alert("Total: " + this.count + ", The last: " + this.lastCreated);
};