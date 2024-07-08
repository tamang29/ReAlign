import React, { ComponentType } from 'react';
import { DraggableContext } from './draggable-context';
/**
 * used to add DraggableContext properties to component properties, i.e. {@link DraggableContext.onDragStart} and {@link DraggableContext.onDragEnd}
 * @param Component which needs access to the props of DraggableContext
 */
export declare function withDraggable<P extends DraggableContext>(Component: ComponentType<P>): (props: Pick<P, Exclude<keyof P, keyof DraggableContext>>) => React.JSX.Element;
