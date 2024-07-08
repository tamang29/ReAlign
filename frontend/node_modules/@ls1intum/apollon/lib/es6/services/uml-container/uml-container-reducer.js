import { Point } from '../../utils/geometry/point';
import { notEmpty } from '../../utils/not-empty';
import { UMLContainer } from './uml-container';
import { UMLElements } from '../../packages/uml-elements';
export const UMLContainerReducer = (state = {}, action) => {
    switch (action.type) {
        case "@@element/container/APPEND" /* UMLContainerActionTypes.APPEND */: {
            const { payload } = action;
            const container = state[payload.owner];
            const elementState = {
                ...state,
                ...(container &&
                    UMLContainer.isUMLContainer(container) && {
                    [container.id]: {
                        ...container,
                        ownedElements: [
                            ...new Set(
                            // TODO: find better solution for this
                            // hacky: create new Element of Container type to reorder children. This must be done, because js prototype is lost in redux state
                            new UMLElements[container.type]().reorderChildren([...container.ownedElements, ...payload.ids].map((id) => state[id]))),
                        ],
                    },
                }),
            };
            const reduce = (elements, id) => {
                const element = elements[id];
                let position = new Point(element.bounds.x, element.bounds.y);
                let current = element.owner && elements[element.owner];
                while (current) {
                    position = position.add(current.bounds.x, current.bounds.y);
                    current = current.owner ? elements[current.owner] : null;
                }
                current = container;
                while (current) {
                    position = position.subtract(current.bounds.x, current.bounds.y);
                    current = current.owner ? elements[current.owner] : null;
                }
                return {
                    ...elements,
                    [id]: {
                        ...elements[id],
                        owner: container ? container.id : null,
                        bounds: {
                            ...element.bounds,
                            ...position,
                        },
                    },
                };
            };
            return payload.ids.filter((id) => state[id]).reduce(reduce, elementState);
        }
        case "@@element/container/REMOVE" /* UMLContainerActionTypes.REMOVE */: {
            const { payload } = action;
            const ids = [
                ...new Set(payload.ids
                    .filter((id) => state[id] && state[id].owner)
                    .map((id) => state[id].owner)
                    .filter(notEmpty)),
            ];
            return ids.reduce((elements, id) => ({
                ...elements,
                [id]: {
                    ...state[id],
                    ownedElements: state[id].ownedElements.filter((element) => !payload.ids.includes(element)),
                },
            }), state);
        }
    }
    return state;
};
//# sourceMappingURL=uml-container-reducer.js.map