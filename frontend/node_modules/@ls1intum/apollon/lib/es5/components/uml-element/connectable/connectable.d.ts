import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { UMLRelationshipRepository } from '../../../services/uml-relationship/uml-relationship-repository';
import { AsyncDispatch } from '../../../utils/actions/actions';
import { UMLElementComponentProps } from '../uml-element-component-props';
import { UMLElementType, UMLRelationshipType } from '../../..';
import { IUMLElement } from '../../../services/uml-element/uml-element';
type StateProps = {
    hovered: boolean;
    selected: boolean;
    connecting: boolean;
    reconnecting: boolean;
    element: IUMLElement;
    type: UMLElementType | UMLRelationshipType;
};
type DispatchProps = {
    start: AsyncDispatch<typeof UMLElementRepository.startConnecting>;
    connect: AsyncDispatch<typeof UMLElementRepository.connect>;
    reconnect: AsyncDispatch<typeof UMLRelationshipRepository.reconnect>;
};
type Props = UMLElementComponentProps & StateProps & DispatchProps;
export declare const connectable: (WrappedComponent: ComponentType<UMLElementComponentProps>) => ConnectedComponent<ComponentType<Props>, UMLElementComponentProps>;
export {};
