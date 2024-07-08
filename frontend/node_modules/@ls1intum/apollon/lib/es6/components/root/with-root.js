import React, { forwardRef } from 'react';
import { RootConsumer } from './root-context';
export const withRoot = (WrappedComponent) => forwardRef((props, ref) => (React.createElement(RootConsumer, null, (context) => React.createElement(WrappedComponent, { ref: ref, ...props, ...context }))));
//# sourceMappingURL=with-root.js.map