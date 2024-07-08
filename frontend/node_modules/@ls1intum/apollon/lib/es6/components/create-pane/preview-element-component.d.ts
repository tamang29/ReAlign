import React, { Component } from 'react';
import { UMLElement } from '../../services/uml-element/uml-element';
type Props = {
    element: UMLElement;
    create: (element: UMLElement, owner?: string) => void;
    scale?: number;
};
export declare const Preview: import("styled-components").StyledComponent<import("react-redux").ConnectedComponent<React.ComponentType<import("../uml-element/uml-element-component-props").UMLElementComponentProps & {
    cannotBeHovered: boolean;
} & {
    hover: (id: string | string[]) => import("../../services/uml-element/hoverable/hoverable-types").HoverAction;
    leave: (id: string | string[]) => import("../../services/uml-element/hoverable/hoverable-types").LeaveAction;
}>, import("../uml-element/uml-element-component-props").UMLElementComponentProps>, {
    color: {
        primary: string;
        secondary: string;
        warningYellow: string;
        background: string;
        backgroundVariant: string;
        grid: string;
        primaryContrast: string;
        gray: string;
        grayAccent: string;
    };
    font: {
        color: string;
        family: string;
        size: number;
    };
    interactive: {
        normal: string;
        hovered: string;
    };
}, {
    child: React.ComponentClass<{
        child?: React.ComponentClass<import("../uml-element/uml-element-component-props").UMLElementComponentProps, any> | undefined;
    } & import("../uml-element/uml-element-component-props").UMLElementComponentProps & React.SVGProps<SVGSVGElement>, any>;
    scale: number | undefined;
}, "scale" | "child">;
export declare class PreviewElementComponent extends Component<Props> {
    render(): React.JSX.Element;
    private onDrop;
}
export {};
