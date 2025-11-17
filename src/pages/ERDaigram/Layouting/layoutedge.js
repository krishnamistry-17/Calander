export const layoutEdges = [
  { id: "e12", source: "1", target: "2", animated: true },
  { id: "e13", source: "1", target: "3", animated: true },
  { id: "e22a", source: "2", target: "2a", animated: true },
  { id: "e22b", source: "2", target: "2b", animated: true },
  { id: "e22c", source: "2", target: "2c", animated: true },
  { id: "e2c2d", source: "2c", target: "2d", animated: true },
  { id: "e33a", source: "3", target: "3a", animated: true },
];

export const forceLayoutEdges = [
  { id: "ea", source: "a", target: "b" },
  { id: "eb1", source: "b", target: "b1" },
  { id: "eb2", source: "b", target: "b2" },
];

export const subFlowEdges = [
  // Edges must connect to nodes with handles. Group nodes don't have handles.
  // Connect children instead of groups to visualize subflow relations.
  // { id: "eA1_B1", source: "A-1", target: "B-1", animated: true },
  // { id: "eA2_B2", source: "A-2", target: "B-2", animated: true },
  // { id: "eB3_C", source: "B-3", target: "C", animated: true },
  { id: "eA1_A2", source: "A-1", target: "A-2" },
  { id: "eA2_B", source: "A-2", target: "B", animated: true },
  { id: "eA2_C", source: "A-2", target: "C", animated: true },
  { id: "eB1_B2", source: "B-1", target: "B-2" },
  { id: "eB1_B3", source: "B-1", target: "B-3" },
];

export const uncontrolledFlowEdges = [{ id: "e12", source: "1", target: "2" }];
