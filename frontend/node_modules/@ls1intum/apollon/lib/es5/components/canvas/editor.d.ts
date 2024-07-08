import { ComponentType, ReactNode } from 'react';
import { ConnectedComponent } from 'react-redux';
import { UMLElementRepository } from '../../services/uml-element/uml-element-repository';
import { AsyncDispatch } from '../../utils/actions/actions';
import { EditorRepository } from '../../services/editor/editor-repository';
type OwnProps = {
    children: ReactNode;
};
type StateProps = {
    moving: string[];
    connecting: boolean;
    reconnecting: boolean;
    scale: number;
};
type DispatchProps = {
    move: AsyncDispatch<typeof UMLElementRepository.move>;
    setZoomFactor: typeof EditorRepository.setZoomFactor;
};
type Props = OwnProps & StateProps & DispatchProps;
export declare const Editor: ConnectedComponent<ComponentType<Props>, OwnProps>;
export {};
