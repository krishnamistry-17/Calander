export const initialEdges = [
  {
    id: "n1-n2",
    source: "n1",
    target: "n2",
    label: "connects with",
    type: "step",
  },
  {
    id: "n3-n4",
    source: "n3",
    target: "n4",
    label: "Custom Edge",
    type: "custom-edge",
  },
  {
    id: "n5-n6",
    source: "n5",
    target: "n6",
  },
  {
    id: "n6-n7",
    source: "n6",
    target: "n7",
    animated: true,
  },
  {
    id: "a-b",
    source: "a",
    target: "b",
    type: "step",
  },
  {
    id: "c-d",
    source: "c",
    target: "d",
    type: "sign",
  },
  {
    id: "1-2",
    source: "1",
    target: "2",
    type: "custome",
  },
  {
    id: "1.1-1.2",
    source: "1.1",
    target: "1.2",
    animated: true,
  },
  {
    id: "1.1-1.3",
    source: "1.1",
    target: "1.3",
  },
  {
    id: "1.1-1.4",
    source: "1.1",
    target: "1.4",
  },
];

export const edges = [
  {
    id: "a-b",
    source: "a",
    target: "b",
    type: "step",
  },
  {
    id: "b-c",
    source: "b",
    target: "c",
    type: "step",
  },
];

export const computingEdges = [
  { id: "1-color", source: "1", target: "color", targetHandle: "red" },
  { id: "2-color", source: "2", target: "color", targetHandle: "green" },
  { id: "3-color", source: "3", target: "color", targetHandle: "blue" },
  {
    id: "color-lightness",
    source: "color",
    target: "lightness",
  },
  {
    id: "lightness-log-1",
    source: "lightness",
    sourceHandle: "light",
    target: "log-1",
  },
  {
    id: "lightness-log-2",
    source: "lightness",
    sourceHandle: "dark",
    target: "log-2",
  },
];
