import { Patch, PatchAction } from './patcher-types';
export declare const PatcherRepository: {
    /**
     * Creates an action representing impoprting a patch.
     * @param patch The patch to import.
     */
    patch: (patch: Patch) => PatchAction;
};
