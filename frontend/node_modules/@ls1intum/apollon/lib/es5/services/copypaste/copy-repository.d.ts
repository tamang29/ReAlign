import { AsyncAction } from '../../utils/actions/actions';
export declare class CopyRepository {
    /**
     * Counts how often paste commands are executed to set offset
     */
    static pasteCounter: number;
    static copy: (id?: string | string[]) => AsyncAction;
    static paste: () => AsyncAction;
    private static transformElementsForCopy;
    private static transformRelationshipsForCopy;
}
