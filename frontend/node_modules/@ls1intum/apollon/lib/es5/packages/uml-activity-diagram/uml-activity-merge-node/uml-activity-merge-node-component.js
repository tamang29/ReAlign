"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLActivityMergeNodeComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var multiline_1 = require("../../../utils/svg/multiline");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var UMLActivityMergeNodeComponent = function (_a) {
    var element = _a.element, fillColor = _a.fillColor;
    return (react_1.default.createElement("g", null,
        react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: "".concat(element.bounds.width / 2, " 0, ").concat(element.bounds.width, " ").concat(element.bounds.height / 2, ", ").concat(element.bounds.width / 2, " ").concat(element.bounds.height, ", 0 ").concat(element.bounds.height / 2, ", ").concat(element.bounds.width / 2, " 0"), strokeColor: element.strokeColor, fillColor: fillColor || element.fillColor }),
        react_1.default.createElement(multiline_1.Multiline, { x: element.bounds.width / 2, y: element.bounds.height / 2, width: element.bounds.width, height: element.bounds.height, fontWeight: "bold", fill: element.textColor }, element.name)));
};
exports.UMLActivityMergeNodeComponent = UMLActivityMergeNodeComponent;
//# sourceMappingURL=uml-activity-merge-node-component.js.map