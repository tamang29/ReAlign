import React, { forwardRef } from 'react';
import { Arrow, PopoverBody, PopoverContainer } from './popover-styles';
export const Popover = forwardRef(({ children, placement = 'right', alignment = 'center', maxHeight, ...props }, ref) => (React.createElement(PopoverContainer, { ref: ref, placement: placement, alignment: alignment, ...props },
    React.createElement(Arrow, { placement: placement, alignment: alignment }),
    React.createElement(PopoverBody, { maxHeight: maxHeight }, children))));
//# sourceMappingURL=popover.js.map