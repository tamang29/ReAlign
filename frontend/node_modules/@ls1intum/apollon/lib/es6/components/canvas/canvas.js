import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Point } from '../../utils/geometry/point';
import { Droppable } from '../draggable/droppable';
import { ConnectionPreview } from '../connectable/connection-preview';
import { UMLElementComponent } from '../uml-element/uml-element-component';
import { CanvasContainer } from './canvas-styles';
import { UMLRelationship } from '../../services/uml-relationship/uml-relationship';
const enhance = connect((state) => ({
    diagram: state.diagram,
    isStatic: state.editor.readonly,
    elements: state.elements,
}), null, null, { forwardRef: true });
export class CanvasComponent extends Component {
    constructor() {
        super(...arguments);
        this.layer = createRef();
        this.origin = () => {
            if (!this.layer.current) {
                return new Point();
            }
            const canvasBounds = this.layer.current.getBoundingClientRect();
            return new Point(canvasBounds.left + canvasBounds.width / 2, canvasBounds.top + canvasBounds.height / 2);
        };
        this.snap = (point) => {
            const origin = this.origin();
            return point.subtract(origin).round().add(origin);
        };
    }
    render() {
        const { elements, diagram, isStatic } = this.props;
        let minX = 0;
        let minY = 0;
        if (isStatic) {
            for (const element of Object.values(elements)) {
                if (UMLRelationship.isUMLRelationship(element)) {
                    for (const p of element.path) {
                        if (p.x < minX)
                            minX = p.x;
                        if (p.y < minY)
                            minY = p.y;
                    }
                }
            }
            minX = Math.abs(Math.round(minX));
            minY = Math.abs(Math.round(minY));
        }
        const translateCoordinate = () => {
            return 'translate(' + minX / 2 + 'px,' + minY / 2 + 'px)';
        };
        return (React.createElement(Droppable, null,
            React.createElement(CanvasContainer, { id: "modeling-editor-canvas", width: diagram.bounds.width + minX, height: diagram.bounds.height + minY, isStatic: isStatic, ref: this.layer, "data-cy": "modeling-editor-canvas" },
                React.createElement("g", { style: { transformOrigin: 'top left', transform: `${translateCoordinate()}` } }, this.layer.current && (React.createElement("svg", { x: "50%", y: "50%" },
                    diagram.ownedElements.map((element) => (React.createElement(UMLElementComponent, { key: element, id: element }))),
                    diagram.ownedRelationships.map((relationship) => (React.createElement(UMLElementComponent, { key: relationship, id: relationship }))),
                    React.createElement(ConnectionPreview, null)))))));
    }
}
export const Canvas = enhance(CanvasComponent);
//# sourceMappingURL=canvas.js.map