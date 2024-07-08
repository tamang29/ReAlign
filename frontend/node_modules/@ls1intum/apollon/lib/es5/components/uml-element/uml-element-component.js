"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMLElementComponent = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var uml_elements_1 = require("../../packages/uml-elements");
var uml_relationship_type_1 = require("../../packages/uml-relationship-type");
var uml_relationships_1 = require("../../packages/uml-relationships");
var editor_types_1 = require("../../services/editor/editor-types");
var assessable_1 = require("./assessable/assessable");
var canvas_element_1 = require("./canvas-element");
var canvas_relationship_1 = require("./canvas-relationship");
var connectable_1 = require("./connectable/connectable");
var droppable_1 = require("./droppable/droppable");
var hoverable_1 = require("./hoverable/hoverable");
var interactable_1 = require("./interactable/interactable");
var movable_1 = require("./movable/movable");
var reconnectable_1 = require("./reconnectable/reconnectable");
var resizable_1 = require("./resizable/resizable");
var selectable_1 = require("./selectable/selectable");
var updatable_1 = require("./updatable/updatable");
var enhance = (0, react_redux_1.connect)(function (state, props) { return ({
    features: state.editor.features,
    type: state.elements[props.id].type,
    readonly: state.editor.readonly,
    view: state.editor.view,
    mode: state.editor.mode,
}); });
var getInitialState = function (props) {
    var features = tslib_1.__assign(tslib_1.__assign({}, uml_elements_1.UMLElements), uml_relationships_1.UMLRelationships)[props.type].features;
    var component = props.type in uml_relationship_type_1.UMLRelationshipType ? canvas_relationship_1.CanvasRelationship : canvas_element_1.CanvasElement;
    var decorators = [];
    if (props.mode === editor_types_1.ApollonMode.Assessment) {
        decorators.push(assessable_1.assessable, updatable_1.updatable, selectable_1.selectable, hoverable_1.hoverable);
    }
    else if (props.readonly) {
        decorators.push(selectable_1.selectable, hoverable_1.hoverable);
    }
    else if (props.view === "Exporting" /* ApollonView.Exporting */ || props.view === "Highlight" /* ApollonView.Highlight */) {
        decorators.push(interactable_1.interactable, hoverable_1.hoverable);
    }
    else if (props.view === "Modelling" /* ApollonView.Modelling */) {
        if (props.features.hoverable && features.hoverable) {
            decorators.push(hoverable_1.hoverable);
        }
        if (features.reconnectable) {
            decorators.push(reconnectable_1.reconnectable);
        }
        if (props.features.selectable && features.selectable) {
            decorators.push(selectable_1.selectable);
        }
        if (props.features.movable && features.movable) {
            decorators.push(movable_1.movable);
        }
        if (props.features.resizable && features.resizable) {
            var options = {
                preventY: features.resizable === 'WIDTH',
                preventX: features.resizable === 'HEIGHT',
            };
            decorators.push((0, resizable_1.resizable)(options));
        }
        if (props.features.connectable && features.connectable) {
            decorators.push(connectable_1.connectable);
        }
        if (props.features.updatable && features.updatable) {
            decorators.push(updatable_1.updatable);
        }
        if (props.features.droppable && features.droppable) {
            decorators.push(droppable_1.droppable);
        }
    }
    // reverse, because compose creates one function by composing the given functions from right to left
    return {
        component: redux_1.compose.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(decorators.reverse()), false))(component),
    };
};
var UMLElementComponentC = /** @class */ (function (_super) {
    tslib_1.__extends(UMLElementComponentC, _super);
    function UMLElementComponentC() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = getInitialState(_this.props);
        return _this;
    }
    UMLElementComponentC.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps !== this.props) {
            this.setState(getInitialState(this.props));
        }
    };
    UMLElementComponentC.prototype.render = function () {
        var ElementComponent = this.state.component;
        return react_1.default.createElement(ElementComponent, { id: this.props.id, child: exports.UMLElementComponent });
    };
    return UMLElementComponentC;
}(react_1.Component));
exports.UMLElementComponent = enhance(UMLElementComponentC);
//# sourceMappingURL=uml-element-component.js.map