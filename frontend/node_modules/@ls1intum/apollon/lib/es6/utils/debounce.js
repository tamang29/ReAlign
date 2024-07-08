// tslint:disable-next-line:ban-types
export function debounce(func, wait = 0) {
    let timeout;
    return function (...args) {
        // @ts-ignore
        const context = this;
        clearTimeout(timeout);
        timeout = window.setTimeout(() => func.apply(context, args), wait > 0 ? wait : 300);
    };
}
//# sourceMappingURL=debounce.js.map