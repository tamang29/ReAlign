import React, { FunctionComponent } from 'react';
import { UMLActivityFinalNode } from './uml-activity-final-node';
import { withThemeProps } from '../../../components/theme/styles';
import { ConnectedComponent } from 'react-redux';
type OwnProps = {
    element: UMLActivityFinalNode;
};
type StateProps = {
    interactive: boolean;
    interactable: boolean;
};
type DispatchProps = {};
type Props = OwnProps & StateProps & DispatchProps & withThemeProps;
export declare const UMLActivityFinalNodeC: FunctionComponent<Props>;
export declare const UMLActivityFinalNodeComponent: ConnectedComponent<React.ComponentType<Props>, OwnProps>;
export {};
