import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElementType } from '../../uml-element-type';
import { UMLContainer } from '../../../services/uml-container/uml-container';
import { DeepPartial } from 'redux';
import * as Apollon from '../../../typings';
import { BPMNMarkerType } from '../common/types';
export type BPMNTaskType = 'default' | 'user' | 'send' | 'receive' | 'manual' | 'business-rule' | 'script';
export declare class BPMNTask extends UMLContainer {
    static defaultTaskType: BPMNTaskType;
    static defaultMarker: BPMNMarkerType;
    type: UMLElementType;
    taskType: BPMNTaskType;
    marker: BPMNMarkerType;
    constructor(values?: DeepPartial<BPMNTask>);
    serialize(children?: UMLContainer[]): Apollon.BPMNTask;
    deserialize<T extends Apollon.UMLModelElement>(values: T & {
        taskType?: BPMNTaskType;
        marker?: BPMNMarkerType;
    }, children?: Apollon.UMLModelElement[]): void;
    render(canvas: ILayer): ILayoutable[];
}
