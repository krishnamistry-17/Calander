import { Position } from "@xyflow/react";

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};

export const initialNodes = [
  {
    id: "n1",
    data: { label: "Node 1" },
    position: { x: 0, y: 0 },
    type: "input",
  },
  {
    id: "n2",
    data: { label: "Node 2" },
    position: { x: 100, y: 100 },
  },
  {
    id: "n3",
    data: { label: "Node 3" },
    position: { x: 0, y: 0 },
  },
  {
    id: "n4",
    data: { label: "Node 4" },
    position: { x: 0, y: -100 },
  },

  {
    id: "n5",
    data: { label: "Input Node" },
    position: { x: 400, y: 400 },
    type: "input",
    style: { backgroundColor: "#1a5f7a", color: "white" },
  },
  {
    id: "n6",
    data: { label: "Process Node" },
    position: { x: 500, y: 500 },
    type: "process",
    label: "Process Node",
    style: { backgroundColor: "#ff0072", color: "white" },
  },
  {
    id: "n7",
    data: { label: "Output Node" },
    position: { x: 600, y: 600 },
    type: "output",
    style: { backgroundColor: "#1a5f7a", color: "white" },
  },
  {
    id: "a",
    data: { label: "A Node" },
    position: { x: 0, y: 0 },
  },
  {
    id: "b",
    data: { label: "B Node" },
    position: { x: 300, y: 100 },
  },
  {
    id: "c",
    data: { label: "C Node" },
    position: { x: 0, y: 200 },
  },
  {
    id: "d",
    data: { label: "D Node" },
    position: { x: 200, y: 300 },
  },
  {
    id: "1",
    data: { label: "Custom Node" },
    position: { x: 200, y: 200 },
    type: "custom",
  },
  {
    id: "2",
    data: { label: "Custom Node 2" },
    position: { x: 400, y: 400 },
    type: "custome",
  },
  {
    id: "1.1",
    data: { label: "Custom node 1.1" },
    position: { x: 500, y: 150 },
    type: "custom",
    ...nodeDefaults,
  },
  {
    id: "1.2",
    data: { label: "Custom node 1.2" },
    position: { x: 750, y: 0 },
    type: "custom",
    ...nodeDefaults,
  },
  {
    id: "1.3",
    data: { label: "Custom node 1.3" },
    position: { x: 750, y: 150 },
    type: "custom",
    ...nodeDefaults,
  },
  {
    id: "1.4",
    data: { label: "Custom node 1.4" },
    position: { x: 750, y: 300 },
    type: "custom",
    ...nodeDefaults,
  },
];
