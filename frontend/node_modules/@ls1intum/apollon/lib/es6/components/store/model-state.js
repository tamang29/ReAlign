import { UMLElements } from '../../packages/uml-elements';
import { UMLRelationships } from '../../packages/uml-relationships';
import { UMLContainer } from '../../services/uml-container/uml-container';
import { UMLElement } from '../../services/uml-element/uml-element';
import { UMLElementRepository } from '../../services/uml-element/uml-element-repository';
import { UMLRelationship } from '../../services/uml-relationship/uml-relationship';
import { UMLRelationshipRepository } from '../../services/uml-relationship/uml-relationship-repository';
import { backwardsCompatibleModel } from '../../compat';
import { UMLDiagram } from '../../services/uml-diagram/uml-diagram';
import { arrayToInclusionMap, inclusionMapToArray } from './util';
// TODO: simplify this code, break it into smaller pieces.
// FIXME: this code has issues in various cases, including when
//        the boundary of the diagram is determined by some relationship.
export class ModelState {
    static fromModel(compatModel) {
        const model = backwardsCompatibleModel(compatModel);
        const apollonElements = model.elements;
        const apollonRelationships = model.relationships;
        const deserialize = (apollonElement) => {
            const element = new UMLElements[apollonElement.type]();
            const children = UMLContainer.isUMLContainer(element)
                ? Object.values(apollonElements)
                    .filter((child) => child.owner === apollonElement.id)
                    .map((val) => {
                    const parent = apollonElements[val.owner];
                    return {
                        ...val,
                        bounds: { ...val.bounds, x: val.bounds.x - parent.bounds.x, y: val.bounds.y - parent.bounds.y },
                    };
                })
                : [];
            element.deserialize(apollonElement, children);
            return [element, ...children.reduce((acc, val) => [...acc, ...deserialize(val)], [])];
        };
        const elements = Object.values(apollonElements)
            .filter((element) => !element.owner)
            .reduce((acc, val) => [...acc, ...deserialize(val)], []);
        const relationships = Object.values(apollonRelationships).map((apollonRelationship) => {
            const relationship = new UMLRelationships[apollonRelationship.type]();
            relationship.deserialize(apollonRelationship);
            return relationship;
        });
        // set diagram to keep diagram type
        const diagram = new UMLDiagram();
        diagram.type = model.type;
        diagram.ownedRelationships = Object.values(model.relationships).map((s) => {
            return s.id;
        });
        return {
            diagram,
            interactive: [
                ...inclusionMapToArray(model.interactive.elements),
                ...inclusionMapToArray(model.interactive.relationships),
            ],
            elements: [...elements, ...relationships].reduce((acc, val) => ({ ...acc, [val.id]: { ...val } }), {}),
            assessments: (Object.values(model.assessments) || []).reduce((acc, val) => ({
                ...acc,
                [val.modelElementId]: {
                    score: val.score,
                    feedback: val.feedback,
                    label: val.label,
                    labelColor: val.labelColor,
                    correctionStatus: val.correctionStatus,
                    dropInfo: val.dropInfo,
                },
            }), {}),
        };
    }
    static toModel(state) {
        const elements = Object.values(state.elements)
            .map((element) => UMLElementRepository.get(element))
            .reduce((acc, val) => ({ ...acc, ...(val && { [val.id]: val }) }), {});
        const relationships = Object.values(state.elements)
            .filter((x) => UMLRelationship.isUMLRelationship(x))
            .map((relationship) => UMLRelationshipRepository.get(relationship));
        const serialize = (element) => {
            const children = UMLContainer.isUMLContainer(element)
                ? element.ownedElements.map((id) => elements[id])
                : [];
            const res = {
                [element.id]: element.serialize(children),
            };
            for (const child of children) {
                const childres = serialize(child);
                Object.values(childres).forEach((child) => {
                    child.bounds.x += element.bounds.x;
                    child.bounds.y += element.bounds.y;
                });
                Object.assign(res, childres);
            }
            return res;
        };
        const apollonElements = Object.values(elements)
            .filter((element) => !element.owner)
            .reduce((acc, element) => ({ ...acc, ...serialize(element) }), {});
        const apollonElementsArray = Object.values(apollonElements);
        const apollonRelationships = relationships.map((relationship) => relationship.serialize());
        const interactive = {
            elements: arrayToInclusionMap(state.interactive.filter((id) => UMLElement.isUMLElement(state.elements[id]))),
            relationships: arrayToInclusionMap(state.interactive.filter((id) => UMLRelationship.isUMLRelationship(state.elements[id]))),
        };
        const assessments = Object.fromEntries(Object.entries(state.assessments).map(([id, assessment]) => [
            id,
            {
                modelElementId: id,
                elementType: state.elements[id].type,
                score: state.assessments[id].score,
                feedback: state.assessments[id].feedback,
                label: state.assessments[id].label,
                labelColor: state.assessments[id].labelColor,
                correctionStatus: state.assessments[id].correctionStatus,
                dropInfo: state.assessments[id].dropInfo,
            },
        ]));
        return {
            version: '3.0.0',
            type: state.diagram.type,
            size: { width: state.diagram.bounds.width, height: state.diagram.bounds.height },
            interactive,
            elements: apollonElements,
            relationships: Object.fromEntries(apollonRelationships.map((relationship) => [relationship.id, relationship])),
            assessments,
        };
    }
}
//# sourceMappingURL=model-state.js.map