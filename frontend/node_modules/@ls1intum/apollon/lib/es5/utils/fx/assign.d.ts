import { DeepPartial } from 'redux';
export declare const assign: <T extends {
    [key: string]: any;
}>(target: T, source?: DeepPartial<T>) => T;
