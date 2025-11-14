import { BaseEdge } from "@xyflow/react";
import React from "react";

const StepEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
  const centerY = (sourceY + targetY) / 2;

  const edgePath = `M ${sourceX} ${sourceY} L ${sourceX} ${centerY} L ${targetX} ${centerY} L ${targetX} ${targetY}`;
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
    </>
  );
};

export default StepEdge;
