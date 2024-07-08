"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composePetriNetPreview = void 0;
var uml_petri_net_place_1 = require("./uml-petri-net-place/uml-petri-net-place");
var uml_petri_net_transition_1 = require("./uml-petri-net-transition/uml-petri-net-transition");
var boundary_1 = require("../../utils/geometry/boundary");
var composePetriNetPreview = function (layer, translate) {
    var elements = [];
    uml_petri_net_transition_1.UMLPetriNetTransition.defaultHeight = (0, boundary_1.computeDimension)(1.0, 60);
    uml_petri_net_transition_1.UMLPetriNetTransition.defaultWidth = (0, boundary_1.computeDimension)(1.0, 25);
    var petriNetTransition = new uml_petri_net_transition_1.UMLPetriNetTransition({ name: translate('packages.PetriNet.PetriNetTransition') });
    // Petri Net Transition
    elements.push(Object.assign(petriNetTransition, {
        styles: {
            marginTop: '25px',
        },
    }));
    // Petri Net Place
    var petriNetPlace = new uml_petri_net_place_1.UMLPetriNetPlace({
        name: translate('packages.PetriNet.PetriNetPlace'),
        bounds: {
            x: 0,
            y: 0,
            width: (0, boundary_1.computeDimension)(1.0, 60),
            height: (0, boundary_1.computeDimension)(1.0, 60),
        },
    });
    elements.push(petriNetPlace);
    return elements;
};
exports.composePetriNetPreview = composePetriNetPreview;
//# sourceMappingURL=petri-net-preview.js.map