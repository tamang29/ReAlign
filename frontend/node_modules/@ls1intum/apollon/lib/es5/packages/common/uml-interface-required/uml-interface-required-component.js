"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLInterfaceRequiredComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var react_redux_1 = require("react-redux");
var uml_interface_required_1 = require("./uml-interface-required");
var uml_element_port_1 = require("../../../services/uml-element/uml-element-port");
var point_1 = require("../../../utils/geometry/point");
var uml_interface_requires_constants_1 = require("./uml-interface-requires-constants");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var enhance = (0, react_redux_1.connect)(function (state, props) {
    // filter all UMLInterfaceRequired
    var requiredInterfaces = state.diagram.ownedRelationships
        .map(function (relationshipId) { return state.elements[relationshipId]; })
        .filter(function (relationship) { return uml_interface_required_1.UMLInterfaceRequired.isUMLInterfaceRequired(relationship); })
        .map(function (relationship) { return relationship; });
    // check if any other UMLInterfaceRequired has the same target as this element and if the direction of the UMLInterfaceRequired is the opposite
    return {
        hasOppositeRequiredInterface: requiredInterfaces
            .filter(function (element) { return element.id !== props.element.id; })
            .some(function (otherRequiredInterface) {
            return otherRequiredInterface.target.element === props.element.target.element &&
                otherRequiredInterface.target.direction.valueOf() ===
                    (0, uml_element_port_1.getOppositeDirection)(props.element.target.direction).valueOf();
        }),
        currentRequiredInterfaces: requiredInterfaces.filter(function (element) { return element.target.element === props.element.target.element; }),
        currentAllInterfaces: state.diagram.ownedRelationships
            .map(function (relationshipId) { return state.elements[relationshipId]; })
            .filter(function (element) { return element.target.element === props.element.target.element; }),
    };
}, {});
var UMLInterfaceRequiredC = function (props) {
    var element = props.element, hasOppositeRequiredInterface = props.hasOppositeRequiredInterface, currentRequiredInterfaces = props.currentRequiredInterfaces, currentAllInterfaces = props.currentAllInterfaces;
    // offset for last point in paragraph, so that line ends at marker
    var offset;
    switch (element.target.direction) {
        case uml_element_port_1.Direction.Up:
            offset = new point_1.Point(0, -3);
            break;
        case uml_element_port_1.Direction.Down:
            offset = new point_1.Point(0, 3);
            break;
        case uml_element_port_1.Direction.Right:
            offset = new point_1.Point(3, 0);
            break;
        case uml_element_port_1.Direction.Left:
            offset = new point_1.Point(-3, 0);
            break;
    }
    var calculatePath = function () {
        var path = '';
        switch (currentRequiredInterfaces.length) {
            case 1:
                path =
                    currentAllInterfaces.length === currentRequiredInterfaces.length
                        ? "M 13 -13.5 a 1 1 0 0 0 0 27" /* REQUIRED_INTERFACE_MARKER_TYPE.Semicircle */
                        : "M 8 -12.5 C -3.5 -7.5 -3.3 7.9 8 12.5" /* REQUIRED_INTERFACE_MARKER_TYPE.Threequarterscircle */;
                break;
            case 2:
                path = hasOppositeRequiredInterface
                    ? "M 8 -12.5 C -3.5 -7.5 -3.3 7.9 8 12.5" /* REQUIRED_INTERFACE_MARKER_TYPE.Threequarterscircle */
                    : "M 2 -7.8 C -1.5 -3 -1.2 3.4 2 7.8" /* REQUIRED_INTERFACE_MARKER_TYPE.Quartercircle */;
                break;
            default:
                path = "M 2 -7.8 C -1.5 -3 -1.2 3.4 2 7.8" /* REQUIRED_INTERFACE_MARKER_TYPE.Quartercircle */;
                break;
        }
        return path;
    };
    return (react_1.default.createElement("g", null,
        react_1.default.createElement("marker", { id: "marker-".concat(element.id), viewBox: "0 0 ".concat(uml_interface_requires_constants_1.REQUIRED_INTERFACE_MARKER_SIZE, " ").concat(uml_interface_requires_constants_1.REQUIRED_INTERFACE_MARKER_SIZE), markerWidth: uml_interface_requires_constants_1.REQUIRED_INTERFACE_MARKER_SIZE, markerHeight: uml_interface_requires_constants_1.REQUIRED_INTERFACE_MARKER_SIZE, refX: "0", refY: "0", orient: "auto", markerUnits: "strokeWidth" },
            react_1.default.createElement(themedComponents_1.ThemedPath, { d: calculatePath(), fillColor: "none", strokeColor: element.strokeColor, strokeWidth: 2 })),
        react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: element.path
                .map(function (point, index) {
                if (index === element.path.length - 1) {
                    point = new point_1.Point(point.x, point.y).add(offset);
                }
                return "".concat(point.x, " ").concat(point.y);
            })
                .join(','), strokeColor: element.strokeColor, fillColor: "none", strokeWidth: 1.0, markerEnd: "url(#marker-".concat(element.id, ")") })));
};
exports.UMLInterfaceRequiredComponent = enhance(UMLInterfaceRequiredC);
//# sourceMappingURL=uml-interface-required-component.js.map