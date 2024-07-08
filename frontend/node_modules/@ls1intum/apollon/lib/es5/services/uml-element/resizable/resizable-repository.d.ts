import { AsyncAction } from '../../../utils/actions/actions';
import { ResizeFrom } from '../uml-element';
export declare const Resizable: {
    startResizing: (id?: string | string[]) => AsyncAction;
    resize: (delta: {
        width: number;
        height: number;
    }, resizeFrom: ResizeFrom, id?: string | string[]) => AsyncAction;
    endResizing: (id?: string | string[]) => AsyncAction;
};
