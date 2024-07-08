import React, { Component } from 'react';
import { defaults } from '../components/theme/styles';
import { Components } from '../packages/components';
import { UMLElements } from '../packages/uml-elements';
import { UMLRelationships } from '../packages/uml-relationships';
import { UMLContainer } from '../services/uml-container/uml-container';
import { UMLRelationship } from '../services/uml-relationship/uml-relationship';
import { computeBoundingBoxForElements } from '../utils/geometry/boundary';
import { Point } from '../utils/geometry/point';
import { update } from '../utils/update';
import { Style } from './svg-styles';
import { StoreProvider } from '../components/store/model-store';
import { ModelState } from '../components/store/model-state';
import { ThemeProvider } from 'styled-components';
import { UMLClassifierComponent } from '../packages/common/uml-classifier/uml-classifier-component';
import { UMLClassifierMemberComponent } from '../packages/common/uml-classifier/uml-classifier-member-component';
const includeChildren = (elements, ids, include) => {
    const result = new Set();
    for (const id of ids) {
        const element = elements[id];
        if (!element)
            continue;
        const children = new Set(UMLContainer.isUMLContainer(element) ? element.ownedElements : []);
        if (include.has(id)) {
            result.add(id);
            include = new Set([...include, ...children]);
        }
        includeChildren(elements, children, include).forEach(result.add, result);
    }
    return result;
};
const excludeChildren = (elements, ids, exclude) => {
    const result = new Set();
    for (const id of ids) {
        const element = elements[id];
        if (!element)
            continue;
        const children = new Set(UMLContainer.isUMLContainer(element) ? element.ownedElements : []);
        if (!exclude.has(id)) {
            result.add(id);
        }
        else {
            exclude = new Set([...exclude, ...children]);
        }
        excludeChildren(elements, children, exclude).forEach(result.add, result);
    }
    return result;
};
const getInitialState = ({ model, options }) => {
    const layer = {
        layer: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
        origin: () => new Point(),
    };
    const apollonElements = model.elements;
    const apollonRelationships = model.relationships;
    const deserialize = (apollonElement) => {
        const element = new UMLElements[apollonElement.type]();
        const apollonChildren = UMLContainer.isUMLContainer(element)
            ? Object.values(apollonElements).filter((child) => child.owner === apollonElement.id)
            : [];
        element.deserialize(apollonElement, apollonChildren);
        const children = apollonChildren.reduce((acc, val) => [...acc, ...deserialize(val)], []);
        const [root, ...updates] = element.render(layer, children, true);
        updates.map((x) => {
            const original = apollonChildren.find((y) => y.id === x.id);
            if (!original) {
                return x;
            }
            x.bounds.x = original.bounds.x;
            x.bounds.y = original.bounds.y;
            return x;
        });
        return [root, ...updates];
    };
    const elements = Object.values(apollonElements)
        .filter((element) => !element.owner)
        .reduce((acc, val) => [...acc, ...deserialize(val)], []);
    const relationships = Object.values(apollonRelationships).map((apollonRelationship) => {
        const relationship = new UMLRelationships[apollonRelationship.type]();
        relationship.deserialize(apollonRelationship);
        return relationship;
    });
    const elementState = [...elements, ...relationships].reduce((acc, val) => ({ ...acc, [val.id]: val }), {});
    const roots = Object.values(elementState).filter((element) => !element.owner);
    let layout = new Set(Object.values(elementState).map((x) => x.id));
    if (options && options.include) {
        layout = includeChildren(elementState, new Set(roots.map((element) => element.id)), new Set(options.include));
    }
    if (options && options.exclude) {
        layout = excludeChildren(elementState, new Set(roots.map((element) => element.id)), new Set(options.exclude));
    }
    const keepOriginalSize = (options && options.keepOriginalSize) || false;
    const bounds = computeBoundingBoxForElements(Object.values(elementState).filter((element) => keepOriginalSize || layout.has(element.id)));
    const margin = getMargin(options?.margin);
    bounds.x -= margin.left;
    bounds.y -= margin.top;
    bounds.width += margin.left + margin.right;
    bounds.height += margin.top + margin.bottom;
    const state = Object.values(elementState)
        .filter((element) => layout.has(element.id))
        .map((element) => {
        element.bounds.x -= bounds.x;
        element.bounds.y -= bounds.y;
        return element;
    });
    return {
        elements: state,
        bounds,
    };
};
const getMargin = (margin = 15) => {
    if (typeof margin === 'number') {
        return { top: margin, right: margin, bottom: margin, left: margin };
    }
    const result = { top: 0, right: 0, bottom: 0, left: 0 };
    return Object.assign(result, margin);
};
export class Svg extends Component {
    constructor() {
        super(...arguments);
        this.state = getInitialState(this.props);
    }
    render() {
        const { bounds, elements } = this.state;
        const theme = update(defaults(), this.props.styles || {});
        // connect exported svg to redux state, so that connected components can retrieve properties from state
        const state = ModelState.fromModel(this.props.model);
        const translationFactor = () => {
            let minX = 0;
            let minY = 0;
            for (const element of elements) {
                if (UMLRelationship.isUMLRelationship(element)) {
                    for (const p of element.path) {
                        if (p.x < minX)
                            minX = p.x + element.bounds.x - 15;
                        if (p.y < minY)
                            minY = p.y + element.bounds.y - 15;
                    }
                }
            }
            return { minX: Math.min(minX, 0), minY: Math.min(minY, 0) };
        };
        const svgElementDetails = (element, x, y) => {
            return {
                x,
                y,
                width: element.bounds.width,
                height: element.bounds.height,
                className: element.name ? element.name.replace(/[<>]/g, '') : '',
                fill: element.fillColor || theme.color.background,
            };
        };
        const tfact = translationFactor();
        return (React.createElement(StoreProvider, { initialState: state },
            React.createElement(ThemeProvider, { theme: theme },
                React.createElement("svg", { width: bounds.width - tfact.minX + 1, height: bounds.height - tfact.minY + 1, xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", fill: theme.color.background },
                    React.createElement("defs", null,
                        React.createElement("style", null, Style[0]({ theme }))),
                    elements.map((element, index) => {
                        const ElementComponent = Components[element.type];
                        switch (ElementComponent) {
                            case UMLClassifierComponent:
                                // If the ElementComponent is of type UMLClassifierComponent, create an array of all members (attributes and methods) for that component.
                                // Unlike other components, the UMLClassifierComponent needs its members to be children within the component to avoid border rendering issues.
                                const members = elements.filter((member) => member.owner === element.id);
                                return (React.createElement("svg", { key: element.id, ...svgElementDetails(element, element.bounds.x - tfact.minX, element.bounds.y - tfact.minY) },
                                    React.createElement(ElementComponent, { key: index, element: element }, members.map((memberElement, memberIndex) => {
                                        // Nest the members within the UMLClassifierComponent so the border rectangle and path get rendered afterward.
                                        const MemberElementComponent = Components[memberElement.type];
                                        return (React.createElement("svg", { key: memberElement.id, ...svgElementDetails(memberElement, 0, memberElement.bounds.y - element.bounds.y) },
                                            React.createElement(MemberElementComponent, { key: memberIndex, element: memberElement })));
                                    }))));
                            case UMLClassifierMemberComponent:
                                // If the ElementComponent is of type UMLClassifierMemberComponent, we break out of the switch, as they have been rendered within the UMLClassifierComponent.
                                break;
                            default:
                                // Render all other UMLElements and UMLRelationships normally, as they don't have issues when rendering to SVG.
                                return (React.createElement("svg", { key: element.id, ...svgElementDetails(element, element.bounds.x - tfact.minX, element.bounds.y - tfact.minY) },
                                    React.createElement(ElementComponent, { key: index, element: element })));
                        }
                    })))));
    }
}
//# sourceMappingURL=svg.js.map