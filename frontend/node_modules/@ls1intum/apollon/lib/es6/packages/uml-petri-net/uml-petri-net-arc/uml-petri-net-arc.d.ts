import { IUMLRelationship, UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
import { DeepPartial } from 'redux';
export declare class UMLPetriNetArc extends UMLRelationship {
    static features: {
        straight: boolean;
        reconnectable: boolean;
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
    static defaultMultiplicity: string;
    type: "PetriNetArc";
    name: string;
    constructor(values?: DeepPartial<IUMLRelationship>);
}
