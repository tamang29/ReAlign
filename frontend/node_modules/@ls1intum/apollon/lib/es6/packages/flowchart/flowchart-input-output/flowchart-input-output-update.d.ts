import React, { FunctionComponent } from 'react';
import { GeneralProps } from '../flowchart-element/flowchart-update';
import { FlowchartInputOutput } from './flowchart-input-output';
export declare const FlowchartInputOutputUpdateComponent: FunctionComponent<Props>;
type OwnProps = {
    element: FlowchartInputOutput;
};
export type Props = OwnProps & GeneralProps;
export declare const FlowchartInputOutputUpdate: React.ComponentClass<{
    element: import("..").FlowchartElement;
}, any>;
export {};
