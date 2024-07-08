import { IUMLRelationship, UMLRelationship } from '../../../services/uml-relationship/uml-relationship';
import { IUMLElement, UMLElement } from '../../../services/uml-element/uml-element';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
export declare abstract class UMLInterfaceRequired extends UMLRelationship {
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
    static isUMLInterfaceRequired: (element: IUMLElement) => element is IUMLRelationship;
    render(canvas: ILayer, source?: UMLElement, target?: UMLElement): ILayoutable[];
}
