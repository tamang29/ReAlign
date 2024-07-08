"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLCommunicationLinkComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var uml_element_port_1 = require("../../../services/uml-element/uml-element-port");
var point_1 = require("../../../utils/geometry/point");
var uml_communication_link_text_component_1 = require("./uml-communication-link-text-component");
var themedComponents_1 = require("../../../components/theme/themedComponents");
var UMLCommunicationLinkComponent = function (_a) {
    var _b;
    var element = _a.element;
    var sources = element.messages.filter(function (message) { return message.direction === 'source'; });
    var targets = element.messages.filter(function (message) { return message.direction === 'target'; });
    var position = { x: 0, y: 0 };
    var direction = uml_element_port_1.Direction.Left;
    // maps element.path to Point to get methods
    // element.path contains start and end point + direction change points
    var path = element.path.map(function (point) { return new point_1.Point(point.x, point.y); });
    // half distance of total connection
    var distance = path.reduce(function (length, point, i, points) { return (i + 1 < points.length ? length + points[i + 1].subtract(point).length : length); }, 0) / 2;
    // finds the connection between two points of path where half distance of total connection is reached
    // and determines the direction of the path there
    for (var index = 0; index < path.length - 1; index++) {
        // distance between two path points
        var vector = path[index + 1].subtract(path[index]);
        if (vector.length > distance) {
            var norm = vector.normalize();
            direction =
                Math.abs(norm.x) > Math.abs(norm.y)
                    ? norm.x > 0
                        ? uml_element_port_1.Direction.Left
                        : uml_element_port_1.Direction.Right
                    : norm.y > 0
                        ? uml_element_port_1.Direction.Up
                        : uml_element_port_1.Direction.Down;
            position = path[index].add(norm.scale(distance));
            break;
        }
        distance -= vector.length;
    }
    return (react_1.default.createElement("g", null,
        (_b = {},
            _b[uml_element_port_1.Direction.Up] = (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(uml_communication_link_text_component_1.UmlCommunicationLinkTextComponent, { x: position.x + 8, y: position.y, fill: element.textColor, directionIcon: "\u2193", messages: sources }),
                react_1.default.createElement(uml_communication_link_text_component_1.UmlCommunicationLinkTextComponent, { x: position.x - 16, y: position.y, fill: element.textColor, directionIcon: "\u2191", messages: targets }))),
            _b[uml_element_port_1.Direction.Right] = (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(uml_communication_link_text_component_1.UmlCommunicationLinkTextComponent, { x: position.x, y: position.y, fill: element.textColor, directionIcon: "\u27F6", messages: targets, textCentered: true }),
                react_1.default.createElement(uml_communication_link_text_component_1.UmlCommunicationLinkTextComponent, { x: position.x, y: position.y + 16, fill: element.textColor, directionIcon: "\u27F5", messages: sources, textCentered: true }))),
            _b[uml_element_port_1.Direction.Down] = (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(uml_communication_link_text_component_1.UmlCommunicationLinkTextComponent, { x: position.x + 8, y: position.y, fill: element.textColor, directionIcon: "\u2193", messages: targets }),
                react_1.default.createElement(uml_communication_link_text_component_1.UmlCommunicationLinkTextComponent, { x: position.x - 16, y: position.y, fill: element.textColor, directionIcon: "\u2191", messages: sources }))),
            _b[uml_element_port_1.Direction.Left] = (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(uml_communication_link_text_component_1.UmlCommunicationLinkTextComponent, { x: position.x, y: position.y, fill: element.textColor, directionIcon: "\u27F6", messages: sources, textCentered: true }),
                react_1.default.createElement(uml_communication_link_text_component_1.UmlCommunicationLinkTextComponent, { x: position.x, y: position.y + 16, fill: element.textColor, directionIcon: "\u27F5", messages: targets, textCentered: true }))),
            _b)[direction],
        react_1.default.createElement(themedComponents_1.ThemedPolyline, { points: element.path.map(function (point) { return "".concat(point.x, " ").concat(point.y); }).join(','), strokeColor: element.strokeColor, fillColor: "none", strokeWidth: 1 })));
};
exports.UMLCommunicationLinkComponent = UMLCommunicationLinkComponent;
//# sourceMappingURL=uml-communication-link-component.js.map