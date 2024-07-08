"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLPetriNetTransitionComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var text_1 = require("../../../components/controls/text/text");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var UMLPetriNetTransitionComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(text_1.Text, { y: -15, fill: element.textColor }, element.name),
        react_1.default.createElement(themedComponents_1.ThemedRect, { width: element.bounds.width, height: element.bounds.height, strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor, strokeWidth: 1, fillOpacity: 1 })));
};
exports.UMLPetriNetTransitionComponent = UMLPetriNetTransitionComponent;
//# sourceMappingURL=uml-petri-net-transition-component.js.map