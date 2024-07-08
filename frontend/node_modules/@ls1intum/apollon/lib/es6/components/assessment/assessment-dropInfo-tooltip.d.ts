import React from 'react';
import { IAssessment } from '../../services/assessment/assessment';
import { IUMLElement } from '../../services/uml-element/uml-element';
type OwnProps = {
    assessment: IAssessment | null;
    element: IUMLElement;
    readonly: boolean;
};
export declare const AssessmentDropInfoTooltip: React.ComponentClass<OwnProps, any>;
export {};
