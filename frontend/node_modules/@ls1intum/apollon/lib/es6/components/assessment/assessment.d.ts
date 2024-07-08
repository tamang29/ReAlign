import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';
import { IUMLElement } from '../../services/uml-element/uml-element';
import { UMLElementRepository } from '../../services/uml-element/uml-element-repository';
import { AsyncAction, AsyncDispatch } from '../../utils/actions/actions';
type OwnProps = {
    element: IUMLElement;
};
type StateProps = {};
type DispatchProps = {
    getChildren: AsyncDispatch<typeof UMLElementRepository.getChildren>;
    assessNext: AsyncDispatch<(current: IUMLElement) => AsyncAction>;
};
type Props = OwnProps & StateProps & DispatchProps;
export declare const Assessment: ConnectedComponent<ComponentType<Props>, OwnProps>;
export {};
