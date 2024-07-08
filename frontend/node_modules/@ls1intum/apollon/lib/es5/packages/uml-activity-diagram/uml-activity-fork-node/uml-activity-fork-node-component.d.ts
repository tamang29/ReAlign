import React from 'react';
import { UMLActivityForkNode } from './uml-activity-fork-node';
import { withThemeProps } from '../../../components/theme/styles';
import { ConnectedComponent } from 'react-redux';
type OwnProps = {
    element: UMLActivityForkNode;
};
type StateProps = {
    interactive: boolean;
    interactable: boolean;
};
type DispatchProps = {};
type Props = OwnProps & StateProps & DispatchProps & withThemeProps;
export declare const UMLActivityForkNodeComponent: ConnectedComponent<React.ComponentType<Props>, OwnProps>;
export {};
