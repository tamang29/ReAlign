import React from 'react';
import { Typography } from './typography-styles';
export const defaultProps = {
    gutter: true,
};
export const Header = (props) => React.createElement(Typography, { variant: "header", as: "h1", ...props });
Header.defaultProps = defaultProps;
export const Body = (props) => {
    const { gutter, ...typographyProps } = props;
    return React.createElement(Typography, { variant: "body", as: "span", gutter: false, ...typographyProps });
};
Body.defaultProps = {
    gutter: false,
};
//# sourceMappingURL=typography.js.map