import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { update } from '../../utils/update';
import { defaults } from './styles';
const defaultProps = {
    styles: {},
};
export class Theme extends Component {
    constructor() {
        super(...arguments);
        this.theme = update(defaults(), this.props.styles);
    }
    render() {
        return React.createElement(ThemeProvider, { theme: this.theme }, this.props.children);
    }
}
Theme.defaultProps = defaultProps;
//# sourceMappingURL=theme.js.map