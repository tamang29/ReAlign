"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatable = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_dom_1 = require("react-dom");
var react_redux_1 = require("react-redux");
var uml_element_repository_1 = require("../../../services/uml-element/uml-element-repository");
var uml_relationship_1 = require("../../../services/uml-relationship/uml-relationship");
var FloatingButton_1 = require("./FloatingButton");
var EditIcon_1 = require("./icons/EditIcon");
var DeleteIcon_1 = require("./icons/DeleteIcon");
var uml_relationship_repository_1 = require("../../../services/uml-relationship/uml-relationship-repository");
var initialState = {};
var enhance = (0, react_redux_1.connect)(function (state, props) { return ({
    hovered: state.hovered[0] === props.id,
    selected: state.selected.includes(props.id),
}); }, {
    updateStart: uml_element_repository_1.UMLElementRepository.updateStart,
    deleteElement: uml_element_repository_1.UMLElementRepository.delete,
    getElementById: uml_element_repository_1.UMLElementRepository.getById,
    getRelationshipById: uml_relationship_repository_1.UMLRelationshipRepository.getById,
});
var updatable = function (WrappedComponent) {
    var Updatable = /** @class */ (function (_super) {
        tslib_1.__extends(Updatable, _super);
        function Updatable() {
            var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
            _this.state = initialState;
            /**
             * Show the update dialog of the wrapped element
             */
            _this.onStartUpdate = function () {
                _this.props.updateStart(_this.props.id);
            };
            /**
             * Show the delete dialog of the wrapped element
             */
            _this.onDelete = function () {
                _this.props.deleteElement(_this.props.id);
            };
            return _this;
        }
        Updatable.prototype.componentDidMount = function () {
            var node = (0, react_dom_1.findDOMNode)(this);
            node.addEventListener('dblclick', this.onStartUpdate);
        };
        Updatable.prototype.componentWillUnmount = function () {
            var node = (0, react_dom_1.findDOMNode)(this);
            node.removeEventListener('dblclick', this.onStartUpdate);
        };
        /**
         * Determine the rightmost point in a path
         * @param path The path for which the rightmost point should be determined
         */
        Updatable.prototype.findRightmostPoint = function (path) {
            var e_1, _a;
            var rightmostPoint = undefined;
            try {
                for (var path_1 = tslib_1.__values(path), path_1_1 = path_1.next(); !path_1_1.done; path_1_1 = path_1.next()) {
                    var currentPoint = path_1_1.value;
                    if (rightmostPoint === undefined || currentPoint.x > rightmostPoint.x) {
                        rightmostPoint = currentPoint;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (path_1_1 && !path_1_1.done && (_a = path_1.return)) _a.call(path_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return rightmostPoint;
        };
        /**
         * Helper function to determine the base coordinates for the context actions
         * @param element The element for which the context action base coordinates should be determined
         */
        Updatable.prototype.getContextActionBaseCoordinates = function (element) {
            var _a, _b;
            var isRelationship = uml_relationship_1.UMLRelationship.isUMLRelationship(element);
            if (!isRelationship) {
                return {
                    x: element.bounds.width,
                    y: -30,
                };
            }
            var relationship = element;
            var rightmostPoint = this.findRightmostPoint(relationship.path);
            return {
                x: ((_a = rightmostPoint === null || rightmostPoint === void 0 ? void 0 : rightmostPoint.x) !== null && _a !== void 0 ? _a : 0) - 40,
                y: ((_b = rightmostPoint === null || rightmostPoint === void 0 ? void 0 : rightmostPoint.y) !== null && _b !== void 0 ? _b : 0) - 30,
            };
        };
        Updatable.prototype.render = function () {
            var _a = this.props, updateStart = _a.updateStart, deleteElement = _a.deleteElement, getElementById = _a.getElementById, getRelationshipById = _a.getRelationshipById, hovered = _a.hovered, selected = _a.selected, props = tslib_1.__rest(_a, ["updateStart", "deleteElement", "getElementById", "getRelationshipById", "hovered", "selected"]);
            var element = getElementById(props.id);
            var relationship = getRelationshipById(props.id);
            var baseCoordinates = this.getContextActionBaseCoordinates((element || relationship));
            return (react_1.default.createElement(WrappedComponent, tslib_1.__assign({}, props),
                react_1.default.createElement(FloatingButton_1.FloatingButton, { style: {
                        opacity: selected ? 1 : 0,
                        transform: "translate(".concat(baseCoordinates.x, "px, ").concat(selected ? baseCoordinates.y - 10 : baseCoordinates.y, "px)"),
                    }, onClick: this.onStartUpdate },
                    react_1.default.createElement(EditIcon_1.EditIcon, { x: 7, y: 7 })),
                react_1.default.createElement(FloatingButton_1.FloatingButton, { style: {
                        opacity: selected ? 1 : 0,
                        transform: "translate(".concat(baseCoordinates.x, "px, ").concat(selected ? baseCoordinates.y - 50 : baseCoordinates.y, "px)"),
                    }, onClick: this.onDelete },
                    react_1.default.createElement(DeleteIcon_1.DeleteIcon, { x: 7, y: 7 }))));
        };
        return Updatable;
    }(react_1.Component));
    return enhance(Updatable);
};
exports.updatable = updatable;
//# sourceMappingURL=updatable.js.map