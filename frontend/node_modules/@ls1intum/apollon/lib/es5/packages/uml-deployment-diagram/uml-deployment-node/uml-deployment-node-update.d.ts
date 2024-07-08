import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { AsyncDispatch } from '../../../utils/actions/actions';
import { UMLDeploymentNode } from './uml-deployment-node';
type OwnProps = {
    element: UMLDeploymentNode;
};
type StateProps = {};
type DispatchProps = {
    update: typeof UMLElementRepository.update;
    delete: AsyncDispatch<typeof UMLElementRepository.delete>;
};
type Props = OwnProps & StateProps & DispatchProps;
export declare const UMLDeploymentNodeUpdate: ConnectedComponent<ComponentType<Props>, OwnProps>;
export {};
