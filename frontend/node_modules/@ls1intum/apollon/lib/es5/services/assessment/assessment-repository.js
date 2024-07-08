"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssessmentRepository = void 0;
var tslib_1 = require("tslib");
var AssessmentRepository = /** @class */ (function () {
    function AssessmentRepository() {
    }
    AssessmentRepository.assess = function (element, assessment, assessmentType) {
        var payloadAssessment = tslib_1.__assign({}, assessment);
        if (assessmentType !== 'DROPPED' && payloadAssessment.dropInfo) {
            delete payloadAssessment.dropInfo;
        }
        return {
            type: "@@element/ASSESS" /* AssessmentActionTypes.ASSESS */,
            payload: { element: element, assessment: payloadAssessment },
            undoable: false,
        };
    };
    AssessmentRepository.delete = function (element) {
        return {
            type: "@@assessment/DELETE" /* AssessmentActionTypes.DELETE */,
            payload: { element: element },
            undoable: false,
        };
    };
    AssessmentRepository.getById = function (assessments) {
        return function (id) {
            var assessment = assessments[id];
            if (!assessment)
                return null;
            return assessment;
        };
    };
    return AssessmentRepository;
}());
exports.AssessmentRepository = AssessmentRepository;
//# sourceMappingURL=assessment-repository.js.map