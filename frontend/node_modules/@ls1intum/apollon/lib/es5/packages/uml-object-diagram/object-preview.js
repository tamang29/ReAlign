"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeObjectPreview = void 0;
var tslib_1 = require("tslib");
var boundary_1 = require("../../utils/geometry/boundary");
var uml_object_attribute_1 = require("./uml-object-attribute/uml-object-attribute");
var uml_object_name_1 = require("./uml-object-name/uml-object-name");
var composeObjectPreview = function (layer, translate) {
    var elements = [];
    // Object
    var umlObject = new uml_object_name_1.UMLObjectName({ name: translate('packages.ObjectDiagram.ObjectName') });
    umlObject.bounds = tslib_1.__assign(tslib_1.__assign({}, umlObject.bounds), { width: umlObject.bounds.width, height: umlObject.bounds.height });
    var umlObjectMember = new uml_object_attribute_1.UMLObjectAttribute({
        name: translate('sidebar.objectAttribute'),
        owner: umlObject.id,
        bounds: {
            x: 0,
            y: 0,
            width: (0, boundary_1.computeDimension)(1.0, 200),
            height: (0, boundary_1.computeDimension)(1.0, 25),
        },
    });
    umlObject.ownedElements = [umlObjectMember.id];
    elements.push.apply(elements, tslib_1.__spreadArray([], tslib_1.__read(umlObject.render(layer, [umlObjectMember])), false));
    return elements;
};
exports.composeObjectPreview = composeObjectPreview;
//# sourceMappingURL=object-preview.js.map