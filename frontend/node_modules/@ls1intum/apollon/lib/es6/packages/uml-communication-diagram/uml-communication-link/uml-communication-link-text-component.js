import React from 'react';
import { Text } from '../../../components/controls/text/text';
export const UmlCommunicationLinkTextComponent = ({ x, y, fill, textCentered = false, messages, directionIcon, }) => {
    const tspanProps = textCentered ? { textAnchor: 'middle' } : {};
    return (React.createElement(Text, { x: x, y: y, fontSize: "85%", textAnchor: "start", dominantBaseline: "auto", fontWeight: "normal", fill: fill },
        React.createElement("tspan", { fontWeight: "bold", fontSize: "120%", ...tspanProps }, messages.length ? directionIcon : ''),
        messages.map((message, i) => (React.createElement("tspan", { key: i, x: message.bounds.x, y: message.bounds.y }, message.name)))));
};
//# sourceMappingURL=uml-communication-link-text-component.js.map