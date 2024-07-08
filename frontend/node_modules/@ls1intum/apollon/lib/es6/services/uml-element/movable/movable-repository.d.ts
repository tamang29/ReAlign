import { AsyncAction } from '../../../utils/actions/actions';
export declare const Movable: {
    startMoving: (id?: string | string[]) => AsyncAction;
    move: (delta: {
        x: number;
        y: number;
    }, id?: string | string[]) => AsyncAction;
    endMoving: (id?: string | string[], keyboard?: boolean) => AsyncAction;
};
