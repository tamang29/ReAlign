import React, { Component, ReactElement } from 'react';
import { Color, Size } from '../../theme/styles';
import { Props as ItemProps } from './switch-item';
import { SwitchItemProps } from './switch-styles';
declare const defaultProps: Readonly<{
    color: Color;
    size: Size;
}>;
type Props<T> = {
    children: ReactElement<ItemProps<T>> | ReactElement<ItemProps<T>>[];
    onChange?: (value: T) => void;
    value: T;
} & typeof defaultProps;
export declare class Switch<T> extends Component<Props<T>> {
    static defaultProps: Readonly<{
        color: Color;
        size: Size;
    }>;
    static Item: <T_1>(props: ItemProps<T_1>) => null;
    render(): React.JSX.Element;
    renderItem(item: ItemProps<T>): ReactElement<SwitchItemProps>;
    private select;
}
export {};
