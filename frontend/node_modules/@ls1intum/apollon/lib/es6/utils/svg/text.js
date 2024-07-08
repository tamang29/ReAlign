export class Text {
}
Text.size = (layer, value, styles) => {
    const svg = layer.layer;
    if (!svg) {
        return { width: 0, height: 0 };
    }
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    Object.assign(text.style, {
        ...styles,
        visibility: 'hidden',
    });
    text.appendChild(document.createTextNode(value));
    svg.appendChild(text);
    const bounds = text.getBBox();
    svg.removeChild(text);
    return { width: bounds.width, height: bounds.height };
};
//# sourceMappingURL=text.js.map