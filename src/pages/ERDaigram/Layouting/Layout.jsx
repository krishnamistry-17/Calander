import React, { useCallback, useMemo, useState } from "react";
import { Background, Controls, Panel, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
// import { layoutNodes } from "./layoutnode";
// import { forceLayoutEdges, layoutEdges } from "./layoutedge";
// import { getLayoutedElements } from "./dagreLayout";
// import { getForceLayoutedElements } from "./d3forceLayout";
// import { forceLayoutNodes } from "./layoutnode";
import ButtonComponent from "../Button";
import useStore from "../store";
import { useShallow } from "zustand/shallow";
// import ChooseColorNode from "../ChooseColorNode";
import { ComputingNodes } from "../nodes";
import { computingEdges } from "../edges";
import NumberInput from "../NumberInput";
import Lightness from "../Lightness";
import Log from "../Log";
import ColorPreview from "../ColorPreview";

// base defaults; color is derived in component via colorMode
const baseEdgeOptions = {
  animated: true,
};

let nodeId = 3;

const Selector = (state) => ({
  initialNodes: state.initialNodes,
  initialEdges: state.initialEdges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  updateNodeColor: state.updateNodeColor,
});

const nodeTypes = {
  NumberInput,
  ColorPreview,
  Lightness,
  Log,
};

const Layout = () => {
  const [variant, setVariant] = useState("cross");
  // const [direction, setDirection] = useState("TB");
  // const [edge, setEdge, onEdgesChang] = useEdgesState(subFlowEdges);
  const [colorMode, setColorMode] = useState("light");
  const {
    // initialNodes,
    // initialEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    // updateNodeColor,
  } = useStore(useShallow(Selector));

  //uses for adding a node dynamically to active it set it on button onclick event
  const addNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: { label: `Node ${id}` },
    };
    // update controlled nodes in zustand store
    const { initialNodes: currentNodes, setNodes: updateNodes } =
      useStore.getState();
    updateNodes([...(currentNodes || []), newNode]);
  }, []);

  //   const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  //     layoutNodes,
  //     layoutEdges,
  //     direction
  //   );
  //   const { nodes: forceLayoutedNodes, edges: forceLayoutedEdges } =
  //     getForceLayoutedElements(forceLayoutNodes, forceLayoutEdges, direction);

  const edgeOptions = useMemo(() => {
    const stroke = colorMode === "dark" ? "#e5e7eb" : "black";
    return {
      ...baseEdgeOptions,
      style: { stroke },
    };
  }, [colorMode]);

  const connectionStyle = useMemo(() => {
    return { stroke: colorMode === "dark" ? "#e5e7eb" : "black" };
  }, [colorMode]);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        defaultNodes={ComputingNodes}
        defaultEdges={computingEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={edgeOptions}
        connectionLineStyle={connectionStyle}
        fitView
        colorMode={colorMode}
        nodeTypes={nodeTypes}
      >
        <Background color={"skyblue"} opacity={0.4} variant={variant} />
        <Panel position="top-left">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVariant("lines")}
              className="bg-gray-300 text-white px-2 py-1 rounded-md"
            >
              Lines
            </button>
            <button
              onClick={() => setVariant("dots")}
              className="bg-gray-300 text-white px-2 py-1 rounded-md"
            >
              Dots
            </button>
            <button
              onClick={() => setVariant("cross")}
              className="bg-gray-300 text-white px-2 py-1 rounded-md"
            >
              Cross
            </button>
            {/* <button
              onClick={addNode}
              className="bg-gray-300 text-white px-2 py-1 rounded-md"
            >
              add Node
            </button>
            <button
              onClick={() => {
                updateNodeColor("a", "red");
                updateNodeColor("b", "blue");
                updateNodeColor("c", "green");
              }}
              className="bg-gray-300 text-white px-2 py-1 rounded-md"
            >
              update Node Color
            </button> */}
          </div>
        </Panel>
        {/* <Panel position="top-right">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDirection("LR")}
              className="bg-gray-300 text-white px-2 py-1 rounded-md"
            >
              Horizontal
            </button>
            <button
              onClick={() => setDirection("TB")}
              className="bg-gray-300 text-white px-2 py-1 rounded-md"
            >
              Vertical
            </button>
          </div>
        </Panel> */}
        <Panel position="top-right">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setColorMode("light")}
              className="bg-gray-300 text-white px-2 py-1 rounded-md"
            >
              Light
            </button>
            <button
              onClick={() => setColorMode("dark")}
              className="bg-gray-300 text-white px-2 py-1 rounded-md"
            >
              Dark
            </button>
          </div>
        </Panel>
        <Controls colorMode={colorMode} fitView />
        <ButtonComponent />
      </ReactFlow>
    </div>
  );
};

export default Layout;
