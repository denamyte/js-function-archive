
function fractionalPart(input) {
    var num = Math.abs(input);
    var str = "" + num;
    var dotPosition = str.indexOf(".");
    var precision = dotPosition < 0 ? 0 : str.length - dotPosition - 1;
    return (num - Math.floor(num)).toFixed(precision);
}