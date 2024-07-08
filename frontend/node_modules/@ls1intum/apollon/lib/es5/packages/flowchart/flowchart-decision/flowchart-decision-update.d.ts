import React, { FunctionComponent } from 'react';
import { GeneralProps } from '../flowchart-element/flowchart-update';
import { FlowchartDecision } from './flowchart-decision';
export declare const FlowchartDecisionUpdateComponent: FunctionComponent<Props>;
type OwnProps = {
    element: FlowchartDecision;
};
export type Props = OwnProps & GeneralProps;
export declare const FlowchartDecisionUpdate: React.ComponentClass<{
    element: import("..").FlowchartElement;
}, any>;
export {};
