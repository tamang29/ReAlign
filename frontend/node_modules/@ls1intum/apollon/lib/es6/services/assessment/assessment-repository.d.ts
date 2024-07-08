import { IAssessment } from './assessment';
import { AssessAction, AssessmentState, DeleteAction } from './assessment-types';
export declare class AssessmentRepository {
    static assess: (element: string, assessment: IAssessment, assessmentType?: 'MANUAL' | 'DROPPED') => AssessAction;
    static delete: (element: string) => DeleteAction;
    static getById: (assessments: AssessmentState) => (id: string) => IAssessment | null;
}
