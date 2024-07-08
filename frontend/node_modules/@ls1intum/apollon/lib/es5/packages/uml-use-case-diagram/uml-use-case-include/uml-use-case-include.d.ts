import { UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
export declare class UMLUseCaseInclude extends UMLRelationship {
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
    type: "UseCaseInclude";
}
