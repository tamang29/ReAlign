import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';
import { UMLElementRepository } from '../../../services/uml-element/uml-element-repository';
import { AsyncDispatch } from '../../../utils/actions/actions';
import { UMLElementComponentProps } from '../uml-element-component-props';
type StateProps = {
    zoomFactor: number;
    selectionBoxActive: boolean;
};
type DispatchProps = {
    start: AsyncDispatch<typeof UMLElementRepository.startResizing>;
    resize: AsyncDispatch<typeof UMLElementRepository.resize>;
    end: AsyncDispatch<typeof UMLElementRepository.endResizing>;
};
type Props = UMLElementComponentProps & StateProps & DispatchProps;
export declare const resizable: (options?: {
    preventX: boolean;
    preventY: boolean;
}) => (WrappedComponent: ComponentType<UMLElementComponentProps>) => ConnectedComponent<ComponentType<Props>, UMLElementComponentProps>;
export {};
