import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { UMLElementComponentProps } from '../uml-element-component-props';
type OwnProps = UMLElementComponentProps;
type StateProps = {
    cannotBeHovered: boolean;
};
type DispatchProps = {
    hover: typeof UMLElementRepository.hover;
    leave: typeof UMLElementRepository.leave;
};
type Props = OwnProps & StateProps & DispatchProps;
export declare const hoverable: (WrappedComponent: ComponentType<UMLElementComponentProps>) => ConnectedComponent<ComponentType<Props>, OwnProps>;
export {};
