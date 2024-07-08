import React, { FunctionComponent } from 'react';
import { FlowchartElement } from '../index';
export declare const FlowchartComponent: FunctionComponent<Props>;
export interface Props {
    element: FlowchartElement;
    children?: React.ReactNode;
}
