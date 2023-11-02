/**
 * Throttle as a minimizing function; it minimizes the number of calls made within a certain time interval.<br/>
 * RequestAnimationFrame is used for the time interval
 * @param {Function} cb callback
 * @returns {(function(...[*]): void)|*}
 */
export function throttle(cb) {
    let timeout;

    return (...args) => {
        if (timeout) {
            cancelAnimationFrame(timeout);
        }
        timeout = requestAnimationFrame(cb.bind(null, ...args));
    }
}