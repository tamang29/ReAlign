import React from 'react';
import { Direction } from '../../../services/uml-element/uml-element-port';
import { Point } from '../../../utils/geometry/point';
import { ClassRelationshipType } from '../../uml-class-diagram';
import { ThemedPath, ThemedPathContrast, ThemedPolyline } from '../../../components/theme/themedComponents';
const Marker = {
    Arrow: (id, color) => (React.createElement("marker", { id: id, viewBox: '0 0 30 30', markerWidth: 22, markerHeight: 30, refX: 30, refY: 15, orient: "auto", markerUnits: "strokeWidth" },
        React.createElement(ThemedPath, { d: `M0,29 L30,15 L0,1`, fillColor: "none", strokeColor: color }))),
    Rhombus: (id, color) => (React.createElement("marker", { id: id, viewBox: "0 0 30 30", markerWidth: "30", markerHeight: "30", refX: "30", refY: "15", orient: "auto", markerUnits: "strokeWidth" },
        React.createElement(ThemedPath, { d: "M0,15 L15,22 L30,15 L15,8 z", fillColor: color, strokeColor: color }))),
    RhombusFilled: (id, color) => (React.createElement("marker", { id: id, viewBox: "0 0 30 30", markerWidth: "30", markerHeight: "30", refX: "30", refY: "15", orient: "auto", markerUnits: "strokeWidth" },
        React.createElement(ThemedPathContrast, { d: "M0,15 L15,22 L30,15 L15,8 z", fillColor: color }))),
    Triangle: (id, color) => (React.createElement("marker", { id: id, viewBox: "0 0 30 30", markerWidth: "22", markerHeight: "30", refX: "30", refY: "15", orient: "auto", markerUnits: "strokeWidth" },
        React.createElement(ThemedPath, { d: "M0,1 L0,29 L30,15 z", strokeColor: color }))),
};
export const layoutTextForUMLAssociation = (location, position) => {
    switch (location) {
        case Direction.Up:
        case Direction.Topright:
        case Direction.Topleft:
            return {
                dx: position === 'TOP' ? -5 : 5,
                textAnchor: position === 'TOP' ? 'end' : 'start',
            };
        case Direction.Right:
        case Direction.Upright:
        case Direction.Downright:
            return {
                dy: position === 'TOP' ? -10 : 21,
                textAnchor: 'start',
            };
        case Direction.Down:
        case Direction.Bottomright:
        case Direction.Bottomleft:
            return {
                dx: position === 'TOP' ? -5 : 5,
                dy: 10,
                textAnchor: position === 'TOP' ? 'end' : 'start',
            };
        case Direction.Left:
        case Direction.Upleft:
        case Direction.Downleft:
            return {
                dy: position === 'TOP' ? -10 : 21,
                textAnchor: 'end',
            };
    }
};
export const computeTextPositionForUMLAssociation = (alignmentPath, hasMarker = false) => {
    const distance = hasMarker ? 31 : 8;
    if (alignmentPath.length < 2)
        return new Point();
    const vector = alignmentPath[1].subtract(alignmentPath[0]);
    return alignmentPath[0].add(vector.normalize().scale(distance));
};
export const getMarkerForTypeForUMLAssociation = (relationshipType) => {
    return ((type) => {
        switch (type) {
            case ClassRelationshipType.ClassDependency:
            case ClassRelationshipType.ClassUnidirectional:
                return Marker.Arrow;
            case ClassRelationshipType.ClassAggregation:
                return Marker.Rhombus;
            case ClassRelationshipType.ClassComposition:
                return Marker.RhombusFilled;
            case ClassRelationshipType.ClassInheritance:
            case ClassRelationshipType.ClassRealization:
                return Marker.Triangle;
        }
    })(relationshipType);
};
export const UMLAssociationComponent = ({ element }) => {
    const marker = getMarkerForTypeForUMLAssociation(element.type);
    const stroke = ((type) => {
        switch (type) {
            case ClassRelationshipType.ClassDependency:
            case ClassRelationshipType.ClassRealization:
                return 7;
        }
    })(element.type);
    const path = element.path.map((point) => new Point(point.x, point.y));
    const source = computeTextPositionForUMLAssociation(path);
    const target = computeTextPositionForUMLAssociation(path.reverse(), !!marker);
    const id = `marker-${element.id}`;
    const textFill = element.textColor ? { fill: element.textColor } : {};
    return (React.createElement("g", null,
        marker && marker(id, element.strokeColor),
        React.createElement(ThemedPolyline, { points: element.path.map((point) => `${point.x} ${point.y}`).join(','), strokeColor: element.strokeColor, fillColor: "none", strokeWidth: 1, markerEnd: `url(#${id})`, strokeDasharray: stroke }),
        React.createElement("text", { x: source.x || 0, y: source.y || 0, ...layoutTextForUMLAssociation(element.source.direction, 'BOTTOM'), pointerEvents: "none", style: { ...textFill } }, element.source.multiplicity),
        React.createElement("text", { x: target.x || 0, y: target.y || 0, ...layoutTextForUMLAssociation(element.target.direction, 'BOTTOM'), pointerEvents: "none", style: { ...textFill } }, element.target.multiplicity),
        React.createElement("text", { x: source.x || 0, y: source.y || 0, ...layoutTextForUMLAssociation(element.source.direction, 'TOP'), pointerEvents: "none", style: { ...textFill } }, element.source.role),
        React.createElement("text", { x: target.x || 0, y: target.y || 0, ...layoutTextForUMLAssociation(element.target.direction, 'TOP'), pointerEvents: "none", style: { ...textFill } }, element.target.role)));
};
//# sourceMappingURL=uml-association-component.js.map