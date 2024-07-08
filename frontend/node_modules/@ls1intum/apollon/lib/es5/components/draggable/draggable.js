"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Draggable = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var with_draggable_1 = require("./with-draggable");
var is_mobile_1 = tslib_1.__importDefault(require("is-mobile"));
var touch_event_1 = require("../../utils/touch-event");
var enhance = with_draggable_1.withDraggable;
var DraggableComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DraggableComponent, _super);
    function DraggableComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        /**
         * connects drag start to drop event. After the promise of onDragStart is resolved -> the onDrop method given to this component is invoked
         * @param event pointer event which starts the dragging
         */
        _this.onDragStart = function (event) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var dropEvent, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.props.onDragStart(event)];
                    case 1:
                        dropEvent = _a.sent();
                        if (this.props.onDrop) {
                            this.props.onDrop(dropEvent);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    DraggableComponent.prototype.componentDidMount = function () {
        var node = (0, react_dom_1.findDOMNode)(this);
        if ((0, is_mobile_1.default)({ tablet: true })) {
            node.addEventListener('touchstart', this.onDragStart);
            node.addEventListener('touchend', touch_event_1.convertTouchEndIntoPointerUp);
        }
        else {
            node.addEventListener('pointerdown', this.onDragStart);
        }
    };
    DraggableComponent.prototype.componentWillUnmount = function () {
        var node = (0, react_dom_1.findDOMNode)(this);
        if ((0, is_mobile_1.default)({ tablet: true })) {
            node.removeEventListener('touchstart', this.onDragStart);
        }
        else {
            node.removeEventListener('pointerdown', this.onDragStart);
        }
    };
    DraggableComponent.prototype.render = function () {
        return this.props.children;
    };
    return DraggableComponent;
}(react_1.Component));
exports.Draggable = enhance(DraggableComponent);
//# sourceMappingURL=draggable.js.map