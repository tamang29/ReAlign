import React, { Component } from 'react';
import de from '../../i18n/de.json';
import en from '../../i18n/en.json';
import { Locale } from '../../services/editor/editor-types';
import { I18nProvider as Provider } from './i18n-context';
const defaultLocale = Locale.en;
const dictionary = {
    [Locale.de]: de,
    [Locale.en]: en,
};
export class I18nProvider extends Component {
    constructor() {
        super(...arguments);
        this.translate = (key) => {
            try {
                let translations = dictionary[this.props.locale];
                let translation = key.split('.').reduce((result, current) => result[current], translations);
                if (!translation) {
                    translations = dictionary[defaultLocale];
                    translation = key.split('.').reduce((result, current) => result[current], translations);
                }
                return translation;
            }
            catch (error) {
                // tslint:disable-next-line:no-console
                console.error(error);
                return '';
            }
        };
    }
    render() {
        const value = {
            translate: this.translate,
        };
        return React.createElement(Provider, { value: value }, this.props.children);
    }
}
I18nProvider.defaultProps = {
    locale: defaultLocale,
};
//# sourceMappingURL=i18n-provider.js.map