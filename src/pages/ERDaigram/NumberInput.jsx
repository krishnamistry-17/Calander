import { useCallback, useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

function NumberInput({ id, data }) {
  const { updateNodeData } = useReactFlow();
  const [number, setNumber] = useState(data.value);

  const onChange = useCallback(
    (evt) => {
      const raw = Number(evt.target.value);
      const cappedNumber = Math.min(255, Math.max(0, isNaN(raw) ? 0 : raw));
      setNumber(cappedNumber);
      updateNodeData(id, { value: cappedNumber });
      console.log("cappedNumber", cappedNumber);
    },
    [id, updateNodeData]
  );

  return (
    <div
      className="number-input"
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: 10,
        width: 110,
        boxShadow: "0 2px 8px rgba(0,0,0,.06)",
        fontSize: 12,
        color: "#111827",
      }}
    >
      <div style={{ marginBottom: 6, fontSize: 12 }}>{data.label}</div>
      <input
        style={{
          backgroundColor: "#fff",
          color: "#111827",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: "6px 8px",
          width: "100%",
        }}
        id={`number-${id}`}
        name="number"
        type="number"
        min="0"
        max="255"
        onChange={onChange}
        className="nodrag"
        value={number}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default NumberInput;
