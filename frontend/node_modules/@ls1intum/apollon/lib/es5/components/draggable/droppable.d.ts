import React from 'react';
import { DraggableContext } from './draggable-context';
type Props = {
    owner?: string;
    children: React.ReactNode;
} & DraggableContext;
export declare const Droppable: (props: Pick<Props, "children" | "owner">) => React.JSX.Element;
export {};
