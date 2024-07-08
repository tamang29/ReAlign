import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElementType } from '../../uml-element-type';
import { UMLElementFeatures } from '../../../services/uml-element/uml-element-features';
import { IBoundary } from '../../../utils/geometry/boundary';
import { DeepPartial } from 'redux';
import * as Apollon from '../../../typings';
import { UMLContainer } from '../../../services/uml-container/uml-container';
export type BPMNGatewayType = 'complex' | 'event-based' | 'exclusive' | 'inclusive' | 'parallel';
export declare class BPMNGateway extends UMLContainer {
    static features: UMLElementFeatures;
    static defaultGatewayType: BPMNGatewayType;
    type: UMLElementType;
    bounds: IBoundary;
    gatewayType: BPMNGatewayType;
    constructor(values?: DeepPartial<BPMNGateway>);
    serialize(children?: UMLContainer[]): Apollon.BPMNGateway;
    deserialize<T extends Apollon.UMLModelElement>(values: T & {
        gatewayType?: BPMNGatewayType;
    }, children?: Apollon.UMLModelElement[]): void;
    render(canvas: ILayer): ILayoutable[];
}
