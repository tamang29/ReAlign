import React, { Component } from 'react';
import { Locale } from '../../services/editor/editor-types';
type Props = {
    locale: Locale;
    children?: React.ReactNode;
};
export declare class I18nProvider extends Component<Props> {
    static defaultProps: {
        locale: Locale;
    };
    render(): React.JSX.Element;
    private translate;
}
export {};
