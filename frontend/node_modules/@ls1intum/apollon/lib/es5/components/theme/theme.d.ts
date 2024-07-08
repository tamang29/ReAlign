import React, { Component } from 'react';
import { DeepPartial } from 'redux';
import { Styles } from './styles';
declare const defaultProps: {
    styles: DeepPartial<{
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
    }>;
};
type Props = {
    children?: React.ReactChild;
} & typeof defaultProps;
export declare class Theme extends Component<Props> {
    static defaultProps: {
        styles: DeepPartial<{
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
        }>;
    };
    theme: Styles;
    render(): React.JSX.Element;
}
export {};
