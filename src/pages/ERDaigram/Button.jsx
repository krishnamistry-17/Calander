import React from "react";
import { useStoreApi, useReactFlow, Panel } from "@xyflow/react";

const panelStyle = {
  color: "#777",
  fontSize: 12,
};

const buttonStyle = {
  fontSize: 12,
  marginRight: 5,
  marginTop: 5,
};

export default function ButtonComponent() {
  const store = useStoreApi();
  const { zoomIn, zoomOut, setCenter } = useReactFlow();

  const focusNode = () => {
    const { nodeLookup } = store.getState();
    const nodes = Array.from(nodeLookup).map(([, node]) => node);

    if (nodes.length > 0) {
      const node = nodes[0];

      const x = node.position.x + node.measured.width / 2;
      const y = node.position.y + node.measured.height / 2;
      const zoom = 1.85;

      setCenter(x, y, { zoom, duration: 1000 });
    }
  };

  return (
    <Panel position="bottom-right" style={panelStyle}>
      <div className="description">
        This is an example of how to use the zoom pan helper hook
      </div>
      <div>
        <button
          className="bg-gray-300 text-white px-2 py-1 rounded-md"
          onClick={focusNode}
          style={buttonStyle}
        >
          focus node
        </button>
        <button
          className="bg-gray-300 text-white px-2 py-1 rounded-md"
          onClick={zoomIn}
          style={buttonStyle}
        >
          zoom in
        </button>
        <button
          className="bg-gray-300 text-white px-2 py-1 rounded-md"
          onClick={zoomOut}
          style={buttonStyle}
        >
          zoom out
        </button>
      </div>
    </Panel>
  );
}
