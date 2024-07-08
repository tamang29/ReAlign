import React from 'react';
import ReactFlow from 'reactflow'; // Import useStoreState if needed
import 'reactflow/dist/style.css';

const CustomReactFlow = ({ nodes, edges }) => {
  // If ReactFlow uses any hooks internally, ensure they are used correctly here
  
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow nodes={nodes} edges={edges} />
    </div>
  );
};

export default CustomReactFlow;
