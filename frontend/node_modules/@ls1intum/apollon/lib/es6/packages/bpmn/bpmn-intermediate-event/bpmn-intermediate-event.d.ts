import { DeepPartial } from 'redux';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { IBoundary } from '../../../utils/geometry/boundary';
import { UMLElementType } from '../../uml-element-type';
import { UMLContainer } from '../../../services/uml-container/uml-container';
import * as Apollon from '../../../typings';
export type BPMNIntermediateEventType = 'default' | 'message-catch' | 'message-throw' | 'timer-catch' | 'escalation-throw' | 'conditional-catch' | 'link-catch' | 'link-throw' | 'compensation-throw' | 'signal-catch' | 'signal-throw';
export declare class BPMNIntermediateEvent extends UMLContainer {
    static supportedRelationships: "BPMNFlow"[];
    static features: UMLElementFeatures;
    static defaultEventType: BPMNIntermediateEventType;
    type: UMLElementType;
    bounds: IBoundary;
    eventType: BPMNIntermediateEventType;
    constructor(values?: DeepPartial<BPMNIntermediateEvent>);
    serialize(children?: UMLContainer[]): Apollon.BPMNIntermediateEvent;
    deserialize<T extends Apollon.UMLModelElement>(values: T & {
        eventType?: BPMNIntermediateEventType;
    }, children?: Apollon.UMLModelElement[]): void;
    render(canvas: ILayer): ILayoutable[];
}
