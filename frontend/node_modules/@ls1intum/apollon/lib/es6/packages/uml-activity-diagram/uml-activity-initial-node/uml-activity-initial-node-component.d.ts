import React from 'react';
import { UMLActivityInitialNode } from './uml-activity-initial-node';
import { ConnectedComponent } from 'react-redux';
import { withThemeProps } from '../../../components/theme/styles';
type OwnProps = {
    element: UMLActivityInitialNode;
};
type StateProps = {
    interactive: boolean;
    interactable: boolean;
};
type DispatchProps = {};
type Props = OwnProps & StateProps & DispatchProps & withThemeProps;
export declare const UMLActivityInitialNodeComponent: ConnectedComponent<React.ComponentType<Props>, OwnProps>;
export {};
