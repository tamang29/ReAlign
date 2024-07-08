import React, { FunctionComponent } from 'react';
import { GeneralProps } from '../flowchart-element/flowchart-update';
import { FlowchartFunctionCall } from './flowchart-function-call';
export declare const FlowchartFunctionCallUpdateComponent: FunctionComponent<Props>;
type OwnProps = {
    element: FlowchartFunctionCall;
};
export type Props = OwnProps & GeneralProps;
export declare const FlowchartFunctionCallUpdate: React.ComponentClass<{
    element: import("..").FlowchartElement;
}, any>;
export {};
