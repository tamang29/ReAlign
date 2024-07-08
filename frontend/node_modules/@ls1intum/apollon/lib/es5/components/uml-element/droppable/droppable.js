"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.droppable = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var droppable_1 = require("../../draggable/droppable");
var droppable = function (WrappedComponent) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(Droppable, _super);
        function Droppable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Droppable.prototype.render = function () {
            return (react_1.default.createElement(droppable_1.Droppable, { owner: this.props.id },
                react_1.default.createElement(WrappedComponent, tslib_1.__assign({}, this.props))));
        };
        return Droppable;
    }(react_1.Component));
};
exports.droppable = droppable;
//# sourceMappingURL=droppable.js.map