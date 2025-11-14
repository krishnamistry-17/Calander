import React, { useCallback, useState } from "react";
import {
  addEdge,
  Background,
  Controls,
  Panel,
  ReactFlow,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
// import { layoutNodes } from "./layoutnode";
// import { forceLayoutEdges, layoutEdges } from "./layoutedge";
// import { getLayoutedElements } from "./dagreLayout";
// import { getForceLayoutedElements } from "./d3forceLayout";
// import { forceLayoutNodes } from "./layoutnode";
import { subFlowEdges } from "./layoutedge";
import { subFlowNodes } from "./layoutnode";
import ButtonComponent from "../Button";

const Layout = () => {
  const [variant, setVariant] = useState("dots");
  const [direction, setDirection] = useState("TB");
  const [edges, setEdges, onEdgesChange] = useEdgesState(subFlowEdges);
  const [colorMode, setColorMode] = useState("dark");

  const onConnect = useCallback((params) =>
    setEdges((eds) => addEdge(params, eds))
  );
  //   const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  //     layoutNodes,
  //     layoutEdges,
  //     direction
  //   );
  //   const { nodes: forceLayoutedNodes, edges: forceLayoutedEdges } =
  //     getForceLayoutedElements(forceLayoutNodes, forceLayoutEdges, direction);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={subFlowNodes}
        edges={subFlowEdges}
        fitView
        colorMode={colorMode}
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
