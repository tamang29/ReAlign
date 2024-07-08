import React, { Component } from 'react';
import { StyledTextfield } from './textfield-styled';
export const defaultProps = Object.freeze({
    block: true,
    gutter: false,
    multiline: false,
    outline: false,
    readonly: false,
    size: 'sm',
    enterToSubmit: true,
});
const getInitialState = () => ({
    key: Date.now(),
    currentValue: undefined,
});
export class Textfield extends Component {
    constructor() {
        super(...arguments);
        this.state = getInitialState();
        this.ref = React.createRef();
        this.onBlur = ({ currentTarget }) => {
            const value = typeof this.props.value === 'number' ? +currentTarget.value : currentTarget.value;
            if (!value || !this.props.onSubmit) {
                return;
            }
            this.props.onSubmit(value);
            this.setState(getInitialState());
        };
        this.onChange = ({ currentTarget }) => {
            const value = typeof this.props.value === 'number' ? +currentTarget.value : currentTarget.value;
            this.setState({ currentValue: value });
            if (!this.props.onChange) {
                return;
            }
            this.props.onChange(value);
        };
        this.onKeyUp = ({ key, currentTarget }) => {
            const value = typeof this.props.value === 'number' ? +currentTarget.value : currentTarget.value;
            switch (key) {
                case 'Enter':
                    if (this.props.enterToSubmit) {
                        currentTarget.blur();
                        this.onSubmitKeyUp(key, value);
                    }
                    break;
                case 'Escape':
                    currentTarget.blur();
                    this.onSubmitKeyUp(key, value);
                    break;
                default:
            }
        };
        this.onSubmitKeyUp = (key, value) => {
            if (!this.props.onSubmitKeyUp) {
                return;
            }
            if (key === 'Enter' && !this.props.enterToSubmit) {
                return;
            }
            this.props.onSubmitKeyUp(key, value);
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // workaround for infinity values -> if set to infinity -> change key of component to avoid problems with textfield
        if (Number.isFinite(prevProps.value) && !Number.isFinite(this.props.value)) {
            this.setState({ key: Date.now() });
        }
    }
    componentWillUnmount() {
        if (!this.state.currentValue || !this.props.onSubmit) {
            return;
        }
        this.props.onSubmit(this.state.currentValue);
    }
    render() {
        const { onChange, onSubmit, onSubmitKeyUp, size, value, ...props } = this.props;
        return (React.createElement(StyledTextfield, { as: props.multiline ? 'textarea' : 'input', maxLength: props.multiline ? undefined : 100, key: this.state.key, ...props, size: size, defaultValue: value, onChange: this.onChange, onKeyUp: this.onKeyUp, onBlur: this.onBlur, ref: this.ref }));
    }
    focus() {
        if (this.ref.current) {
            this.ref.current.focus();
        }
    }
}
Textfield.defaultProps = defaultProps;
//# sourceMappingURL=textfield.js.map