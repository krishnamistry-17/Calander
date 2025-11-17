export const layoutNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "input" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    data: { label: "node 2" },
    position: { x: 0, y: 100 },
  },
  {
    id: "2a",
    data: { label: "node 2a" },
    position: { x: 0, y: 200 },
  },
  {
    id: "2b",
    data: { label: "node 2b" },
    position: { x: 0, y: 300 },
  },
  {
    id: "2c",
    data: { label: "node 2c" },
    position: { x: 0, y: 400 },
  },
  {
    id: "2d",
    data: { label: "node 2d" },
    position: { x: 0, y: 500 },
  },
  {
    id: "3",
    data: { label: "node 3" },
    position: { x: 200, y: 100 },
  },
  {
    id: "3a",
    data: { label: "node 3a" },
    position: { x: 200, y: 200 },
  },
];

export const forceLayoutNodes = [
  {
    id: "a",
    data: { label: "force node a" },
    position: { x: 0, y: 0 },
  },
  {
    id: "b",
    data: { label: "force node b" },
    position: { x: 0, y: 100 },
  },
  {
    id: "b1",
    data: { label: "force node b1" },
    position: { x: 0, y: 200 },
  },
  {
    id: "b2",
    data: { label: "force node b2" },
    position: { x: 0, y: 300 },
  },
];

export const subFlowNodes = [
  {
    id: "A",
    type: "group",
    position: { x: 0, y: 0 },
    style: {
      width: 170,
      height: 140,
    },
  },
  {
    id: "A-1",
    type: "input",
    data: { label: "Child Node 1" },
    position: { x: 10, y: 10 },
    parentId: "A",
    extent: "parent",
  },
  {
    id: "A-2",
    data: { label: "Child Node 2" },
    position: { x: 10, y: 90 },
    parentId: "A",
    extent: "parent",
  },
  {
    id: "B",
    type: "output",
    position: { x: -100, y: 200 },
    data: null,
    style: {
      width: 170,
      height: 140,
      backgroundColor: "rgba(240,240,240,0.25)",
      margin: "5px",
    },
  },
  {
    id: "B-1",
    data: { label: "Child 1" },
    position: { x: 50, y: 10 },
    parentId: "B",
    extent: "parent",
    draggable: false,
    style: {
      width: 60,
    },
  },
  {
    id: "B-2",
    data: { label: "Child 2" },
    position: { x: 10, y: 90 },
    parentId: "B",
    extent: "parent",
    draggable: false,
    style: {
      width: 60,
    },
  },
  {
    id: "B-3",
    data: { label: "Child 3" },
    position: { x: 100, y: 90 },
    parentId: "B",
    extent: "parent",
    draggable: false,
    style: {
      width: 60,
    },
  },
  {
    id: "C",
    type: "output",
    position: { x: 100, y: 200 },
    data: { label: "Node C" },
  },
];

export const uncontrolledFlowNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 255, y: 25 },
  },
  {
    id: "2",
    data: { label: "Node 2" },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Node 3" },
    position: { x: 250, y: 250 },
  },
];
