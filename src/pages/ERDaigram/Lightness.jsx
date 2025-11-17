import { useState, useEffect } from "react";
import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";

function Lightness({ id }) {
  const { updateNodeData } = useReactFlow();

  const connections = useNodeConnections({ handleType: "target" });
  const nodesData = useNodesData(connections?.[0].source);

  const [lightness, setLightness] = useState("dark");

  useEffect(() => {
    if (nodesData.data?.value) {
      const color = nodesData.data.value;

      const isLight =
        0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b >= 128;
      setLightness(isLight ? "light" : "dark");

      const newNodeData = isLight
        ? { light: color, dark: null }
        : { light: null, dark: color };
      updateNodeData(id, newNodeData);
    } else {
      setLightness("dark");
      updateNodeData(id, { light: null, dark: { r: 0, g: 0, b: 0 } });
    }
  }, [nodesData, updateNodeData]);

  return (
    <div
      className="lightness-node"
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: 8,
        width: 120,
        height: 100,
        fontSize: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
        background: lightness === "light" ? "#fff" : "#000",
        color: lightness === "light" ? "#111827" : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Handle type="target" position={Position.Left} />
      <p
        style={{
          textAlign: "end",
          width: "100%",
          marginRight: 10,
          marginBottom: 13,
          fontWeight: 600,
        }}
      >
        Light
      </p>
      <Handle
        type="source"
        id="light"
        position={Position.Right}
        style={{ top: 25 }}
      />
      <p
        style={{
          textAlign: "end",
          width: "100%",
          marginRight: 10,
          marginTop: 6,
          fontWeight: 600,
        }}
      >
        Dark
      </p>
      <Handle
        type="source"
        id="dark"
        position={Position.Right}
        style={{ top: 75 }}
      />
    </div>
  );
}

export default Lightness;
