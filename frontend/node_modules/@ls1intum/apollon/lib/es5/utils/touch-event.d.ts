/**
 * touchend events are always invoked on the elements which also have the touchstart event.
 * This function creates and dispatches a pointerup event on the actual target
 * @param event originally invoked touchend event
 */
export declare function convertTouchEndIntoPointerUp(event: TouchEvent): void;
export declare function getClientEventCoordinates(event: PointerEvent | TouchEvent): {
    clientX: number;
    clientY: number;
};
