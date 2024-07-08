import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Color, Size } from '../../theme/styles';
export declare const defaultProps: Readonly<{
    block: boolean;
    color: Color | "link";
    disabled: boolean;
    outline: boolean;
    size: Size;
}>;
export type Props = {
    children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> & Partial<typeof defaultProps>;
export declare const Button: import("react").ForwardRefExoticComponent<{
    children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement> & Partial<Readonly<{
    block: boolean;
    color: Color | "link";
    disabled: boolean;
    outline: boolean;
    size: Size;
}>> & import("react").RefAttributes<HTMLButtonElement>>;
