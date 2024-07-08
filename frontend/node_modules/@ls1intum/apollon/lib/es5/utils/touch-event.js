"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientEventCoordinates = exports.convertTouchEndIntoPointerUp = void 0;
/**
 * touchend events are always invoked on the elements which also have the touchstart event.
 * This function creates and dispatches a pointerup event on the actual target
 * @param event originally invoked touchend event
 */
function convertTouchEndIntoPointerUp(event) {
    if (event.changedTouches.length > 0) {
        var target = document.elementFromPoint(event.changedTouches[event.changedTouches.length - 1].clientX, event.changedTouches[event.changedTouches.length - 1].clientY);
        if (!target) {
            return;
        }
        // creating pointerup event
        var pointerEvent = new PointerEvent('pointerup', {
            cancelable: true,
            bubbles: true,
            screenX: event.changedTouches[event.changedTouches.length - 1].pageX,
            screenY: event.changedTouches[event.changedTouches.length - 1].pageY,
            clientX: event.changedTouches[event.changedTouches.length - 1].clientX,
            clientY: event.changedTouches[event.changedTouches.length - 1].clientY,
        });
        // dispatching on target
        // when it bubbles up -> it reaches the connectable HOC of the target (that we actually want)
        target.dispatchEvent(pointerEvent);
        return;
    }
}
exports.convertTouchEndIntoPointerUp = convertTouchEndIntoPointerUp;
function getClientEventCoordinates(event) {
    // touch events are our own created touch events, see above
    var eventClientX = event instanceof PointerEvent ? event.clientX : event.touches[0].clientX;
    var eventClientY = event instanceof PointerEvent ? event.clientY : event.touches[0].clientY;
    return { clientX: eventClientX, clientY: eventClientY };
}
exports.getClientEventCoordinates = getClientEventCoordinates;
//# sourceMappingURL=touch-event.js.map