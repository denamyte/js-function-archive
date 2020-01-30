/** Returns a Promise, which becomes resolved after ms milliseconds
 *
 * @param ms Milliseconds to wait
 * @returns {Promise<any>} A Promise to resolve in ms milliseconds
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms) );
}