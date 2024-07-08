import { HoverAction, LeaveAction } from './hoverable-types';
export declare const Hoverable: {
    /** Hover elements */
    hover: (id: string | string[]) => HoverAction;
    /** Leave elements */
    leave: (id: string | string[]) => LeaveAction;
};
