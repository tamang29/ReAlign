import { UMLPetriNetPlace } from './uml-petri-net-place/uml-petri-net-place';
import { UMLPetriNetTransition } from './uml-petri-net-transition/uml-petri-net-transition';
import { computeDimension } from '../../utils/geometry/boundary';
export const composePetriNetPreview = (layer, translate) => {
    const elements = [];
    UMLPetriNetTransition.defaultHeight = computeDimension(1.0, 60);
    UMLPetriNetTransition.defaultWidth = computeDimension(1.0, 25);
    const petriNetTransition = new UMLPetriNetTransition({ name: translate('packages.PetriNet.PetriNetTransition') });
    // Petri Net Transition
    elements.push(Object.assign(petriNetTransition, {
        styles: {
            marginTop: '25px',
        },
    }));
    // Petri Net Place
    const petriNetPlace = new UMLPetriNetPlace({
        name: translate('packages.PetriNet.PetriNetPlace'),
        bounds: {
            x: 0,
            y: 0,
            width: computeDimension(1.0, 60),
            height: computeDimension(1.0, 60),
        },
    });
    elements.push(petriNetPlace);
    return elements;
};
//# sourceMappingURL=petri-net-preview.js.map