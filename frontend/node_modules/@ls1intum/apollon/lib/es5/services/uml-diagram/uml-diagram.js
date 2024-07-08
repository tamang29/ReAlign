"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLDiagram = exports.DIAGRAM_MARGIN = void 0;
var tslib_1 = require("tslib");
var diagram_type_1 = require("../../packages/diagram-type");
var assign_1 = require("../../utils/fx/assign");
var uml_container_1 = require("../uml-container/uml-container");
exports.DIAGRAM_MARGIN = 40;
var UMLDiagram = /** @class */ (function (_super) {
    tslib_1.__extends(UMLDiagram, _super);
    function UMLDiagram(values) {
        var _this = _super.call(this) || this;
        _this.type = diagram_type_1.UMLDiagramType.ClassDiagram;
        _this.ownedRelationships = [];
        _this.bounds = tslib_1.__assign(tslib_1.__assign({}, _this.bounds), { width: 0, height: 0 });
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    UMLDiagram.prototype.render = function (canvas, children) {
        if (children === void 0) { children = []; }
        // calculates the most distant svg point from diagram center
        var size = children.reduce(function (max, element) { return ({
            width: Math.max(Math.abs(element.bounds.x), Math.abs(element.bounds.x + element.bounds.width), max.width),
            height: Math.max(Math.abs(element.bounds.y), Math.abs(element.bounds.y + element.bounds.height), max.height),
        }); }, { width: 0, height: 0 });
        // updates diagram bound
        // sets origin to new location
        // make size at least 2 times most distant point -> all points are inside the diagram
        this.bounds = {
            x: -size.width - exports.DIAGRAM_MARGIN,
            y: -size.height - exports.DIAGRAM_MARGIN,
            width: size.width * 2 + exports.DIAGRAM_MARGIN,
            height: size.height * 2 + exports.DIAGRAM_MARGIN,
        };
        return [this];
    };
    return UMLDiagram;
}(uml_container_1.UMLContainer));
exports.UMLDiagram = UMLDiagram;
//# sourceMappingURL=uml-diagram.js.map