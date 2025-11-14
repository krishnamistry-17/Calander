// import React, { useCallback, useState } from "react";
// import {
//   addEdge,
//   Background,
//   Controls,
//   ReactFlow,
//   useNodesState,
//   useEdgesState,
//   Panel,
//   StepEdge,
// } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import { initialNodes } from "./nodes";
// import { initialEdges } from "./edges";
// import CustomEdge from "./CustomeEdge";
// import "@xyflow/react/dist/style.css";
// import SignEdge from "./SignEdge";
// import CustomeNode from "./CustomeNode";

// const ERDaigram = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//   const [variant, setVariant] = useState("lines");
//   const [colorMode, setColorMode] = useState("light");
//   const [activeTab, setActiveTab] = useState("demo");

//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     []
//   );

//   const nodeColor = (node) => {
//     if (node.type === "input") return "#1a5f7a";
//     if (node.type === "process") return "#ff0072";
//     if (node.type === "output") return "#1a5f7a";
//     return "#1a5f7a";
//   };

//   const EdgeTypes = {
//     "custom-edge": CustomEdge,
//     sign: SignEdge,
//     step: StepEdge,
//     custome: CustomeNode,
//   };

//   return (
//     <div style={{ width: "100%", height: "100vh" }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         defaultEdgeOptions={{ type: "step" }}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         fitView
//         edgeTypes={EdgeTypes}
//         colorMode={colorMode}
//       >
//         <Background color="skyblue" variant={variant} />
//         <Panel position="top-left">
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setVariant("cross")}
//               className="bg-blue-500 text-white px-2 py-1 rounded-md"
//             >
//               Cross
//             </button>
//             <button
//               onClick={() => setVariant("lines")}
//               className="bg-blue-500 text-white px-2 py-1 rounded-md"
//             >
//               Line
//             </button>
//             <button
//               onClick={() => setVariant("dots")}
//               className="bg-blue-500 text-white px-2 py-1 rounded-md"
//             >
//               Dots
//             </button>
//           </div>
//         </Panel>
//         <Panel position="top-right">
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setColorMode("light")}
//               className={`${
//                 colorMode === "light"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-500 text-white"
//               } px-2 py-1 rounded-md`}
//             >
//               Light
//             </button>
//             <button
//               className={`${
//                 colorMode === "dark"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-500 text-white"
//               } px-2 py-1 rounded-md`}
//               onClick={() => setColorMode("dark")}
//             >
//               Dark
//             </button>
//           </div>
//         </Panel>
//         <Controls />

//         {/* <MiniMap nodeColor={nodeColor} zoomable pannable /> */}
//       </ReactFlow>
//     </div>
//   );
// };

// export default ERDaigram;

import React from "react";
import Layout from "./Layouting/Layout";

const ERDaigram = () => {
  return (
    <div>
      <Layout />
    </div>
  );
};

export default ERDaigram;
