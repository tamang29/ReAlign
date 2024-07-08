import { computeDimension } from '../../utils/geometry/boundary';
import { UMLObjectAttribute } from './uml-object-attribute/uml-object-attribute';
import { UMLObjectName } from './uml-object-name/uml-object-name';
export const composeObjectPreview = (layer, translate) => {
    const elements = [];
    // Object
    const umlObject = new UMLObjectName({ name: translate('packages.ObjectDiagram.ObjectName') });
    umlObject.bounds = {
        ...umlObject.bounds,
        width: umlObject.bounds.width,
        height: umlObject.bounds.height,
    };
    const umlObjectMember = new UMLObjectAttribute({
        name: translate('sidebar.objectAttribute'),
        owner: umlObject.id,
        bounds: {
            x: 0,
            y: 0,
            width: computeDimension(1.0, 200),
            height: computeDimension(1.0, 25),
        },
    });
    umlObject.ownedElements = [umlObjectMember.id];
    elements.push(...umlObject.render(layer, [umlObjectMember]));
    return elements;
};
//# sourceMappingURL=object-preview.js.map