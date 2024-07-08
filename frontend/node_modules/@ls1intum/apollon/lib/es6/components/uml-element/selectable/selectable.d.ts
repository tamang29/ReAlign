import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { AsyncDispatch } from '../../../utils/actions/actions';
import { UMLElementComponentProps } from '../uml-element-component-props';
type StateProps = {
    hovered: boolean;
    selected: boolean;
};
type DispatchProps = {
    select: AsyncDispatch<typeof UMLElementRepository.select>;
    deselect: AsyncDispatch<typeof UMLElementRepository.deselect>;
};
type Props = UMLElementComponentProps & StateProps & DispatchProps;
export declare const selectable: (WrappedComponent: ComponentType<UMLElementComponentProps>) => ConnectedComponent<ComponentType<Props>, UMLElementComponentProps>;
export {};
