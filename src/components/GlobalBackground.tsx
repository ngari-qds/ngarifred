
import { ReactFlow, Background, Node, Edge, BackgroundVariant } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const GlobalBackground = () => {
  // Create more visible floating nodes for visual interest
  const nodes: Node[] = [
    {
      id: '1',
      type: 'default',
      position: { x: 100, y: 100 },
      data: { label: '' },
      draggable: false,
      selectable: false,
      style: {
        width: 12,
        height: 12,
        backgroundColor: 'hsl(var(--primary))',
        opacity: 0.3,
        border: 'none',
        borderRadius: '50%',
      },
    },
    {
      id: '2',
      type: 'default',
      position: { x: 300, y: 200 },
      data: { label: '' },
      draggable: false,
      selectable: false,
      style: {
        width: 8,
        height: 8,
        backgroundColor: 'hsl(var(--accent))',
        opacity: 0.25,
        border: 'none',
        borderRadius: '50%',
      },
    },
    {
      id: '3',
      type: 'default',
      position: { x: 500, y: 150 },
      data: { label: '' },
      draggable: false,
      selectable: false,
      style: {
        width: 6,
        height: 6,
        backgroundColor: 'hsl(var(--secondary))',
        opacity: 0.2,
        border: 'none',
        borderRadius: '50%',
      },
    },
    {
      id: '4',
      type: 'default',
      position: { x: 700, y: 300 },
      data: { label: '' },
      draggable: false,
      selectable: false,
      style: {
        width: 10,
        height: 10,
        backgroundColor: 'hsl(var(--primary))',
        opacity: 0.15,
        border: 'none',
        borderRadius: '50%',
      },
    },
    {
      id: '5',
      type: 'default',
      position: { x: 200, y: 400 },
      data: { label: '' },
      draggable: false,
      selectable: false,
      style: {
        width: 8,
        height: 8,
        backgroundColor: 'hsl(var(--accent))',
        opacity: 0.2,
        border: 'none',
        borderRadius: '50%',
      },
    },
    {
      id: '6',
      type: 'default',
      position: { x: 800, y: 50 },
      data: { label: '' },
      draggable: false,
      selectable: false,
      style: {
        width: 7,
        height: 7,
        backgroundColor: 'hsl(var(--secondary))',
        opacity: 0.18,
        border: 'none',
        borderRadius: '50%',
      },
    },
    {
      id: '7',
      type: 'default',
      position: { x: 50, y: 350 },
      data: { label: '' },
      draggable: false,
      selectable: false,
      style: {
        width: 9,
        height: 9,
        backgroundColor: 'hsl(var(--primary))',
        opacity: 0.22,
        border: 'none',
        borderRadius: '50%',
      },
    },
    {
      id: '8',
      type: 'default',
      position: { x: 450, y: 450 },
      data: { label: '' },
      draggable: false,
      selectable: false,
      style: {
        width: 5,
        height: 5,
        backgroundColor: 'hsl(var(--accent))',
        opacity: 0.15,
        border: 'none',
        borderRadius: '50%',
      },
    },
    {
      id: '9',
      type: 'default',
      position: { x: 650, y: 80 },
      data: { label: '' },
      draggable: false,
      selectable: false,
      style: {
        width: 6,
        height: 6,
        backgroundColor: 'hsl(var(--secondary))',
        opacity: 0.17,
        border: 'none',
        borderRadius: '50%',
      },
    },
    {
      id: '10',
      type: 'default',
      position: { x: 120, y: 250 },
      data: { label: '' },
      draggable: false,
      selectable: false,
      style: {
        width: 4,
        height: 4,
        backgroundColor: 'hsl(var(--primary))',
        opacity: 0.12,
        border: 'none',
        borderRadius: '50%',
      },
    },
  ];

  const edges: Edge[] = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      style: {
        stroke: 'hsl(var(--primary))',
        strokeWidth: 1,
        opacity: 0.1,
      },
      selectable: false,
    },
    {
      id: 'e2-3',
      source: '2',
      target: '3',
      style: {
        stroke: 'hsl(var(--accent))',
        strokeWidth: 1,
        opacity: 0.08,
      },
      selectable: false,
    },
    {
      id: 'e3-4',
      source: '3',
      target: '4',
      style: {
        stroke: 'hsl(var(--secondary))',
        strokeWidth: 1,
        opacity: 0.12,
      },
      selectable: false,
    },
    {
      id: 'e5-6',
      source: '5',
      target: '6',
      style: {
        stroke: 'hsl(var(--primary))',
        strokeWidth: 1,
        opacity: 0.06,
      },
      selectable: false,
    },
    {
      id: 'e7-8',
      source: '7',
      target: '8',
      style: {
        stroke: 'hsl(var(--accent))',
        strokeWidth: 1,
        opacity: 0.05,
      },
      selectable: false,
    },
    {
      id: 'e9-10',
      source: '9',
      target: '10',
      style: {
        stroke: 'hsl(var(--secondary))',
        strokeWidth: 1,
        opacity: 0.04,
      },
      selectable: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        panOnScroll={false}
        preventScrolling={false}
        style={{ 
          backgroundColor: 'transparent',
          pointerEvents: 'none',
        }}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={30}
          size={1.5}
          color="hsl(var(--primary))"
          bgColor="transparent"
          style={{
            opacity: 0.08,
          }}
        />
        <Background
          variant={BackgroundVariant.Lines}
          gap={60}
          size={1}
          color="hsl(var(--accent))"
          bgColor="transparent"
          style={{
            opacity: 0.04,
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default GlobalBackground;
