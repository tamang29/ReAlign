import { DeselectAction, SelectAction } from './interactable-types';
export declare const Interactable: {
    makeInteractive: (id: string) => SelectAction;
    unmakeInteractive: (id: string) => DeselectAction;
};
