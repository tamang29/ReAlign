import { FunctionComponent } from 'react';
import { BPMNTask } from './bpmn-task';
export declare const BPMNTaskComponent: FunctionComponent<Props>;
interface Props {
    element: BPMNTask;
    fillColor?: string;
    strokeColor?: string;
    textColor?: string;
}
export {};
