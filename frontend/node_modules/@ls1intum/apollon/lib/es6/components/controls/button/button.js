import { createElement, forwardRef } from 'react';
import { StyledButton } from './button-styles';
export const defaultProps = Object.freeze({
    block: false,
    color: 'secondary',
    disabled: false,
    outline: false,
    size: 'sm',
});
export const Button = forwardRef((props, ref) => createElement(StyledButton, { ...props, ref }));
Button.defaultProps = defaultProps;
//# sourceMappingURL=button.js.map