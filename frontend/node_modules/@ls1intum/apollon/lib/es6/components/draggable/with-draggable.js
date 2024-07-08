import React from 'react';
import { DraggableConsumer } from './draggable-context';
/**
 * used to add DraggableContext properties to component properties, i.e. {@link DraggableContext.onDragStart} and {@link DraggableContext.onDragEnd}
 * @param Component which needs access to the props of DraggableContext
 */
export function withDraggable(Component) {
    return function ThemedComponent(props) {
        return React.createElement(DraggableConsumer, null, (context) => React.createElement(Component, { ...props, ...context }));
    };
}
//# sourceMappingURL=with-draggable.js.map