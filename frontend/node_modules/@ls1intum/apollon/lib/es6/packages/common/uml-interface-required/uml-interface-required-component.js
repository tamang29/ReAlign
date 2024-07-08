import React from 'react';
import { connect } from 'react-redux';
import { UMLInterfaceRequired } from './uml-interface-required';
import { Direction, getOppositeDirection } from '../../../services/uml-element/uml-element-port';
import { Point } from '../../../utils/geometry/point';
import { REQUIRED_INTERFACE_MARKER_SIZE } from './uml-interface-requires-constants';
import { ThemedPath, ThemedPolyline } from '../../../components/theme/themedComponents';
const enhance = connect((state, props) => {
    // filter all UMLInterfaceRequired
    const requiredInterfaces = state.diagram.ownedRelationships
        .map((relationshipId) => state.elements[relationshipId])
        .filter((relationship) => UMLInterfaceRequired.isUMLInterfaceRequired(relationship))
        .map((relationship) => relationship);
    // check if any other UMLInterfaceRequired has the same target as this element and if the direction of the UMLInterfaceRequired is the opposite
    return {
        hasOppositeRequiredInterface: requiredInterfaces
            .filter((element) => element.id !== props.element.id)
            .some((otherRequiredInterface) => otherRequiredInterface.target.element === props.element.target.element &&
            otherRequiredInterface.target.direction.valueOf() ===
                getOppositeDirection(props.element.target.direction).valueOf()),
        currentRequiredInterfaces: requiredInterfaces.filter((element) => element.target.element === props.element.target.element),
        currentAllInterfaces: state.diagram.ownedRelationships
            .map((relationshipId) => state.elements[relationshipId])
            .filter((element) => element.target.element === props.element.target.element),
    };
}, {});
const UMLInterfaceRequiredC = (props) => {
    const { element, hasOppositeRequiredInterface, currentRequiredInterfaces, currentAllInterfaces } = props;
    // offset for last point in paragraph, so that line ends at marker
    let offset;
    switch (element.target.direction) {
        case Direction.Up:
            offset = new Point(0, -3);
            break;
        case Direction.Down:
            offset = new Point(0, 3);
            break;
        case Direction.Right:
            offset = new Point(3, 0);
            break;
        case Direction.Left:
            offset = new Point(-3, 0);
            break;
    }
    const calculatePath = () => {
        let path = '';
        switch (currentRequiredInterfaces.length) {
            case 1:
                path =
                    currentAllInterfaces.length === currentRequiredInterfaces.length
                        ? "M 13 -13.5 a 1 1 0 0 0 0 27" /* REQUIRED_INTERFACE_MARKER_TYPE.Semicircle */
                        : "M 8 -12.5 C -3.5 -7.5 -3.3 7.9 8 12.5" /* REQUIRED_INTERFACE_MARKER_TYPE.Threequarterscircle */;
                break;
            case 2:
                path = hasOppositeRequiredInterface
                    ? "M 8 -12.5 C -3.5 -7.5 -3.3 7.9 8 12.5" /* REQUIRED_INTERFACE_MARKER_TYPE.Threequarterscircle */
                    : "M 2 -7.8 C -1.5 -3 -1.2 3.4 2 7.8" /* REQUIRED_INTERFACE_MARKER_TYPE.Quartercircle */;
                break;
            default:
                path = "M 2 -7.8 C -1.5 -3 -1.2 3.4 2 7.8" /* REQUIRED_INTERFACE_MARKER_TYPE.Quartercircle */;
                break;
        }
        return path;
    };
    return (React.createElement("g", null,
        React.createElement("marker", { id: `marker-${element.id}`, viewBox: `0 0 ${REQUIRED_INTERFACE_MARKER_SIZE} ${REQUIRED_INTERFACE_MARKER_SIZE}`, markerWidth: REQUIRED_INTERFACE_MARKER_SIZE, markerHeight: REQUIRED_INTERFACE_MARKER_SIZE, refX: "0", refY: "0", orient: "auto", markerUnits: "strokeWidth" },
            React.createElement(ThemedPath, { d: calculatePath(), fillColor: "none", strokeColor: element.strokeColor, strokeWidth: 2 })),
        React.createElement(ThemedPolyline, { points: element.path
                .map((point, index) => {
                if (index === element.path.length - 1) {
                    point = new Point(point.x, point.y).add(offset);
                }
                return `${point.x} ${point.y}`;
            })
                .join(','), strokeColor: element.strokeColor, fillColor: "none", strokeWidth: 1.0, markerEnd: `url(#marker-${element.id})` })));
};
export const UMLInterfaceRequiredComponent = enhance(UMLInterfaceRequiredC);
//# sourceMappingURL=uml-interface-required-component.js.map