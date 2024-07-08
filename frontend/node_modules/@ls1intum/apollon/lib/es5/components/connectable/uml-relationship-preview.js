"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLRelationshipPreview = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var uml_element_repository_1 = require("../../services/uml-element/uml-element-repository");
var point_1 = require("../../utils/geometry/point");
var uml_element_1 = require("../../services/uml-element/uml-element");
var styles_1 = require("../theme/styles");
var enhance = (0, react_redux_1.connect)(function (state, props) { return ({
    ports: (0, uml_element_1.getPortsForElement)(uml_element_repository_1.UMLElementRepository.get(state.elements[props.port.element])),
}); }, {
    end: uml_element_repository_1.UMLElementRepository.endConnecting,
    getAbsolutePosition: uml_element_repository_1.UMLElementRepository.getAbsolutePosition,
});
var Polyline = styles_1.styled.polyline(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  stroke: ", ";\n  fill: 'none';\n  pointer-events: 'none';\n"], ["\n  stroke: ", ";\n  fill: 'none';\n  pointer-events: 'none';\n"])), function (props) { return props.theme.color.primaryContrast; });
var RelationshipPreview = /** @class */ (function (_super) {
    tslib_1.__extends(RelationshipPreview, _super);
    function RelationshipPreview() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RelationshipPreview.prototype.render = function () {
        var _a = this.props, port = _a.port, ports = _a.ports;
        var _b = this.props.getAbsolutePosition(port.element), x = _b.x, y = _b.y;
        var position = tslib_1.__assign({}, ports[port.direction]);
        var source = new point_1.Point(x + position.x, y + position.y);
        var path = [source, this.props.target];
        var points = path.map(function (p) { return "".concat(p.x, " ").concat(p.y); }).join(', ');
        return react_1.default.createElement(Polyline, { points: points, "pointer-events": "none", stroke: "black", fill: "none", strokeDasharray: "5,5" });
    };
    return RelationshipPreview;
}(react_1.Component));
exports.UMLRelationshipPreview = enhance(RelationshipPreview);
var templateObject_1;
//# sourceMappingURL=uml-relationship-preview.js.map