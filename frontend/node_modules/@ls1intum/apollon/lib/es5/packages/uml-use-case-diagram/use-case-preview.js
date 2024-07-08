"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeUseCasePreview = void 0;
var tslib_1 = require("tslib");
var boundary_1 = require("../../utils/geometry/boundary");
var uml_use_case_actor_1 = require("./uml-use-case-actor/uml-use-case-actor");
var uml_use_case_system_1 = require("./uml-use-case-system/uml-use-case-system");
var uml_use_case_1 = require("./uml-use-case/uml-use-case");
var composeUseCasePreview = function (layer, translate) {
    var elements = [];
    // UML Use Case
    var umlUseCase = new uml_use_case_1.UMLUseCase({ name: translate('packages.UseCaseDiagram.UseCase') });
    umlUseCase.bounds = tslib_1.__assign(tslib_1.__assign({}, umlUseCase.bounds), { width: umlUseCase.bounds.width, height: umlUseCase.bounds.height });
    elements.push(umlUseCase);
    // UML Actor
    var umlActor = new uml_use_case_actor_1.UMLUseCaseActor({
        name: translate('packages.UseCaseDiagram.UseCaseActor'),
        bounds: {
            x: 0,
            y: 0,
            width: (0, boundary_1.computeDimension)(1.0, 80),
            height: (0, boundary_1.computeDimension)(1.0, 140),
        },
    });
    elements.push(umlActor);
    // UML System
    var umlSystem = new uml_use_case_system_1.UMLUseCaseSystem({ name: translate('packages.UseCaseDiagram.UseCaseSystem') });
    umlSystem.bounds = tslib_1.__assign(tslib_1.__assign({}, umlSystem.bounds), { width: umlSystem.bounds.width, height: umlSystem.bounds.height });
    elements.push(umlSystem);
    return elements;
};
exports.composeUseCasePreview = composeUseCasePreview;
//# sourceMappingURL=use-case-preview.js.map