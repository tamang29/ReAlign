"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasElement = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var components_1 = require("../../packages/components");
var uml_container_1 = require("../../services/uml-container/uml-container");
var uml_element_repository_1 = require("../../services/uml-element/uml-element-repository");
var styles_1 = require("../theme/styles");
var STROKE = 5;
var enhance = (0, redux_1.compose)(styles_1.withTheme, (0, react_redux_1.connect)(function (state, props) { return ({
    hovered: state.hovered[0] === props.id,
    selected: state.selected.includes(props.id),
    remoteSelectors: state.remoteSelection[props.id] || [],
    moving: state.moving.includes(props.id),
    interactive: state.interactive.includes(props.id),
    interactable: state.editor.view === "Exporting" /* ApollonView.Exporting */ || state.editor.view === "Highlight" /* ApollonView.Highlight */,
    element: state.elements[props.id],
    zoomFactor: state.editor.zoomFactor,
    selectionBoxActive: state.editor.selectionBoxActive,
}); }, {}));
var CanvasElementComponent = /** @class */ (function (_super) {
    tslib_1.__extends(CanvasElementComponent, _super);
    function CanvasElementComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CanvasElementComponent.prototype.render = function () {
        var _a = this.props, hovered = _a.hovered, selected = _a.selected, remoteSelectors = _a.remoteSelectors, moving = _a.moving, interactive = _a.interactive, interactable = _a.interactable, element = _a.element, ChildComponent = _a.child, children = _a.children, theme = _a.theme, _zoomFactor = _a.zoomFactor, _selectionBoxActive = _a.selectionBoxActive, props = tslib_1.__rest(_a, ["hovered", "selected", "remoteSelectors", "moving", "interactive", "interactable", "element", "child", "children", "theme", "zoomFactor", "selectionBoxActive"]);
        var elements = null;
        if (uml_container_1.UMLContainer.isUMLContainer(element) && ChildComponent) {
            elements = element.ownedElements.map(function (id) { return react_1.default.createElement(ChildComponent, { key: id, id: id }); });
        }
        var ElementComponent = components_1.Components[element.type];
        var highlight = interactable && interactive
            ? theme.interactive.normal
            : interactable && hovered
                ? theme.interactive.hovered
                : element.highlight
                    ? element.highlight
                    : element.fillColor
                        ? element.fillColor
                        : theme.color.background;
        return (react_1.default.createElement("svg", tslib_1.__assign({}, props, element.bounds, { pointerEvents: moving ? 'none' : undefined, fillOpacity: moving ? 0.7 : undefined, fill: highlight }),
            react_1.default.createElement(ElementComponent, { fillColor: highlight, element: uml_element_repository_1.UMLElementRepository.get(element) }, elements),
            children,
            !interactable && (hovered || selected) && (react_1.default.createElement("rect", { x: -STROKE / 2, y: -STROKE / 2, width: element.bounds.width + STROKE, height: element.bounds.height + STROKE, fill: "none", stroke: "#0064ff", strokeOpacity: "0.2", strokeWidth: STROKE, pointerEvents: "none" })),
            remoteSelectors.length > 0 && (react_1.default.createElement("g", null, remoteSelectors.map(function (selectedBy, index) {
                var indicatorPosition = 'translate(' + (element.bounds.width + STROKE) + ' ' + index * 32 + ')';
                return (react_1.default.createElement("g", { key: selectedBy.name + '_' + selectedBy.color, id: selectedBy.name + '_' + selectedBy.color },
                    react_1.default.createElement("rect", { x: -STROKE / 2, y: -STROKE / 2, width: element.bounds.width + STROKE, height: element.bounds.height + STROKE, fill: "none", stroke: selectedBy.color, strokeOpacity: "0.2", strokeWidth: STROKE, pointerEvents: "none" }),
                    react_1.default.createElement("g", { transform: indicatorPosition, pointerEvents: "none" },
                        react_1.default.createElement("rect", { fillOpacity: "0.2", rx: "10", x: "-40", y: "-20", width: "85px", height: "30px", fill: selectedBy.color }),
                        react_1.default.createElement("text", null,
                            react_1.default.createElement("tspan", { textAnchor: "middle" }, selectedBy.name.length < 8 ? selectedBy.name : selectedBy.name.substring(0, 6) + '..')))));
            })))));
    };
    return CanvasElementComponent;
}(react_1.Component));
exports.CanvasElement = enhance(CanvasElementComponent);
//# sourceMappingURL=canvas-element.js.map