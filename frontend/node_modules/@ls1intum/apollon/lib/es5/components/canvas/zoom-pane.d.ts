import React, { FunctionComponent } from 'react';
type Props = {
    min?: number;
    max?: number;
    step?: number;
    value: number;
    onChange: (value: number) => void;
    style?: React.CSSProperties | undefined;
};
export declare const ZoomPaneComponent: FunctionComponent<Props>;
export declare const ZoomPane: React.FunctionComponent<Props>;
export {};
