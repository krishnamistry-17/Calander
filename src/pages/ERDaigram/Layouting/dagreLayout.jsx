import dagre from "dagre";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

/**
 * Automatically layout nodes with Dagre for React Flow
 * @param {Array} nodes
 * @param {Array} edges
 * @param {"TB" | "LR"} direction
 */
export const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";

  dagreGraph.setGraph({
    rankdir: direction, // LR = left→right, TB = top→bottom
    ranksep: 60, // vertical spacing
    nodesep: 40, // horizontal spacing
  });

  nodes.forEach((node) => {
    const width = node.style?.width || 180;
    const height = node.style?.height || 60;

    dagreGraph.setNode(node.id, {
      width,
      height,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    return {
      ...node,
      position: {
        x: nodeWithPosition.x - (node.style?.width || 180) / 2,
        y: nodeWithPosition.y - (node.style?.height || 60) / 2,
      },
      positionAbsolute: {
        x: nodeWithPosition.x,
        y: nodeWithPosition.y,
      },
      draggable: false,
    };
  });

  return { nodes: layoutedNodes, edges };
};
