import { DeepPartial } from 'redux';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { UMLElement } from '../../../services/uml-element/uml-element';
import { IBoundary } from '../../../utils/geometry/boundary';
export declare abstract class UMLInterface extends UMLElement {
    static features: {
        resizable: boolean;
        alternativePortVisualization: boolean;
        hoverable: boolean;
        selectable: boolean;
        movable: boolean;
        connectable: boolean;
        updatable: boolean;
        droppable: boolean;
    };
    bounds: IBoundary;
    constructor(values?: DeepPartial<UMLInterface>);
    render(layer: ILayer): ILayoutable[];
}
