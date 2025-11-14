import React from "react";

//no drag,no pan,no wheel
export default function CustomeNode({ props: NodeProps }) {
  return (
    <>
      <div>
        <input className="no-drag" type="range" min={0} max={100} />
        <div className="no-pan">
          <p>fixed content</p>
        </div>
        <div className="no-wheel" style={{ overflow: "auto" }}>
          <p>scrollable content</p>
        </div>
      </div>
    </>
  );
}
