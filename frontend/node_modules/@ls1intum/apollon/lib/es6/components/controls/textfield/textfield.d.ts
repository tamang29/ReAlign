import React, { Component, InputHTMLAttributes } from 'react';
import { Size } from '../../theme/styles';
export declare const defaultProps: Readonly<{
    block: boolean;
    gutter: boolean;
    multiline: boolean;
    outline: boolean;
    readonly: boolean;
    size: Size;
    enterToSubmit: boolean;
}>;
type TextfieldValue = string | number;
type Props<T extends TextfieldValue> = {
    onChange?: (value: T) => void;
    onSubmit?: (value: T) => void;
    onSubmitKeyUp?: (key: 'Escape' | 'Enter', value: T) => void;
    placeholder?: string;
    value: T;
    enterToSubmit?: boolean;
} & Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'onSubmit' | 'value' | 'size'> & typeof defaultProps;
type State<T extends TextfieldValue> = {
    key: number;
    currentValue?: T;
};
export declare class Textfield<T extends TextfieldValue> extends Component<Props<T>, State<T>> {
    static defaultProps: Readonly<{
        block: boolean;
        gutter: boolean;
        multiline: boolean;
        outline: boolean;
        readonly: boolean;
        size: Size;
        enterToSubmit: boolean;
    }>;
    state: {
        key: number;
        currentValue: undefined;
    };
    ref: React.RefObject<HTMLTextAreaElement>;
    componentDidUpdate(prevProps: Readonly<Props<T>>, prevState: Readonly<State<T>>, snapshot?: any): void;
    componentWillUnmount(): void;
    render(): React.JSX.Element;
    focus(): void;
    private onBlur;
    private onChange;
    private onKeyUp;
    private onSubmitKeyUp;
}
export {};
