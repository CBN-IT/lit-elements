/**
 * Throttle as a minimizing function; it minimizes the number of calls made within a certain time interval.<br/>
 * RequestAnimationFrame is used for the time interval
 */
export function throttle(cb:Function) {
    let timeout:number;

    return (...args:any[]) => {
        if (timeout) {
            cancelAnimationFrame(timeout);
        }
        timeout = requestAnimationFrame(cb.bind(null, ...args));
    }
}