import { DeepPartial } from 'redux';
import { ILayer } from '../../../services/layouter/layer';
import { ILayoutable } from '../../../services/layouter/layoutable';
import { IUMLElement, UMLElement } from '../../../services/uml-element/uml-element';
import { IBoundary } from '../../../utils/geometry/boundary';
import { UMLElementType } from '../../uml-element-type';
export declare class UMLDeploymentArtifact extends UMLElement {
    static supportedRelationships: ("DeploymentAssociation" | "DeploymentInterfaceProvided" | "DeploymentInterfaceRequired" | "DeploymentDependency")[];
    type: UMLElementType;
    bounds: IBoundary;
    constructor(values?: DeepPartial<IUMLElement>);
    render(layer: ILayer): ILayoutable[];
}
