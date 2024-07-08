import React from 'react';
type Props = {
    onClick: any;
    colorEnabled?: boolean;
};
export declare function ColorButtonComponent({ onClick, colorEnabled }: Props): React.JSX.Element | null;
export declare const ColorButton: import("react-redux").ConnectedComponent<typeof ColorButtonComponent, {
    onClick: any;
    colorEnabled?: boolean | undefined;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export {};
