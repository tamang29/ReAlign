import React, { FunctionComponent } from 'react';
import { BPMNGroup } from '../bpmn-group/bpmn-group';
import { withThemeProps } from '../../../components/theme/styles';
import { ConnectedComponent } from 'react-redux';
type OwnProps = {
    element: BPMNGroup;
    strokeColor?: string;
    textColor?: string;
    children?: React.ReactNode;
};
type StateProps = {
    interactive: boolean;
    interactable: boolean;
    hovered: boolean;
};
type DispatchProps = {};
type Props = OwnProps & StateProps & DispatchProps & withThemeProps;
export declare const BPMNAnnotationC: FunctionComponent<Props>;
export declare const BPMNAnnotationComponent: ConnectedComponent<React.ComponentType<Props>, OwnProps>;
export {};
