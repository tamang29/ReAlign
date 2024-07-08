"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assessable = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var react_redux_1 = require("react-redux");
var uml_relationship_1 = require("../../../services/uml-relationship/uml-relationship");
var path_1 = require("../../../utils/geometry/path");
var point_1 = require("../../../utils/geometry/point");
var assessment_styles_1 = require("./assessment-styles");
var react_dom_1 = require("react-dom");
var uml_element_repository_1 = require("../../../services/uml-element/uml-element-repository");
var assessment_repository_1 = require("../../../services/assessment/assessment-repository");
var enhance = (0, react_redux_1.connect)(function (state, props) {
    var element = state.elements[props.id];
    return {
        assessment: state.assessments[props.id],
        bounds: element.bounds,
        path: uml_relationship_1.UMLRelationship.isUMLRelationship(element) ? element.path : undefined,
        readonly: state.editor.readonly,
    };
}, {
    select: uml_element_repository_1.UMLElementRepository.select,
    deselect: uml_element_repository_1.UMLElementRepository.deselect,
    assess: assessment_repository_1.AssessmentRepository.assess,
    updateStart: uml_element_repository_1.UMLElementRepository.updateStart,
});
var assessable = function (WrappedComponent) {
    var Assessable = /** @class */ (function (_super) {
        tslib_1.__extends(Assessable, _super);
        function Assessable() {
            var _this = _super.apply(this, tslib_1.__spreadArray([], tslib_1.__read(arguments), false)) || this;
            // TODO: the following code is Artemis specific and should be refactored
            // TODO: extend the API so that external application can create a Apollon Draggable element
            // TODO: extend the API so that callbacks can be registered which should be called when a draggable element was dropped
            // TODO: the benefit of that would be, that we could remove the artemis specific code from apollon
            _this.onDragOver = function (ev) {
                // prevent default to allow drop
                ev.preventDefault();
                // don't propagate to parents, so that most accurate element is selected only
                ev.stopPropagation();
                _this.props.select(_this.props.id);
            };
            _this.onDragLeave = function () {
                _this.props.deselect(_this.props.id);
            };
            /**
             * Artemis instruction object can be dropped on assessment sections to automatically fill assessment
             * @param ev DropEvent
             */
            _this.onDrop = function (ev) {
                // prevent default action (open as link for some elements)
                ev.preventDefault();
                // unselect current element
                _this.props.deselect(_this.props.id);
                // don't propagate to parents, so that most accurate element is selected only
                ev.stopPropagation();
                if (!!ev.dataTransfer) {
                    var data = ev.dataTransfer.getData('text/plain');
                    if (!data) {
                        // tslint:disable-next-line:no-console
                        console.warn('Could not get artemis sgi element from drop element');
                        return;
                    }
                    var instruction = void 0;
                    try {
                        instruction = JSON.parse(data);
                    }
                    catch (e) {
                        // tslint:disable-next-line:no-console
                        console.error('Could not parse artemis sgi', e);
                        return;
                    }
                    // TODO: following messages should be received from Artemis
                    var removeMessage = 'Do you want to remove the link to the assessment instruction?';
                    var tooltipMessage = 'Assessment Instruction: ' + instruction.instructionDescription;
                    var feedbackHint = 'This feedback is associated with the assessment instruction. You can provide additional feedback for this submission element. Student will see combined feedback during the review.';
                    var _a = _this.props, elementId = _a.id, assessment = _a.assessment;
                    var score = instruction.credits;
                    var dropInfo = { instruction: instruction, removeMessage: removeMessage, tooltipMessage: tooltipMessage, feedbackHint: feedbackHint };
                    _this.props.assess(elementId, tslib_1.__assign(tslib_1.__assign({}, assessment), { score: score, dropInfo: dropInfo }), 'DROPPED');
                    _this.props.updateStart(elementId);
                }
            };
            return _this;
        }
        Assessable.prototype.componentDidMount = function () {
            if (!this.props.readonly) {
                var node = (0, react_dom_1.findDOMNode)(this);
                node.addEventListener('dragover', this.onDragOver.bind(this));
                node.addEventListener('dragleave', this.onDragLeave.bind(this));
                node.addEventListener('drop', this.onDrop.bind(this));
            }
        };
        Assessable.prototype.componentWillUnmount = function () {
            var node = (0, react_dom_1.findDOMNode)(this);
            node.removeEventListener('dragover', this.onDragOver);
            node.removeEventListener('dragleave', this.onDragLeave);
            node.removeEventListener('drop', this.onDrop);
        };
        Assessable.prototype.render = function () {
            var _a = this.props, assessment = _a.assessment, assess = _a.assess, select = _a.select, deselect = _a.deselect, updateStart = _a.updateStart, bounds = _a.bounds, ipath = _a.path, readonly = _a.readonly, props = tslib_1.__rest(_a, ["assessment", "assess", "select", "deselect", "updateStart", "bounds", "path", "readonly"]);
            var position;
            var assessmentWarningPosition;
            if (ipath) {
                var path = new path_1.Path(ipath);
                position = path.position(path.length / 2);
                assessmentWarningPosition = path.position(path.length / 2 - assessment_styles_1.ICON_SIZE * 2);
            }
            else {
                position = new point_1.Point(bounds.width, 0);
                assessmentWarningPosition = new point_1.Point(position.x - assessment_styles_1.ICON_SIZE * 2, position.y);
            }
            return (react_1.default.createElement(WrappedComponent, tslib_1.__assign({}, props),
                assessment && assessment.correctionStatus && assessment.correctionStatus.status === 'INCORRECT' && (react_1.default.createElement("g", { transform: "translate(".concat(assessmentWarningPosition.x, " ").concat(assessmentWarningPosition.y, ")"), pointerEvents: 'none' },
                    react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(assessment_styles_1.Container, null),
                        react_1.default.createElement(assessment_styles_1.Triangle, null),
                        react_1.default.createElement(assessment_styles_1.WarningIcon, null)))),
                assessment && (react_1.default.createElement("g", { transform: "translate(".concat(position.x, " ").concat(position.y, ")"), pointerEvents: 'none' },
                    assessment.score === 0 && !!assessment.feedback && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(assessment_styles_1.Container, null),
                        react_1.default.createElement(assessment_styles_1.FeedbackIcon, null))),
                    assessment.score > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(assessment_styles_1.Container, null),
                        react_1.default.createElement(assessment_styles_1.CorrectIcon, null))),
                    assessment.score < 0 && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(assessment_styles_1.Container, null),
                        react_1.default.createElement(assessment_styles_1.WrongIcon, null)))))));
        };
        return Assessable;
    }(react_1.Component));
    return enhance(Assessable);
};
exports.assessable = assessable;
//# sourceMappingURL=assessable.js.map