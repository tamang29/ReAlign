import React, { FunctionComponent } from 'react';
import { GeneralProps } from '../flowchart-element/flowchart-update';
import { FlowchartTerminal } from './flowchart-terminal';
export declare const FlowchartTerminalUpdateComponent: FunctionComponent<Props>;
type OwnProps = {
    element: FlowchartTerminal;
};
export type Props = OwnProps & GeneralProps;
export declare const FlowchartTerminalUpdate: React.ComponentClass<{
    element: import("..").FlowchartElement;
}, any>;
export {};
