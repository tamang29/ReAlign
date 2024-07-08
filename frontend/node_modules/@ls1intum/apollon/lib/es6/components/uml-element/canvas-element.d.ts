import React, { ComponentClass, SVGProps } from 'react';
import { UMLElementComponentProps } from './uml-element-component-props';
type OwnProps = {
    child?: ComponentClass<UMLElementComponentProps>;
} & UMLElementComponentProps & SVGProps<SVGSVGElement>;
export declare const CanvasElement: React.ComponentClass<OwnProps, any>;
export {};
