"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Droppable = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var with_draggable_1 = require("./with-draggable");
var enhance = with_draggable_1.withDraggable;
/**
 * This component adds events listener to determine when a drop is done
 */
var DroppableComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DroppableComponent, _super);
    function DroppableComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DroppableComponent.prototype.componentDidMount = function () {
        var node = (0, react_dom_1.findDOMNode)(this);
        // not distinguished between mobile and non mobile
        // when a touchend is fired, we fire our own pointerup event which triggers the drop
        // we do this, because firing own touchend is initialized with wrong coordinates
        node.addEventListener('pointerup', this.props.onDragEnd(this.props.owner));
    };
    DroppableComponent.prototype.componentWillUnmount = function () {
        var node = (0, react_dom_1.findDOMNode)(this);
        // not distinguished between mobile and non mobile
        node.removeEventListener('pointerup', this.props.onDragEnd(this.props.owner));
    };
    DroppableComponent.prototype.render = function () {
        return this.props.children;
    };
    return DroppableComponent;
}(react_1.Component));
exports.Droppable = enhance(DroppableComponent);
//# sourceMappingURL=droppable.js.map