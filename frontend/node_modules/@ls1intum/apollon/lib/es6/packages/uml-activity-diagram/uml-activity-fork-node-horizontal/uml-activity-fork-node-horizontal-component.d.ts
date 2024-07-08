import React from 'react';
import { UMLActivityForkNodeHorizontal } from './uml-activity-fork-node-horizontal';
import { withThemeProps } from '../../../components/theme/styles';
import { ConnectedComponent } from 'react-redux';
type OwnProps = {
    element: UMLActivityForkNodeHorizontal;
};
type StateProps = {
    interactive: boolean;
    interactable: boolean;
};
type DispatchProps = {};
type Props = OwnProps & StateProps & DispatchProps & withThemeProps;
export declare const UMLActivityForkNodeHorizontalComponent: ConnectedComponent<React.ComponentType<Props>, OwnProps>;
export {};
