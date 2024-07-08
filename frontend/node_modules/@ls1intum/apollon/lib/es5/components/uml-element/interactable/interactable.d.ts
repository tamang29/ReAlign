import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { UMLElementComponentProps } from '../uml-element-component-props';
type StateProps = {
    hovered: boolean;
    selected: boolean;
};
type DispatchProps = {
    select: typeof UMLElementRepository.makeInteractive;
    deselect: typeof UMLElementRepository.unmakeInteractive;
};
type Props = UMLElementComponentProps & StateProps & DispatchProps;
export declare const interactable: (WrappedComponent: ComponentType<UMLElementComponentProps>) => ConnectedComponent<ComponentType<Props>, UMLElementComponentProps>;
export {};
