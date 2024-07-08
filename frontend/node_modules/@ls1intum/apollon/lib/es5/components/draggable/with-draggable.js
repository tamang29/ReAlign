"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withDraggable = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var draggable_context_1 = require("./draggable-context");
/**
 * used to add DraggableContext properties to component properties, i.e. {@link DraggableContext.onDragStart} and {@link DraggableContext.onDragEnd}
 * @param Component which needs access to the props of DraggableContext
 */
function withDraggable(Component) {
    return function ThemedComponent(props) {
        return react_1.default.createElement(draggable_context_1.DraggableConsumer, null, function (context) { return react_1.default.createElement(Component, tslib_1.__assign({}, props, context)); });
    };
}
exports.withDraggable = withDraggable;
//# sourceMappingURL=with-draggable.js.map