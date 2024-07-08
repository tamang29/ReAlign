import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
export declare abstract class UMLInterfaceProvided extends UMLRelationship {
    static features: {
        variable: boolean;
        reconnectable: boolean;
        straight: boolean;
        hoverable: boolean;
        selectable: boolean;
        movable: boolean;
        resizable: boolean | "WIDTH" | "HEIGHT";
        connectable: boolean;
        updatable: boolean;
        droppable: boolean;
        alternativePortVisualization: boolean;
    };
}
