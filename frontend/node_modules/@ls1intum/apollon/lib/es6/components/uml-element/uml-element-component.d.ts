import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';
import { UMLElementType } from '../../packages/uml-element-type';
import { UMLRelationshipType } from '../../packages/uml-relationship-type';
import { ApollonMode, ApollonView } from '../../services/editor/editor-types';
import { UMLElementFeatures } from '../../services/uml-element/uml-element-features';
import { UMLElementComponentProps } from './uml-element-component-props';
type StateProps = {
    features: UMLElementFeatures;
    type: UMLElementType | UMLRelationshipType;
    readonly: boolean;
    view: ApollonView;
    mode: ApollonMode;
};
type DispatchProps = {};
type Props = UMLElementComponentProps & StateProps & DispatchProps;
export declare const UMLElementComponent: ConnectedComponent<ComponentType<Props>, UMLElementComponentProps>;
export {};
