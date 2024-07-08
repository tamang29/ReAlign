import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { AsyncDispatch } from '../../../utils/actions/actions';
import { UMLElementComponentProps } from '../uml-element-component-props';
type StateProps = {
    movable: boolean;
    moving: boolean;
    zoomFactor: number;
    selectionBoxActive: boolean;
};
type DispatchProps = {
    start: AsyncDispatch<typeof UMLElementRepository.startMoving>;
    move: AsyncDispatch<typeof UMLElementRepository.move>;
    end: AsyncDispatch<typeof UMLElementRepository.endMoving>;
};
type Props = UMLElementComponentProps & StateProps & DispatchProps;
export declare const movable: (WrappedComponent: ComponentType<UMLElementComponentProps>) => ConnectedComponent<ComponentType<Props>, UMLElementComponentProps>;
export {};
