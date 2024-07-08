import { DeepPartial } from 'redux';
import { UMLRelationshipCenteredDescription } from '../../../services/uml-relationship/uml-relationship-centered-description';
import { UMLElement } from '../../../services/uml-element/uml-element';
import * as Apollon from '../../../typings';
export type BPMNFlowType = 'sequence' | 'message' | 'association' | 'data association';
export declare class BPMNFlow extends UMLRelationshipCenteredDescription {
    static features: {
        reconnectable: boolean;
        straight: boolean;
        variable: boolean;
        hoverable: boolean;
        selectable: boolean;
        movable: boolean;
        resizable: boolean | "WIDTH" | "HEIGHT";
        connectable: boolean;
        updatable: boolean;
        droppable: boolean;
        alternativePortVisualization: boolean;
    };
    static defaultFlowType: BPMNFlowType;
    type: "BPMNFlow";
    name: string;
    flowType: BPMNFlowType;
    constructor(values?: DeepPartial<Apollon.BPMNFlow>);
    serialize(children?: UMLElement[]): Apollon.BPMNFlow;
    deserialize<T extends Apollon.UMLModelElement>(values: T & {
        flowType?: BPMNFlowType;
    }, children?: Apollon.UMLModelElement[]): void;
}
