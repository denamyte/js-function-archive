/** Simulates a simple coffee machine
 *
 * @param power The power of the coffee machine
 * @constructor
 */
function CoffeeMachine(power) {
    this.waterAmount = 0;

    var WATER_HEAT_CAPACITY = 4200;

    var self = this;

    function getBoilTime() {
        return self.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
    }

    var timerId = null;

    function onReady() {
        alert( 'El café está preparado!' );
        timerId = null;
    }

    this.run = function() {
        if (timerId === null) {
            timerId = setTimeout(onReady, getBoilTime());
        } else {
            alert('El máquina de café ya está funcionando');
        }
    };

    this.stop = function () {
        if (timerId !== null) {
            clearTimeout(timerId);
            timerId = null;
            alert('La máquina ha sido apagada');
        } else {
            alert('No puedo apagar la máquina, no funciona');
        }
    };

}