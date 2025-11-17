import { nodes } from "./nodes";
import { edges } from "./edges";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { create } from "zustand";

const isColorChooser = (node) => node.type === "colorChooser";

const useStore = create((set, get) => ({
  initialNodes: nodes,
  initialEdges: edges,
  onNodesChange: (changes) => {
    set({
      initialNodes: applyNodeChanges(changes, get().initialNodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      initialEdges: applyEdgeChanges(changes, get().initialEdges),
    });
  },
  onConnect: (connection) => {
    set({
      initialEdges: addEdge(connection, get().initialEdges),
    });
  },
  setNodes: (nodes) => set({ initialNodes: nodes }),
  setEdges: (edges) => set({ initialEdges: edges }),
  updateNodeColor: (nodeId, color) => {
    if (isColorChooser(get().initialNodes.find((node) => node.id === nodeId))) {
      set({
        initialNodes: get().initialNodes.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, color: color } }
            : node
        ),
      });
    }
  },
}));

export default useStore;
