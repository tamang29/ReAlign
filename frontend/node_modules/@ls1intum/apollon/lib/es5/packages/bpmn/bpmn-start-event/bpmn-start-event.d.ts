import { DeepPartial } from 'redux';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { IBoundary } from '../../../utils/geometry/boundary';
import { UMLElementType } from '../../uml-element-type';
import { UMLContainer } from '../../../services/uml-container/uml-container';
import * as Apollon from '../../../typings';
export type BPMNStartEventType = 'default' | 'message' | 'timer' | 'conditional' | 'signal';
export declare class BPMNStartEvent extends UMLContainer {
    static supportedRelationships: "BPMNFlow"[];
    static features: UMLElementFeatures;
    static defaultEventType: BPMNStartEventType;
    type: UMLElementType;
    bounds: IBoundary;
    eventType: BPMNStartEventType;
    constructor(values?: DeepPartial<BPMNStartEvent>);
    serialize(children?: UMLContainer[]): Apollon.BPMNStartEvent;
    deserialize<T extends Apollon.UMLModelElement>(values: T & {
        eventType?: BPMNStartEventType;
    }, children?: Apollon.UMLModelElement[]): void;
    render(canvas: ILayer): ILayoutable[];
}
