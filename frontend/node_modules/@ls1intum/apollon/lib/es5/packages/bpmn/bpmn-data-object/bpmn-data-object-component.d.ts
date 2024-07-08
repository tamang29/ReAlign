import { FunctionComponent } from 'react';
import { BPMNDataObject } from './bpmn-data-object';
export declare const BPMNDataObjectComponent: FunctionComponent<Props>;
interface Props {
    element: BPMNDataObject;
    fillColor?: string;
    strokeColor?: string;
    textColor?: string;
}
export {};
