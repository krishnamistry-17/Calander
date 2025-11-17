import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";

function Log({ data }) {
  const connections = useNodeConnections({ handleType: "target" });
  const nodeData = useNodesData(connections?.[0].source);

  const color = nodeData?.data
    ? nodeData?.data[connections?.[0].sourceHandle]
    : null;
  const isDark = connections?.[0]?.sourceHandle === "dark";

  return (
    <div
      style={{
        backgroundColor: color
          ? `rgb(${color.r}, ${color.g}, ${color.b})`
          : "#fff",
        color: isDark ? "#fff" : "#111827",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: 12,
        width: 140,
        height: 90,
        boxShadow: "0 4px 12px rgba(0,0,0,.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
      }}
    >
      {color
        ? isDark
          ? "Use white font"
          : "use black font"
        : "use black font"}
      <Handle type="target" position={Position.Left} />
    </div>
  );
}

export default Log;
