import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';
import { UMLElement } from '../../services/uml-element/uml-element';
import { UMLElementRepository } from '../../services/uml-element/uml-element-repository';
import { AsyncDispatch } from '../../utils/actions/actions';
type OwnProps = {
    element: UMLElement;
};
type StateProps = {};
type DispatchProps = {
    update: typeof UMLElementRepository.update;
    delete: AsyncDispatch<typeof UMLElementRepository.delete>;
};
type Props = OwnProps & StateProps & DispatchProps;
export declare const DefaultPopup: ConnectedComponent<ComponentType<Props>, OwnProps>;
export {};
