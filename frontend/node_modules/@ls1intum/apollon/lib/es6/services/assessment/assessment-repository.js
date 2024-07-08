export class AssessmentRepository {
}
AssessmentRepository.assess = (element, assessment, assessmentType) => {
    const payloadAssessment = { ...assessment };
    if (assessmentType !== 'DROPPED' && payloadAssessment.dropInfo) {
        delete payloadAssessment.dropInfo;
    }
    return {
        type: "@@element/ASSESS" /* AssessmentActionTypes.ASSESS */,
        payload: { element, assessment: payloadAssessment },
        undoable: false,
    };
};
AssessmentRepository.delete = (element) => {
    return {
        type: "@@assessment/DELETE" /* AssessmentActionTypes.DELETE */,
        payload: { element },
        undoable: false,
    };
};
AssessmentRepository.getById = (assessments) => (id) => {
    const assessment = assessments[id];
    if (!assessment)
        return null;
    return assessment;
};
//# sourceMappingURL=assessment-repository.js.map