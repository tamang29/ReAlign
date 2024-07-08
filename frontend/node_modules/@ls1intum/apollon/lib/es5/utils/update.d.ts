import { DeepPartial } from 'redux';
type update = <T extends object>(target: T, source: DeepPartial<T>) => T;
export declare const update: update;
export {};
