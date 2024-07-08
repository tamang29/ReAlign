import React from 'react';
export interface FloatingButtonProps {
    style?: React.CSSProperties | undefined;
    children?: React.ReactNode;
    onClick?: () => void;
}
export declare const FloatingButton: React.FC<FloatingButtonProps>;
