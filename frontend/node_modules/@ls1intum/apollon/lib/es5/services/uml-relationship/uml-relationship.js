"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLRelationship = void 0;
var tslib_1 = require("tslib");
var uml_relationship_type_1 = require("../../packages/uml-relationship-type");
var assign_1 = require("../../utils/fx/assign");
var uml_element_1 = require("../uml-element/uml-element");
var uml_element_port_1 = require("../uml-element/uml-element-port");
var connection_1 = require("./connection");
var uuid_1 = require("../../utils/uuid");
var UMLRelationship = /** @class */ (function (_super) {
    tslib_1.__extends(UMLRelationship, _super);
    function UMLRelationship(values) {
        var _this = _super.call(this) || this;
        _this.path = [
            { x: 0, y: 0 },
            { x: 200, y: 100 },
        ];
        _this.source = {
            direction: uml_element_port_1.Direction.Up,
            element: '',
        };
        _this.target = {
            direction: uml_element_port_1.Direction.Up,
            element: '',
        };
        (0, assign_1.assign)(_this, values);
        return _this;
    }
    UMLRelationship.prototype.serialize = function () {
        return tslib_1.__assign(tslib_1.__assign({}, _super.prototype.serialize.call(this)), { type: this.type, path: this.path, source: this.source, target: this.target, isManuallyLayouted: this.isManuallyLayouted });
    };
    UMLRelationship.prototype.deserialize = function (values, children) {
        var assert = function (v) { return v.type in uml_relationship_type_1.UMLRelationshipType; };
        if (!assert(values)) {
            return;
        }
        _super.prototype.deserialize.call(this, values);
        this.type = values.type;
        this.path = values.path;
        this.source = values.source;
        this.target = values.target;
        this.isManuallyLayouted = values.isManuallyLayouted;
    };
    UMLRelationship.prototype.render = function (canvas, source, target) {
        if (!source || !target) {
            return [this];
        }
        var _a = this.constructor.features, straight = _a.straight, variable = _a.variable;
        var path = connection_1.Connection.computePath({ element: source, direction: this.source.direction }, { element: target, direction: this.target.direction }, { isStraight: straight, isVariable: variable });
        var x = Math.min.apply(Math, tslib_1.__spreadArray([], tslib_1.__read(path.map(function (point) { return point.x; })), false));
        var y = Math.min.apply(Math, tslib_1.__spreadArray([], tslib_1.__read(path.map(function (point) { return point.y; })), false));
        var width = Math.max(Math.max.apply(Math, tslib_1.__spreadArray([], tslib_1.__read(path.map(function (point) { return point.x; })), false)) - x, 1);
        var height = Math.max(Math.max.apply(Math, tslib_1.__spreadArray([], tslib_1.__read(path.map(function (point) { return point.y; })), false)) - y, 1);
        this.bounds = { x: x, y: y, width: width, height: height };
        this.path = path.map(function (point) { return ({ x: point.x - x, y: point.y - y }); });
        return [this];
    };
    /**
     * Clones an instance of `UMLRelationship`
     *
     * @param override - Override existing properties.
     */
    UMLRelationship.prototype.cloneRelationship = function (override) {
        var Constructor = this.constructor;
        var values = tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, this), override), { id: (0, uuid_1.uuid)() });
        return new Constructor(values);
    };
    UMLRelationship.features = {
        connectable: false,
        droppable: false,
        hoverable: true,
        movable: false,
        reconnectable: true,
        resizable: false,
        selectable: true,
        updatable: true,
        straight: false,
        variable: true,
        alternativePortVisualization: false,
    };
    UMLRelationship.isUMLRelationship = function (element) {
        return element.type in uml_relationship_type_1.UMLRelationshipType;
    };
    return UMLRelationship;
}(uml_element_1.UMLElement));
exports.UMLRelationship = UMLRelationship;
//# sourceMappingURL=uml-relationship.js.map