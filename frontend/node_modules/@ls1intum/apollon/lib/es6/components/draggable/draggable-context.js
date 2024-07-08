import React from 'react';
export const { Consumer: DraggableConsumer, Provider: DraggableProvider } = React.createContext({
    onDragStart: (event) => new Promise((_, reject) => reject()),
    onDragEnd: (owner) => (event) => {
        return;
    },
});
//# sourceMappingURL=draggable-context.js.map