import { defaultProps } from './typography';
type Props = {
    variant: 'header' | 'body';
} & typeof defaultProps;
export declare const Typography: import("styled-components").StyledComponent<"p", {
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
}, Props, never>;
export {};
