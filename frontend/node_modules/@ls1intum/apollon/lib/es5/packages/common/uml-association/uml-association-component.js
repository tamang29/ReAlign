"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLAssociationComponent = exports.getMarkerForTypeForUMLAssociation = exports.computeTextPositionForUMLAssociation = exports.layoutTextForUMLAssociation = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var uml_element_port_1 = require("../../../services/uml-element/uml-element-port");
var point_1 = require("../../../utils/geometry/point");
var uml_class_diagram_1 = require("../../uml-class-diagram");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var Marker = {
    Arrow: function (id, color) { return (react_1.default.createElement("marker", { id: id, viewBox: '0 0 30 30', markerWidth: 22, markerHeight: 30, refX: 30, refY: 15, orient: "auto", markerUnits: "strokeWidth" },
        react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M0,29 L30,15 L0,1", fillColor: "none", strokeColor: color }))); },
    Rhombus: function (id, color) { return (react_1.default.createElement("marker", { id: id, viewBox: "0 0 30 30", markerWidth: "30", markerHeight: "30", refX: "30", refY: "15", orient: "auto", markerUnits: "strokeWidth" },
        react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M0,15 L15,22 L30,15 L15,8 z", fillColor: color, strokeColor: color }))); },
    RhombusFilled: function (id, color) { return (react_1.default.createElement("marker", { id: id, viewBox: "0 0 30 30", markerWidth: "30", markerHeight: "30", refX: "30", refY: "15", orient: "auto", markerUnits: "strokeWidth" },
        react_1.default.createElement(themedComponents_1.ThemedPathContrast, { d: "M0,15 L15,22 L30,15 L15,8 z", fillColor: color }))); },
    Triangle: function (id, color) { return (react_1.default.createElement("marker", { id: id, viewBox: "0 0 30 30", markerWidth: "22", markerHeight: "30", refX: "30", refY: "15", orient: "auto", markerUnits: "strokeWidth" },
        react_1.default.createElement(themedComponents_1.ThemedPath, { d: "M0,1 L0,29 L30,15 z", strokeColor: color }))); },
};
var layoutTextForUMLAssociation = function (location, position) {
    switch (location) {
        case uml_element_port_1.Direction.Up:
        case uml_element_port_1.Direction.Topright:
        case uml_element_port_1.Direction.Topleft:
            return {
                dx: position === 'TOP' ? -5 : 5,
                textAnchor: position === 'TOP' ? 'end' : 'start',
            };
        case uml_element_port_1.Direction.Right:
        case uml_element_port_1.Direction.Upright:
        case uml_element_port_1.Direction.Downright:
            return {
                dy: position === 'TOP' ? -10 : 21,
                textAnchor: 'start',
            };
        case uml_element_port_1.Direction.Down:
        case uml_element_port_1.Direction.Bottomright:
        case uml_element_port_1.Direction.Bottomleft:
            return {
                dx: position === 'TOP' ? -5 : 5,
                dy: 10,
                textAnchor: position === 'TOP' ? 'end' : 'start',
            };
        case uml_element_port_1.Direction.Left:
        case uml_element_port_1.Direction.Upleft:
        case uml_element_port_1.Direction.Downleft:
            return {
                dy: position === 'TOP' ? -10 : 21,
                textAnchor: 'end',
            };
    }
};
exports.layoutTextForUMLAssociation = layoutTextForUMLAssociation;
var computeTextPositionForUMLAssociation = function (alignmentPath, hasMarker) {
    if (hasMarker === void 0) { hasMarker = false; }
    var distance = hasMarker ? 31 : 8;
    if (alignmentPath.length < 2)
        return new point_1.Point();
    var vector = alignmentPath[1].subtract(alignmentPath[0]);
    return alignmentPath[0].add(vector.normalize().scale(distance));
};
exports.computeTextPositionForUMLAssociation = computeTextPositionForUMLAssociation;
var getMarkerForTypeForUMLAssociation = function (relationshipType) {
    return (function (type) {
        switch (type) {
            case uml_class_diagram_1.ClassRelationshipType.ClassDependency:
            case uml_class_diagram_1.ClassRelationshipType.ClassUnidirectional:
                return Marker.Arrow;
            case uml_class_diagram_1.ClassRelationshipType.ClassAggregation:
                return Marker.Rhombus;
            case uml_class_diagram_1.ClassRelationshipType.ClassComposition:
                return Marker.RhombusFilled;
            case uml_class_diagram_1.ClassRelationshipType.ClassInheritance:
            case uml_class_diagram_1.ClassRelationshipType.ClassRealization:
                return Marker.Triangle;
        }
    })(relationshipType);
};
exports.getMarkerForTypeForUMLAssociation = getMarkerForTypeForUMLAssociation;
var UMLAssociationComponent = function (_a) {
    var element = _a.element;
    var marker = (0, exports.getMarkerForTypeForUMLAssociation)(element.type);
    var stroke = (function (type) {
        switch (type) {
            case uml_class_diagram_1.ClassRelationshipType.ClassDependency:
            case uml_class_diagram_1.ClassRelationshipType.ClassRealization:
                return 7;
        }
    })(element.type);
    var path = element.path.map(function (point) { return new point_1.Point(point.x, point.y); });
    var source = (0, exports.computeTextPositionForUMLAssociation)(path);
    var target = (0, exports.computeTextPositionForUMLAssociation)(path.reverse(), !!marker);
    var id = "marker-".concat(element.id);
    var textFill = element.textColor ? { fill: element.textColor } : {};
    return (react_1.default.createElement("g", null,
        marker && marker(id, element.strokeColor),
        react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: element.path.map(function (point) { return "".concat(point.x, " ").concat(point.y); }).join(','), strokeColor: element.strokeColor, fillColor: "none", strokeWidth: 1, markerEnd: "url(#".concat(id, ")"), strokeDasharray: stroke }),
        react_1.default.createElement("text", tslib_1.__assign({ x: source.x || 0, y: source.y || 0 }, (0, exports.layoutTextForUMLAssociation)(element.source.direction, 'BOTTOM'), { pointerEvents: "none", style: tslib_1.__assign({}, textFill) }), element.source.multiplicity),
        react_1.default.createElement("text", tslib_1.__assign({ x: target.x || 0, y: target.y || 0 }, (0, exports.layoutTextForUMLAssociation)(element.target.direction, 'BOTTOM'), { pointerEvents: "none", style: tslib_1.__assign({}, textFill) }), element.target.multiplicity),
        react_1.default.createElement("text", tslib_1.__assign({ x: source.x || 0, y: source.y || 0 }, (0, exports.layoutTextForUMLAssociation)(element.source.direction, 'TOP'), { pointerEvents: "none", style: tslib_1.__assign({}, textFill) }), element.source.role),
        react_1.default.createElement("text", tslib_1.__assign({ x: target.x || 0, y: target.y || 0 }, (0, exports.layoutTextForUMLAssociation)(element.target.direction, 'TOP'), { pointerEvents: "none", style: tslib_1.__assign({}, textFill) }), element.target.role)));
};
exports.UMLAssociationComponent = UMLAssociationComponent;
//# sourceMappingURL=uml-association-component.js.map