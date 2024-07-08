import React from 'react';
type Props = {
    children: React.ReactNode;
    fill?: string;
    x?: string | number;
    y?: string | number;
    dominantBaseline?: string;
    textAnchor?: string;
    fontWeight?: string;
    pointerEvents?: string;
    noX?: boolean;
    noY?: boolean;
};
export declare const Text: React.FC<Props & Record<string, any>>;
export {};
