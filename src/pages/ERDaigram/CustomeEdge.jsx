import { BaseEdge, EdgeLabelRenderer, getStraightPath } from "@xyflow/react";

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  markerEnd,
  style,
  label,
  data,
}) {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
      {label || data?.label ? (
        <EdgeLabelRenderer>
          <div>{label || data?.label}</div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  );
}

export default CustomEdge;
