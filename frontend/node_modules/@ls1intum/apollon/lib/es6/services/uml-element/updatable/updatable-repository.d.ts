import { AsyncAction } from '../../../utils/actions/actions';
import { UpdateEndAction, UpdateEndAllAction } from './updatable-types';
export declare const Updatable: {
    updateStart: (id: string | string[]) => AsyncAction;
    updateEnd: (id: string | string[]) => UpdateEndAction;
    updateEndAll: () => UpdateEndAllAction;
};
