"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assessment = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var uml_element_repository_1 = require("../../services/uml-element/uml-element-repository");
var button_1 = require("../controls/button/button");
var assessment_section_1 = require("./assessment-section");
var getInitialState = function (_a) {
    var element = _a.element, getChildren = _a.getChildren;
    return ({
        elements: getChildren(element.id),
    });
};
var enhance = (0, react_redux_1.connect)(null, {
    getChildren: uml_element_repository_1.UMLElementRepository.getChildren,
    assessNext: function (current) {
        return function (dispatch, getState) {
            var elements = getState().elements;
            var children = dispatch(uml_element_repository_1.UMLElementRepository.getChildren(current.id));
            var last = children.length ? children[children.length - 1] : current;
            var index = Object.keys(elements).indexOf(last.id) + 1;
            var next = Object.keys(elements)[index % Object.keys(elements).length];
            dispatch(uml_element_repository_1.UMLElementRepository.updateEnd(current.id));
            dispatch(uml_element_repository_1.UMLElementRepository.deselect(current.id));
            dispatch(uml_element_repository_1.UMLElementRepository.updateStart(next));
            dispatch(uml_element_repository_1.UMLElementRepository.select(next));
        };
    },
});
var AssessmentComponent = /** @class */ (function (_super) {
    tslib_1.__extends(AssessmentComponent, _super);
    function AssessmentComponent() {
        var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
        _this.state = getInitialState(_this.props);
        _this.container = (0, react_1.createRef)();
        _this.setFocus = function () {
            if (!_this.container.current) {
                return;
            }
            var focusable = _this.container.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusable) {
                focusable.focus();
            }
        };
        _this.onKey = function (event) {
            if (event.key === 'Enter') {
                if (event.type === 'keydown') {
                    event.preventDefault();
                }
                else {
                    _this.next();
                }
            }
        };
        _this.next = function () {
            var _a = _this.props, assessNext = _a.assessNext, element = _a.element;
            assessNext(element);
        };
        return _this;
    }
    AssessmentComponent.prototype.componentDidMount = function () {
        this.setFocus();
    };
    AssessmentComponent.prototype.componentDidUpdate = function (props) {
        if (props.element !== this.props.element) {
            this.setState(getInitialState(this.props), this.setFocus);
        }
    };
    AssessmentComponent.prototype.render = function () {
        var elements = this.state.elements;
        return (react_1.default.createElement("div", { ref: this.container, id: "modeling-assessment-container" },
            elements.map(function (element) { return (react_1.default.createElement(assessment_section_1.AssessmentSection, { key: element.id, element: element })); }),
            react_1.default.createElement("section", null,
                react_1.default.createElement(button_1.Button, { block: true, outline: true, color: "primary", onClick: this.next, onKeyDown: this.onKey, onKeyUp: this.onKey }, "Next Assessment"))));
    };
    return AssessmentComponent;
}(react_1.Component));
exports.Assessment = enhance(AssessmentComponent);
//# sourceMappingURL=assessment.js.map