import { UMLElement } from '../../services/uml-element/uml-element';
import { UMLElementState } from '../../services/uml-element/uml-element-types';
export declare function filterRoots(ids: string[], elements: UMLElementState): string[];
/**
 * returns the ids of all elements in the hierarchy above the element with the specified id
 * @param id element id which parents should be found
 * @param elements elements in state
 */
export declare function getAllParents(id: string, elements: UMLElementState): string[];
export declare function getChildren(ids: string[], elements: UMLElementState): string[];
export declare function clone(element: UMLElement, elements: UMLElement[]): UMLElement[];
