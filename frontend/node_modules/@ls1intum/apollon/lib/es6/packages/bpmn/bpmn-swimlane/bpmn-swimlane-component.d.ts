import React, { FunctionComponent } from 'react';
import { BPMNSwimlane } from './bpmn-swimlane';
export declare const BPMNSwimlaneComponent: FunctionComponent<Props>;
interface Props {
    element: BPMNSwimlane;
    fillColor?: string;
    textColor?: string;
    children?: React.ReactNode;
}
export {};
