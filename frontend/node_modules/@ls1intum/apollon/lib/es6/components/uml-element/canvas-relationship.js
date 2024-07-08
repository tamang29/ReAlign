import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Components } from '../../packages/components';
import { ApollonMode } from '../../services/editor/editor-types';
import { Direction } from '../../services/uml-element/uml-element-port';
import { UMLRelationshipRepository } from '../../services/uml-relationship/uml-relationship-repository';
import { computeBoundingBox } from '../../utils/geometry/boundary';
import { Point } from '../../utils/geometry/point';
import { getClientEventCoordinates } from '../../utils/touch-event';
import { withTheme } from '../theme/styles';
const initialState = {
    offset: new Point(),
    handlerIndex: 0,
    path: [
        {
            x: 0,
            y: 0,
        },
    ],
};
const enhance = compose(withTheme, connect((state, props) => ({
    hovered: state.hovered[0] === props.id,
    selected: state.selected.includes(props.id),
    remoteSelectors: state.remoteSelection[props.id] || [],
    interactive: state.interactive.includes(props.id),
    interactable: state.editor.view === "Exporting" /* ApollonView.Exporting */ || state.editor.view === "Highlight" /* ApollonView.Highlight */,
    reconnecting: !!state.reconnecting[props.id],
    disabled: !!Object.keys(state.reconnecting).length || !!Object.keys(state.connecting).length,
    relationship: state.elements[props.id],
    mode: state.editor.mode,
    readonly: state.editor.readonly || false,
    selectionBoxActive: state.editor.selectionBoxActive,
}), {
    startwaypointslayout: UMLRelationshipRepository.startWaypointsLayout,
    endwaypointslayout: UMLRelationshipRepository.endWaypointsLayout,
}));
export class CanvasRelationshipComponent extends Component {
    constructor() {
        super(...arguments);
        this.state = initialState;
        this.onPointerDown = (event, handlerIndex, point) => {
            this.setState({ handlerIndex, offset: new Point(event.clientX - point.mpX, event.clientY - point.mpY) });
            document.addEventListener('pointermove', this.onPointerMove);
            document.addEventListener('pointerup', this.onPointerUp, { once: true });
        };
        this.onPointerMove = (event) => {
            const handlerIndex = this.state.handlerIndex;
            const waypointDirection = handlerIndex % 2 ? 'horizontal' : 'vertical';
            const clientEventCoordinates = getClientEventCoordinates(event);
            const x = clientEventCoordinates.clientX - this.state.offset.x;
            const y = clientEventCoordinates.clientY - this.state.offset.y;
            // Update relationship points here
            this.updateRelationshipPoints(waypointDirection, handlerIndex, x, y);
        };
        this.onPointerUp = (event) => {
            this.props.endwaypointslayout(this.props.id);
            const element = event.currentTarget;
            element.removeEventListener('pointermove', this.onPointerMove);
        };
        this.updateRelationshipPoints = (waypointDirection, handlerIndex, x, y) => {
            const startPoint = handlerIndex + 1;
            const endPoint = Number(startPoint) + 1;
            const sourceDirection = this.props.relationship.source.direction;
            switch (waypointDirection) {
                case 'horizontal':
                    sourceDirection === Direction.Up || sourceDirection === Direction.Down
                        ? this.updateXCoordinate(startPoint, endPoint, x, y)
                        : this.updateYCoordinate(startPoint, endPoint, x, y);
                    break;
                case 'vertical':
                    sourceDirection === Direction.Up || sourceDirection === Direction.Down
                        ? this.updateYCoordinate(startPoint, endPoint, x, y)
                        : this.updateXCoordinate(startPoint, endPoint, x, y);
                    break;
                default:
                    break;
            }
            const points = [new Point()];
            this.props.relationship.path.forEach((path) => {
                points.push(new Point(path.x, path.y));
            });
            const updatedBounds = computeBoundingBox(points);
            updatedBounds.x = this.props.relationship.bounds.x;
            updatedBounds.y = this.props.relationship.bounds.y;
            updatedBounds.width = Math.ceil(updatedBounds.width / 20) * 20;
            updatedBounds.height = Math.ceil(updatedBounds.height / 20) * 20;
            this.setState({ path: this.props.relationship.path });
            this.props.startwaypointslayout(this.props.id, this.props.relationship.path, updatedBounds);
        };
        this.updateXCoordinate = (startPoint, endPoint, x, y) => {
            this.props.relationship.path[startPoint].x = x;
            this.props.relationship.path[endPoint].x = x;
        };
        this.updateYCoordinate = (startPoint, endPoint, x, y) => {
            this.props.relationship.path[startPoint].y = y;
            this.props.relationship.path[endPoint].y = y;
        };
    }
    render() {
        const { hovered, selected, remoteSelectors, interactive, interactable, reconnecting, disabled, relationship, children, theme, mode, readonly, startwaypointslayout, endwaypointslayout, selectionBoxActive, ...props } = this.props;
        // increase relationship hit box in assessment mode
        const STROKE = mode === ApollonMode.Assessment ? 35 : 15;
        const ChildComponent = Components[relationship.type];
        const points = relationship.path.map((point) => `${point.x} ${point.y}`).join(',');
        const midPoints = [];
        relationship.path.map((point, index) => {
            const mpX = (relationship.path[index].x + relationship.path[index + 1]?.x) / 2;
            const mpY = (relationship.path[index].y + relationship.path[index + 1]?.y) / 2;
            if (!isNaN(mpX) && !isNaN(mpY))
                midPoints.push({ mpX, mpY });
        });
        midPoints.pop();
        midPoints.shift();
        const highlight = interactable && interactive
            ? theme.interactive.normal
            : interactable && hovered
                ? theme.interactive.hovered
                : hovered || selected
                    ? 'rgba(0, 100, 255, 0.2)'
                    : relationship.highlight
                        ? relationship.highlight
                        : 'rgba(0, 100, 255, 0)';
        return (React.createElement("svg", { ...props, ...relationship.bounds, visibility: reconnecting ? 'hidden' : undefined, pointerEvents: disabled ? 'none' : 'stroke' },
            React.createElement("polyline", { points: points, stroke: highlight, fill: "none", strokeWidth: STROKE }),
            remoteSelectors.length > 0 &&
                remoteSelectors.map((selector) => (React.createElement("polyline", { key: selector.name, points: points, stroke: selector.color, strokeOpacity: "0.2", strokeWidth: STROKE, fill: "none" }))),
            React.createElement(ChildComponent, { element: UMLRelationshipRepository.get(relationship) }),
            children,
            midPoints.map((point, index) => {
                return (React.createElement("circle", { visibility: selectionBoxActive || interactive || interactable || readonly ? 'hidden' : undefined, pointerEvents: selectionBoxActive || interactive || interactable || readonly ? 'none' : 'all', style: { cursor: 'grab' }, key: props.id + '_' + point.mpX + '_' + point.mpY, cx: point.mpX, cy: point.mpY, r: "15", onPointerDown: (e) => {
                        this.onPointerDown(e, index, point);
                    }, fill: highlight }));
            })));
    }
}
export const CanvasRelationship = enhance(CanvasRelationshipComponent);
//# sourceMappingURL=canvas-relationship.js.map