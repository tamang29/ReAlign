import React from 'react';
import { DraggableContext } from './draggable-context';
import { DropEvent } from './drop-event';
type Props = {
    onDrop?: (event: DropEvent) => void;
    children: React.ReactNode;
} & DraggableContext;
export declare const Draggable: (props: Pick<Props, "children" | "onDrop">) => React.JSX.Element;
export {};
