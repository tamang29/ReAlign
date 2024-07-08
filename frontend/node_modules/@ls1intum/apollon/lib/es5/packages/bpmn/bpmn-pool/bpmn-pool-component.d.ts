import React, { FunctionComponent } from 'react';
import { BPMNPool } from './bpmn-pool';
export declare const BPMNPoolComponent: FunctionComponent<Props>;
interface Props {
    element: BPMNPool;
    fillColor?: string;
    strokeColor?: string;
    textColor?: string;
    children?: React.ReactNode;
}
export {};
