import React from 'react';
import { UMLInterfaceRequired } from './uml-interface-required';
type OwnProps = {
    element: UMLInterfaceRequired;
};
type StateProps = {
    hasOppositeRequiredInterface: boolean;
    currentRequiredInterfaces: UMLInterfaceRequired[];
    currentAllInterfaces: any;
};
type DispatchProps = {};
type Props = OwnProps & StateProps & DispatchProps;
export declare const UMLInterfaceRequiredComponent: import("react-redux").ConnectedComponent<React.FunctionComponent<Props>, {
    element: UMLInterfaceRequired;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export {};
