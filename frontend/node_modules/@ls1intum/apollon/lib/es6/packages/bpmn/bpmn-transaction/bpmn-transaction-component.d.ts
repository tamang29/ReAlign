import { FunctionComponent } from 'react';
import { BPMNTransaction } from './bpmn-transaction';
export declare const BPMNTransactionComponent: FunctionComponent<Props>;
interface Props {
    element: BPMNTransaction;
    fillColor?: string;
    strokeColor?: string;
    textColor?: string;
}
export {};
