import React from 'react';
import { Direction } from '../../../services/uml-element/uml-element-port';
import { Point } from '../../../utils/geometry/point';
import { UmlCommunicationLinkTextComponent } from './uml-communication-link-text-component';
import { ThemedPolyline } from '../../../components/theme/themedComponents';
export const UMLCommunicationLinkComponent = ({ element }) => {
    const sources = element.messages.filter((message) => message.direction === 'source');
    const targets = element.messages.filter((message) => message.direction === 'target');
    let position = { x: 0, y: 0 };
    let direction = Direction.Left;
    // maps element.path to Point to get methods
    // element.path contains start and end point + direction change points
    const path = element.path.map((point) => new Point(point.x, point.y));
    // half distance of total connection
    let distance = path.reduce((length, point, i, points) => (i + 1 < points.length ? length + points[i + 1].subtract(point).length : length), 0) / 2;
    // finds the connection between two points of path where half distance of total connection is reached
    // and determines the direction of the path there
    for (let index = 0; index < path.length - 1; index++) {
        // distance between two path points
        const vector = path[index + 1].subtract(path[index]);
        if (vector.length > distance) {
            const norm = vector.normalize();
            direction =
                Math.abs(norm.x) > Math.abs(norm.y)
                    ? norm.x > 0
                        ? Direction.Left
                        : Direction.Right
                    : norm.y > 0
                        ? Direction.Up
                        : Direction.Down;
            position = path[index].add(norm.scale(distance));
            break;
        }
        distance -= vector.length;
    }
    return (React.createElement("g", null,
        {
            [Direction.Up]: (React.createElement(React.Fragment, null,
                React.createElement(UmlCommunicationLinkTextComponent, { x: position.x + 8, y: position.y, fill: element.textColor, directionIcon: "\u2193", messages: sources }),
                React.createElement(UmlCommunicationLinkTextComponent, { x: position.x - 16, y: position.y, fill: element.textColor, directionIcon: "\u2191", messages: targets }))),
            [Direction.Right]: (React.createElement(React.Fragment, null,
                React.createElement(UmlCommunicationLinkTextComponent, { x: position.x, y: position.y, fill: element.textColor, directionIcon: "\u27F6", messages: targets, textCentered: true }),
                React.createElement(UmlCommunicationLinkTextComponent, { x: position.x, y: position.y + 16, fill: element.textColor, directionIcon: "\u27F5", messages: sources, textCentered: true }))),
            [Direction.Down]: (React.createElement(React.Fragment, null,
                React.createElement(UmlCommunicationLinkTextComponent, { x: position.x + 8, y: position.y, fill: element.textColor, directionIcon: "\u2193", messages: targets }),
                React.createElement(UmlCommunicationLinkTextComponent, { x: position.x - 16, y: position.y, fill: element.textColor, directionIcon: "\u2191", messages: sources }))),
            [Direction.Left]: (React.createElement(React.Fragment, null,
                React.createElement(UmlCommunicationLinkTextComponent, { x: position.x, y: position.y, fill: element.textColor, directionIcon: "\u27F6", messages: sources, textCentered: true }),
                React.createElement(UmlCommunicationLinkTextComponent, { x: position.x, y: position.y + 16, fill: element.textColor, directionIcon: "\u27F5", messages: targets, textCentered: true }))),
        }[direction],
        React.createElement(ThemedPolyline, { points: element.path.map((point) => `${point.x} ${point.y}`).join(','), strokeColor: element.strokeColor, fillColor: "none", strokeWidth: 1 })));
};
//# sourceMappingURL=uml-communication-link-component.js.map