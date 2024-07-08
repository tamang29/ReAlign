import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';
import { IAssessment } from '../../../services/assessment/assessment';
import { IBoundary } from '../../../utils/geometry/boundary';
import { IPath } from '../../../utils/geometry/path';
import { UMLElementComponentProps } from '../uml-element-component-props';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { AsyncDispatch } from '../../../utils/actions/actions';
import { AssessmentRepository } from '../../../services/assessment/assessment-repository';
type StateProps = {
    assessment?: IAssessment;
    bounds: IBoundary;
    path?: IPath;
    readonly: boolean;
};
type DispatchProps = {
    select: AsyncDispatch<typeof UMLElementRepository.select>;
    deselect: AsyncDispatch<typeof UMLElementRepository.deselect>;
    assess: typeof AssessmentRepository.assess;
    updateStart: AsyncDispatch<typeof UMLElementRepository.updateStart>;
};
type Props = UMLElementComponentProps & StateProps & DispatchProps;
export declare const assessable: (WrappedComponent: ComponentType<UMLElementComponentProps>) => ConnectedComponent<ComponentType<Props>, UMLElementComponentProps>;
export {};
