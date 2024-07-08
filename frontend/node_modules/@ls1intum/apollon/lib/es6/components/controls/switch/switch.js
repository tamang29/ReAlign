import React, { Children, Component } from 'react';
import { SwitchItem } from './switch-item';
import { StyledSwitch, StyledSwitchItem } from './switch-styles';
const defaultProps = Object.freeze({
    color: 'primary',
    size: 'sm',
});
export class Switch extends Component {
    constructor() {
        super(...arguments);
        this.select = (value) => () => {
            if (!this.props.onChange) {
                return;
            }
            this.props.onChange(value);
        };
    }
    render() {
        return (React.createElement(StyledSwitch, null, Children.map(this.props.children, ({ props }) => this.renderItem(props))));
    }
    renderItem(item) {
        const { color, size, value } = this.props;
        return (React.createElement(StyledSwitchItem, { color: color, onClick: this.select(item.value), selected: item.value === value, size: size }, item.children));
    }
}
Switch.defaultProps = defaultProps;
Switch.Item = SwitchItem;
//# sourceMappingURL=switch.js.map