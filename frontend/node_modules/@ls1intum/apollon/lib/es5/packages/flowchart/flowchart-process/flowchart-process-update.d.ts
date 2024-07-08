import React, { FunctionComponent } from 'react';
import { GeneralProps } from '../flowchart-element/flowchart-update';
import { FlowchartProcess } from './flowchart-process';
export declare const FlowchartProcessUpdateComponent: FunctionComponent<Props>;
type OwnProps = {
    element: FlowchartProcess;
};
export type Props = OwnProps & GeneralProps;
export declare const FlowchartProcessUpdate: React.ComponentClass<{
    element: import("..").FlowchartElement;
}, any>;
export {};
