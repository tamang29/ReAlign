import React from 'react';
import { IUMLElement } from '../../services/uml-element/uml-element';
type OwnProps = {
    open: boolean;
    element: IUMLElement;
    onColorChange: (id: string, values: {
        fillColor?: string;
        textColor?: string;
        strokeColor?: string;
    }) => void;
    fillColor?: boolean;
    lineColor?: boolean;
    textColor?: boolean;
};
export declare const StylePane: React.ComponentClass<OwnProps, any>;
export {};
