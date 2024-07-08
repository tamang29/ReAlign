import React, { ComponentType } from 'react';
import { I18nContext } from './i18n-context';
export declare function localized<P extends I18nContext>(Component: ComponentType<P>): (props: Pick<P, Exclude<keyof P, keyof I18nContext>>) => React.JSX.Element;
