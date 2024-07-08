import React, { Children, Component, createRef } from 'react';
import { DropdownButton } from './dropdown-button';
import { DropdownItem } from './dropdown-item';
import { DropdownMenu } from './dropdown-menu';
import { StyledDropdown, StyledDropdownItem } from './dropdown-styles';
const defaultProps = Object.freeze({
    color: 'primary',
    outline: true,
    placeholder: '',
    size: 'sm',
});
const intialState = Object.freeze({
    show: false,
    top: 0,
    left: 0,
    width: 0,
});
export class Dropdown extends Component {
    constructor() {
        super(...arguments);
        this.state = intialState;
        this.activator = createRef();
        this.dismiss = () => {
            if (this.activator.current) {
                const parent = this.getScrollableParent(this.activator.current);
                parent.removeEventListener('scroll', this.dismiss);
            }
            document.removeEventListener('click', this.dismiss);
            this.setState({ show: false });
        };
        this.select = (value) => () => {
            if (!this.props.onChange) {
                return;
            }
            this.props.onChange(value);
        };
        this.show = (event) => {
            if (!this.activator.current) {
                return;
            }
            const parent = this.getScrollableParent(this.activator.current);
            const parentBounds = parent.getBoundingClientRect();
            const activatorBounds = this.activator.current.getBoundingClientRect();
            this.setState({
                show: true,
                top: activatorBounds.top - parentBounds.top + activatorBounds.height,
                left: activatorBounds.left - parentBounds.left,
                width: activatorBounds.width,
            });
            parent.addEventListener('scroll', this.dismiss, { once: true });
            document.addEventListener('click', this.dismiss, { once: true });
            event.stopPropagation();
        };
        this.getScrollableParent = (element) => {
            const style = getComputedStyle(element);
            const isScrollable = /(auto|scroll)/.test([style.overflow, style.overflowY, style.overflowX].join(''));
            if (isScrollable) {
                return element;
            }
            const parent = element.parentElement;
            if (parent) {
                return this.getScrollableParent(parent);
            }
            return document.body;
        };
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.dismiss);
    }
    render() {
        const { color, outline, size } = this.props;
        const { show, top, left, width } = this.state;
        const selected = Children.toArray(this.props.children).find((item) => item.props.value === this.props.value);
        return (React.createElement(StyledDropdown, null,
            React.createElement(DropdownButton, { ref: this.activator, color: color, onClick: (event) => this.show(event), outline: outline, size: size }, selected ? selected.props.children : this.props.placeholder),
            show && (React.createElement(DropdownMenu, { style: { top, left, minWidth: width } }, Children.map(this.props.children, ({ props }) => this.renderItem(props))))));
    }
    renderItem(item) {
        const { size } = this.props;
        return (React.createElement(StyledDropdownItem, { size: size, onClick: this.select(item.value) }, item.children));
    }
}
Dropdown.defaultProps = defaultProps;
Dropdown.Item = DropdownItem;
//# sourceMappingURL=dropdown.js.map