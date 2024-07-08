import React, { HTMLAttributes, ReactNode } from 'react';
export type Props = {
    children?: ReactNode;
    placement?: 'top' | 'right' | 'bottom' | 'left';
    alignment?: 'start' | 'center' | 'end';
    position: {
        x: number;
        y: number;
    };
    maxHeight?: number;
} & HTMLAttributes<HTMLDivElement>;
export declare const Popover: React.ForwardRefExoticComponent<{
    children?: ReactNode;
    placement?: "left" | "right" | "bottom" | "top" | undefined;
    alignment?: "center" | "end" | "start" | undefined;
    position: {
        x: number;
        y: number;
    };
    maxHeight?: number | undefined;
} & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
