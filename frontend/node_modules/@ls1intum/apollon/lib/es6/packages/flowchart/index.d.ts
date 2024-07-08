import { FlowchartDecision } from './flowchart-decision/flowchart-decision';
import { FlowchartProcess } from './flowchart-process/flowchart-process';
import { FlowchartTerminal } from './flowchart-terminal/flowchart-terminal';
import { FlowchartInputOutput } from './flowchart-input-output/flowchart-input-output';
import { FlowchartFunctionCall } from './flowchart-function-call/flowchart-function-call';
export declare const FlowchartElementType: {
    readonly FlowchartTerminal: "FlowchartTerminal";
    readonly FlowchartProcess: "FlowchartProcess";
    readonly FlowchartDecision: "FlowchartDecision";
    readonly FlowchartInputOutput: "FlowchartInputOutput";
    readonly FlowchartFunctionCall: "FlowchartFunctionCall";
};
export declare const FlowchartRelationshipType: {
    readonly FlowchartFlowline: "FlowchartFlowline";
};
export type FlowchartElement = FlowchartDecision | FlowchartProcess | FlowchartTerminal | FlowchartInputOutput | FlowchartFunctionCall;
