import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';
import { UMLRelationshipRepository } from '../../../services/uml-relationship/uml-relationship-repository';
import { AsyncDispatch } from '../../../utils/actions/actions';
import { IPath } from '../../../utils/geometry/path';
import { UMLElementComponentProps } from '../uml-element-component-props';
type StateProps = {
    path: IPath;
    reconnecting: boolean;
    disabled: boolean;
    selectionBoxActive: boolean;
};
type DispatchProps = {
    start: AsyncDispatch<typeof UMLRelationshipRepository.startReconnecting>;
    reconnect: AsyncDispatch<typeof UMLRelationshipRepository.reconnect>;
};
type Props = UMLElementComponentProps & StateProps & DispatchProps;
export declare const reconnectable: (WrappedComponent: ComponentType<UMLElementComponentProps>) => ConnectedComponent<ComponentType<Props>, UMLElementComponentProps>;
export {};
