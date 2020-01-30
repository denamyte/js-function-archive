/** Launches a prompt query and asks to enter a mathematical expression. Then, evaluates the expression using the eval function.
 * If the evaluation fails, then relaunches the prompt query until the input expression is valid.
 */

function evalCalculatorWithErrors() {
    for (; ;) {
        try {
            var input = prompt("Enter a valid mathematical expression", 1);
            if (input === null) {
                return;
            } else {
                var result = eval(input);
                if (typeof result  === 'number' && !isNaN(result) && isFinite(result)) {
                    alert(result);
                    return;
                } else {
                    throw new Error('The result [' + result + '] is not a valid number');
                }
            }
        } catch (e) {
            alert("Error: " + e.message + ", repeat the input");
        }
    }
}