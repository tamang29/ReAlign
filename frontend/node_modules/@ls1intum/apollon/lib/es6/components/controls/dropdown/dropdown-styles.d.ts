/// <reference types="react" />
export declare const StyledDropdown: import("styled-components").StyledComponent<"div", {
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
}, {}, never>;
export type DropdownItemProps = {};
export declare const StyledDropdownItem: import("styled-components").StyledComponent<import("react").ForwardRefExoticComponent<{
    children?: import("react").ReactNode;
} & import("react").ButtonHTMLAttributes<HTMLButtonElement> & Partial<Readonly<{
    block: boolean;
    color: import("../../theme/styles").Color | "link";
    disabled: boolean;
    outline: boolean;
    size: import("../../theme/styles").Size;
}>> & import("react").RefAttributes<HTMLButtonElement>>, {
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
}, DropdownItemProps, never>;
