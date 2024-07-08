import { IUMLRelationship } from '../../../services/uml-relationship/uml-relationship';
import { DeepPartial } from 'redux';
import { UMLRelationshipCenteredDescription } from '../../../services/uml-relationship/uml-relationship-centered-description';
export declare class UMLReachabilityGraphArc extends UMLRelationshipCenteredDescription {
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
    static transition: string;
    type: "ReachabilityGraphArc";
    name: string;
    constructor(values?: DeepPartial<IUMLRelationship>);
}
