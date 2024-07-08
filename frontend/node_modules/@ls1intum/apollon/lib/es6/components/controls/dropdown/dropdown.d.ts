import React, { Component, ReactElement } from 'react';
import { Color, Size } from '../../theme/styles';
import { Props as ItemProps } from './dropdown-item';
import { DropdownItemProps } from './dropdown-styles';
declare const defaultProps: Readonly<{
    color: Color;
    outline: boolean;
    placeholder: "";
    size: Size;
}>;
declare const intialState: Readonly<{
    show: boolean;
    top: number;
    left: number;
    width: number;
}>;
export type Props<T> = {
    children: ReactElement<ItemProps<T>> | ReactElement<ItemProps<T>>[];
    onChange?: (value: T) => void;
    value: T;
} & typeof defaultProps;
type State = typeof intialState;
export declare class Dropdown<T> extends Component<Props<T>, State> {
    static defaultProps: Readonly<{
        color: Color;
        outline: boolean;
        placeholder: "";
        size: Size;
    }>;
    static Item: <T_1>(props: ItemProps<T_1>) => null;
    state: Readonly<{
        show: boolean;
        top: number;
        left: number;
        width: number;
    }>;
    activator: React.RefObject<HTMLButtonElement>;
    componentWillUnmount(): void;
    render(): React.JSX.Element;
    renderItem(item: ItemProps<T>): ReactElement<DropdownItemProps>;
    private dismiss;
    private select;
    private show;
    private getScrollableParent;
}
export {};
