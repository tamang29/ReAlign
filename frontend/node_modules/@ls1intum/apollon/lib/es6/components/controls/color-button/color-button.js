import React from 'react';
import { connect } from 'react-redux';
import { Button } from '../button/button';
import { RollerIcon } from '../icon/roller';
export function ColorButtonComponent({ onClick, colorEnabled }) {
    if (!colorEnabled) {
        return null;
    }
    return (React.createElement(Button, { color: "link", tabIndex: -1, onClick: onClick },
        React.createElement(RollerIcon, null)));
}
export const ColorButton = connect((state) => ({
    colorEnabled: state.editor.colorEnabled,
}))(ColorButtonComponent);
//# sourceMappingURL=color-button.js.map