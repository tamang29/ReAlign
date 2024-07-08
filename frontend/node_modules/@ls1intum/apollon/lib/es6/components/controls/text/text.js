import React from 'react';
export const Text = ({ children, fill, x = '50%', y = '50%', dominantBaseline = 'middle', textAnchor = 'middle', fontWeight = 'bold', pointerEvents = 'none', noX = false, noY = false, ...props }) => {
    const pos = {};
    if (!noX) {
        pos.x = x;
    }
    if (!noY) {
        pos.y = y;
    }
    return (React.createElement("text", { ...pos, style: fill ? { fill } : {}, dominantBaseline: dominantBaseline, textAnchor: textAnchor, fontWeight: fontWeight, pointerEvents: pointerEvents, ...props }, children));
};
//# sourceMappingURL=text.js.map