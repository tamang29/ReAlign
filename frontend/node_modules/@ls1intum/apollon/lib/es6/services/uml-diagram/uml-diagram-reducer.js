import { UMLDiagram } from './uml-diagram';
export const UMLDiagramReducer = (state = new UMLDiagram(), action) => {
    switch (action.type) {
        case "@@element/diagram/APPEND" /* UMLDiagramActionTypes.APPEND */: {
            const { payload } = action;
            return {
                ...state,
                ownedRelationships: [...new Set([...payload.ids, ...state.ownedRelationships])].reverse(),
            };
        }
        case "@@element/container/APPEND" /* UMLContainerActionTypes.APPEND */: {
            const { payload } = action;
            if (state.id !== payload.owner) {
                return {
                    ...state,
                    ownedElements: state.ownedElements.filter((id) => !payload.ids.includes(id)),
                };
            }
            return {
                ...state,
                ownedElements: [...new Set([...state.ownedElements, ...payload.ids])],
            };
        }
        case "@@element/diagram/BRING_TO_FRONT" /* UMLDiagramActionTypes.BRING_TO_FRONT */: {
            const { ids } = action.payload;
            // order in svg 1.2 is defined by rendering order -> change rendering order to draw one element in front of another
            return {
                ...state,
                ownedElements: [...state.ownedElements].filter((id) => !ids.includes(id)).concat(ids),
            };
        }
        case "@@element/container/REMOVE" /* UMLContainerActionTypes.REMOVE */: {
            const { payload } = action;
            return {
                ...state,
                ownedElements: state.ownedElements.filter((id) => !payload.ids.includes(id)),
                ownedRelationships: state.ownedRelationships.filter((id) => !payload.ids.includes(id)),
            };
        }
        case "@@element/resizable/RESIZE" /* ResizingActionTypes.RESIZE */: {
            const { payload } = action;
            if (!payload.ids.includes(state.id)) {
                break;
            }
            return {
                ...state,
                bounds: {
                    ...state.bounds,
                    width: state.bounds.width + payload.delta.width,
                    height: state.bounds.height + payload.delta.height,
                },
                resizeFrom: payload.resizeFrom,
            };
        }
    }
    return state;
};
//# sourceMappingURL=uml-diagram-reducer.js.map