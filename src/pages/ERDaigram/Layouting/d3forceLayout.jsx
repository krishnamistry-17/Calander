import * as d3 from "d3-force";

/**
 * Layout nodes using d3-force for React Flow
 * @param {Array} nodes
 * @param {Array} edges
 * @param {Object} options
 */
export const getForceLayoutedElements = (nodes, edges, options = {}) => {
  const {
    width = 800,
    height = 600,
    charge = -400,
    linkDistance = 150,
    collideRadius = 60,
    iterations = 200,
  } = options;

  const simNodes = nodes.map((n) => ({ ...n, x: 0, y: 0 }));
  const simEdges = edges.map((e) => ({
    source: e.source,
    target: e.target,
  }));

  const simulation = d3
    .forceSimulation(simNodes)
    .force(
      "link",
      d3
        .forceLink(simEdges)
        .id((d) => d.id)
        .distance(linkDistance)
    )
    .force("charge", d3.forceManyBody().strength(charge))
    .force("collision", d3.forceCollide().radius(collideRadius))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .stop();

  simulation.tick(iterations);

  const layoutedNodes = nodes.map((node) => {
    const simNode = simNodes.find((n) => n.id === node.id);

    return {
      ...node,
      position: { x: simNode.x, y: simNode.y },
      positionAbsolute: { x: simNode.x, y: simNode.y },
    };
  });

  return { nodes: layoutedNodes, edges };
};
