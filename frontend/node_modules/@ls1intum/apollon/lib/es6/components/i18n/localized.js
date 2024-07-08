import React from 'react';
import { I18nConsumer } from './i18n-context';
export function localized(Component) {
    return function LocalizedComponent(props) {
        return React.createElement(I18nConsumer, null, (i18n) => React.createElement(Component, { ...props, ...i18n }));
    };
}
//# sourceMappingURL=localized.js.map