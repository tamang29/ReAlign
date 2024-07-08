import { AsyncAction } from '../../../utils/actions/actions';
export declare const Selectable: {
    select: (id?: string | string[], overwrite?: boolean) => AsyncAction;
    deselect: (id?: string | string[]) => AsyncAction;
};
