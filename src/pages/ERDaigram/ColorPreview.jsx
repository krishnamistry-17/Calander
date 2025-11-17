import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import React, { useEffect } from "react";

function CustomeHandle({ id, label, onChange }) {
  const connections = useNodeConnections({
    handleType: "target",
    handleId: id,
  });

  const nodeData = useNodesData(connections?.[0].source);

  useEffect(() => {
    onChange(nodeData?.data ? nodeData?.data?.value : 0);
  }, [nodeData]);

  return (
    <div>
      <Handle
        type="target"
        position={Position.Left}
        id={id}
        className="handle"
      />
      <label htmlFor="red" className="label">
        {label}
      </label>
    </div>
  );
}

const ColorPreview = ({ id, data }) => {
  const { updateNodeData } = useReactFlow();
  // derive safe color values
  const current = (data && data.value) || { r: 0, g: 0, b: 0 };
  const rr = Number.isFinite(current.r) ? Number(current.r) : 0;
  const gg = Number.isFinite(current.g) ? Number(current.g) : 0;
  const bb = Number.isFinite(current.b) ? Number(current.b) : 0;

  // Accept hex color from a ChooseColorNode connected to handle "color"
  const colorConn = useNodeConnections({
    handleType: "target",
    handleId: "color",
  });
  const colorNode = useNodesData(colorConn?.[0]?.source);
  useEffect(() => {
    const hex = colorNode?.data?.color;
    if (typeof hex === "string" && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) {
      const full =
        hex.length === 4
          ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
          : hex;
      const r = parseInt(full.slice(1, 3), 16);
      const g = parseInt(full.slice(3, 5), 16);
      const b = parseInt(full.slice(5, 7), 16);
      updateNodeData(id, { value: { r, g, b } });
    }
  }, [colorNode, id, updateNodeData]);
  return (
    <div
      className="node"
      style={{
        backgroundColor: `rgb(${rr}, ${gg}, ${bb})`,
        color: "white",
        width: 180,
        height: 140,
        borderRadius: 10,
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
        position: "relative",
        padding: 13,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* hex color input from ChooseColorNode */}
      <Handle
        type="target"
        position={Position.Left}
        id="color"
        style={{ top: "50%" }}
      />
      <CustomeHandle
        id="red"
        label="R"
        onChange={(value) => {
          updateNodeData(id, (node) => {
            const prev = (node && node.data && node.data.value) || {
              r: 0,
              g: 0,
              b: 0,
            };
            return { value: { ...prev, r: Number(value) } };
          });
        }}
      />
      <CustomeHandle
        id="green"
        label="G"
        onChange={(value) => {
          updateNodeData(id, (node) => {
            const prev = (node && node.data && node.data.value) || {
              r: 0,
              g: 0,
              b: 0,
            };
            return { value: { ...prev, g: Number(value) } };
          });
        }}
      />
      <CustomeHandle
        id="blue"
        label="B"
        onChange={(value) => {
          updateNodeData(id, (node) => {
            const prev = (node && node.data && node.data.value) || {
              r: 0,
              g: 0,
              b: 0,
            };
            return { value: { ...prev, b: Number(value) } };
          });
        }}
      />
      <Handle type="source" position={Position.Right} id="output" />
    </div>
  );
};

export default ColorPreview;
