import React, { forwardRef } from 'react';
import { CanvasConsumer } from './canvas-context';
export const withCanvas = (WrappedComponent) => forwardRef((props, ref) => (React.createElement(CanvasConsumer, null, (context) => React.createElement(WrappedComponent, { ref: ref, ...props, ...context }))));
//# sourceMappingURL=with-canvas.js.map