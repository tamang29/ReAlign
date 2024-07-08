export declare const StyledButton: import("styled-components").StyledComponent<"button", {
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
}, Readonly<{
    block: boolean;
    color: import("../../theme/styles").Color | "link";
    disabled: boolean;
    outline: boolean;
    size: import("../../theme/styles").Size;
}>, never>;
