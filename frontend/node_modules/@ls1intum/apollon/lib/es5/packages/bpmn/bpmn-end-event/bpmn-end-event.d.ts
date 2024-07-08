import { DeepPartial } from 'redux';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { IBoundary } from '../../../utils/geometry/boundary';
import { UMLElementType } from '../../uml-element-type';
import { UMLContainer } from '../../../services/uml-container/uml-container';
import * as Apollon from '../../../typings';
export type BPMNEndEventType = 'default' | 'message' | 'escalation' | 'error' | 'compensation' | 'signal' | 'terminate';
export declare class BPMNEndEvent extends UMLContainer {
    static supportedRelationships: "BPMNFlow"[];
    static features: UMLElementFeatures;
    static defaultEventType: BPMNEndEventType;
    type: UMLElementType;
    bounds: IBoundary;
    eventType: BPMNEndEventType;
    constructor(values?: DeepPartial<BPMNEndEvent>);
    serialize(children?: UMLContainer[]): Apollon.BPMNEndEvent;
    deserialize<T extends Apollon.UMLModelElement>(values: T & {
        eventType?: BPMNEndEventType;
    }, children?: Apollon.UMLModelElement[]): void;
    render(canvas: ILayer): ILayoutable[];
}
