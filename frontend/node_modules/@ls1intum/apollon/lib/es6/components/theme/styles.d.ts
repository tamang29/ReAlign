import { ThemedCssFunction, ThemedStyledInterface } from 'styled-components';
export { withTheme } from 'styled-components';
export type Styles = typeof apollonTheme;
export declare const styled: ThemedStyledInterface<{
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
export declare const css: ThemedCssFunction<{
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
export type withThemeProps = {
    theme: Styles;
};
export type Color = 'primary' | 'secondary';
export type Size = 'sm' | 'md' | 'lg';
declare const apollonTheme: {
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
};
export declare const defaults: () => {
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
};
