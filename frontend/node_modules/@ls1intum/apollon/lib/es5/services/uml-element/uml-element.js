"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLElement = exports.getPortsForElement = void 0;
var tslib_1 = require("tslib");
var uml_element_type_1 = require("../../packages/uml-element-type");
var assign_1 = require("../../utils/fx/assign");
var point_1 = require("../../utils/geometry/point");
var uuid_1 = require("../../utils/uuid");
var uml_element_port_1 = require("./uml-element-port");
var getPortsForElement = function (element) {
    var _a;
    return _a = {},
        _a[uml_element_port_1.Direction.Up] = new point_1.Point(element.bounds.width / 2, 0),
        _a[uml_element_port_1.Direction.Right] = new point_1.Point(element.bounds.width, element.bounds.height / 2),
        _a[uml_element_port_1.Direction.Down] = new point_1.Point(element.bounds.width / 2, element.bounds.height),
        _a[uml_element_port_1.Direction.Left] = new point_1.Point(0, element.bounds.height / 2),
        _a[uml_element_port_1.Direction.Upright] = new point_1.Point(element.bounds.width, element.bounds.height / 4),
        _a[uml_element_port_1.Direction.Downright] = new point_1.Point(element.bounds.width, (3 * element.bounds.height) / 4),
        _a[uml_element_port_1.Direction.Upleft] = new point_1.Point(0, element.bounds.height / 4),
        _a[uml_element_port_1.Direction.Downleft] = new point_1.Point(0, (3 * element.bounds.height) / 4),
        _a[uml_element_port_1.Direction.Topright] = new point_1.Point((3 * element.bounds.width) / 4, 0),
        _a[uml_element_port_1.Direction.Bottomright] = new point_1.Point((3 * element.bounds.width) / 4, element.bounds.height),
        _a[uml_element_port_1.Direction.Topleft] = new point_1.Point(element.bounds.width / 4, 0),
        _a[uml_element_port_1.Direction.Bottomleft] = new point_1.Point(element.bounds.width / 4, element.bounds.height),
        _a;
};
exports.getPortsForElement = getPortsForElement;
/** Class implementation of `IUMLElement` to use inheritance at runtime */
var UMLElement = /** @class */ (function () {
    function UMLElement(values) {
        this.id = (0, uuid_1.uuid)();
        this.name = '';
        this.bounds = { x: 0, y: 0, width: 160, height: 100 };
        this.owner = null;
        this.resizeFrom = "bottomRight" /* ResizeFrom.BOTTOMRIGHT */;
        (0, assign_1.assign)(this, values);
    }
    /**
     * Clones an instance of `UMLElement`
     *
     * @param override - Override existing properties.
     */
    UMLElement.prototype.clone = function (override) {
        var Constructor = this.constructor;
        var values = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, this), override), { id: (0, uuid_1.uuid)() });
        return new Constructor(values);
    };
    /** Serializes an `UMLElement` to an `Apollon.UMLElement` */
    UMLElement.prototype.serialize = function (children) {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            owner: this.owner,
            bounds: this.bounds,
            highlight: this.highlight,
            fillColor: this.fillColor,
            strokeColor: this.strokeColor,
            textColor: this.textColor,
            assessmentNote: this.assessmentNote,
        };
    };
    /** Deserializes an `Apollon.UMLElement` to an `UMLElement` */
    UMLElement.prototype.deserialize = function (values, children) {
        this.id = values.id;
        this.name = values.name;
        this.type = values.type;
        this.owner = values.owner || null;
        this.bounds = tslib_1.__assign({}, values.bounds);
        this.highlight = values.highlight;
        this.fillColor = values.fillColor;
        this.strokeColor = values.strokeColor;
        this.textColor = values.textColor;
        this.assessmentNote = values.assessmentNote;
    };
    /** `UMLElement` type specific feature flags */
    UMLElement.features = {
        connectable: true,
        droppable: false,
        hoverable: true,
        movable: true,
        resizable: true,
        selectable: true,
        updatable: true,
        alternativePortVisualization: false,
    };
    UMLElement.supportedRelationships = [];
    /** Checks whether an `IUMLElement` is of type `UMLElementType` */
    UMLElement.isUMLElement = function (element) {
        return element.type in uml_element_type_1.UMLElementType;
    };
    return UMLElement;
}());
exports.UMLElement = UMLElement;
//# sourceMappingURL=uml-element.js.map