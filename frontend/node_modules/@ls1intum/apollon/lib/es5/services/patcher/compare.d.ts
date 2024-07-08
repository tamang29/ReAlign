import { Patch } from './patcher-types';
/**
 * Compares two objects and returns the difference
 * in the form of a [JSON patch](http://jsonpatch.com/)
 */
export declare function compare<T>(a: T, b: T): Patch;
