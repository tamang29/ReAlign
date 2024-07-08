/**
 * Merges the old state with the new state. In particular, it maintains
 * all potential prototypes, and gracefully updates owned elements list in the
 * diagram. The boundaries of the diagram are NOT updated, which is to be done, if
 * necessary, by some subsequent side-effect.
 * @param oldState
 * @param newState
 * @returns The merged state.
 */
export function merge(oldState, newState) {
    return {
        ...oldState,
        diagram: {
            ...oldState.diagram,
            ownedElements: Object.keys(newState.elements).filter((id) => !newState.elements[id].owner),
            ownedRelationships: oldState.diagram.ownedRelationships.filter((id) => !!newState.elements[id]),
        },
        elements: Object.keys(newState.elements).reduce((acc, id) => {
            return {
                ...acc,
                [id]: {
                    ...oldState.elements[id],
                    ...newState.elements[id],
                },
            };
        }, {}),
        interactive: newState.interactive,
        assessments: Object.keys(newState.assessments).reduce((acc, id) => {
            return {
                ...acc,
                [id]: {
                    ...oldState.assessments[id],
                    ...newState.assessments[id],
                },
            };
        }, {}),
    };
}
//# sourceMappingURL=merge.js.map