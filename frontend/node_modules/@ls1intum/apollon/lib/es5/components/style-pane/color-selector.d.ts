import React from 'react';
type Props = {
    color?: string;
    onColorChange: (hex: string | undefined) => void;
    open: boolean;
    key: string;
};
export declare function ColorSelector({ onColorChange, color, open, key }: Props): React.JSX.Element | null;
export {};
