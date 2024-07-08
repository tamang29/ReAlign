/// <reference types="react" />
export type I18nContext = {
    translate: (key: string) => string;
};
export declare const I18nProvider: import("react").Provider<I18nContext | null>, I18nConsumer: import("react").Consumer<I18nContext | null>;
