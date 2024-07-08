"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = exports.CanvasComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var point_1 = require("../../utils/geometry/point");
var droppable_1 = require("../draggable/droppable");
var connection_preview_1 = require("../connectable/connection-preview");
var uml_element_component_1 = require("../uml-element/uml-element-component");
var canvas_styles_1 = require("./canvas-styles");
var uml_relationship_1 = require("../../services/uml-relationship/uml-relationship");
var enhance = (0, react_redux_1.connect)(function (state) { return ({
    diagram: state.diagram,
    isStatic: state.editor.readonly,
    elements: state.elements,
}); }, null, null, { forwardRef: true });
var CanvasComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CanvasComponent, _super);
    function CanvasComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.layer = (0, react_1.createRef)();
        _this.origin = function () {
            if (!_this.layer.current) {
                return new point_1.Point();
            }
            var canvasBounds = _this.layer.current.getBoundingClientRect();
            return new point_1.Point(canvasBounds.left + canvasBounds.width / 2, canvasBounds.top + canvasBounds.height / 2);
        };
        _this.snap = function (point) {
            var origin = _this.origin();
            return point.subtract(origin).round().add(origin);
        };
        return _this;
    }
    CanvasComponent.prototype.render = function () {
        var e_1, _a, e_2, _b;
        var _c = this.props, elements = _c.elements, diagram = _c.diagram, isStatic = _c.isStatic;
        var minX = 0;
        var minY = 0;
        if (isStatic) {
            try {
                for (var _d = tslib_1.__values(Object.values(elements)), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var element = _e.value;
                    if (uml_relationship_1.UMLRelationship.isUMLRelationship(element)) {
                        try {
                            for (var _f = (e_2 = void 0, tslib_1.__values(element.path)), _g = _f.next(); !_g.done; _g = _f.next()) {
                                var p = _g.value;
                                if (p.x < minX)
                                    minX = p.x;
                                if (p.y < minY)
                                    minY = p.y;
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
            minX = Math.abs(Math.round(minX));
            minY = Math.abs(Math.round(minY));
        }
        var translateCoordinate = function () {
            return 'translate(' + minX / 2 + 'px,' + minY / 2 + 'px)';
        };
        return (react_1.default.createElement(droppable_1.Droppable, null,
            react_1.default.createElement(canvas_styles_1.CanvasContainer, { id: "modeling-editor-canvas", width: diagram.bounds.width + minX, height: diagram.bounds.height + minY, isStatic: isStatic, ref: this.layer, "data-cy": "modeling-editor-canvas" },
                react_1.default.createElement("g", { style: { transformOrigin: 'top left', transform: "".concat(translateCoordinate()) } }, this.layer.current && (react_1.default.createElement("svg", { x: "50%", y: "50%" },
                    diagram.ownedElements.map(function (element) { return (react_1.default.createElement(uml_element_component_1.UMLElementComponent, { key: element, id: element })); }),
                    diagram.ownedRelationships.map(function (relationship) { return (react_1.default.createElement(uml_element_component_1.UMLElementComponent, { key: relationship, id: relationship })); }),
                    react_1.default.createElement(connection_preview_1.ConnectionPreview, null)))))));
    };
    return CanvasComponent;
}(react_1.Component));
exports.CanvasComponent = CanvasComponent;
exports.Canvas = enhance(CanvasComponent);
//# sourceMappingURL=canvas.js.map