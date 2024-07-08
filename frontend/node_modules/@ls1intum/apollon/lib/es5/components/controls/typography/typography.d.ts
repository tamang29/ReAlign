import React, { HTMLAttributes } from 'react';
export declare const defaultProps: {
    gutter: boolean;
};
type Props = typeof defaultProps & HTMLAttributes<HTMLParagraphElement>;
export declare const Header: {
    (props: Props): React.JSX.Element;
    defaultProps: {
        gutter: boolean;
    };
};
export declare const Body: {
    (props: Props): React.JSX.Element;
    defaultProps: {
        gutter: boolean;
    };
};
export {};
