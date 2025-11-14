import { BaseEdge } from "@xyflow/react";
import React from "react";

const SignEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
  const centerX = (sourceX + targetX) / 2;
  const centerY = (sourceY + targetY) / 2;

  const edgePath = `
  M ${sourceX} ${sourceY} 
  Q ${(targetX - sourceX) * 0.2 + sourceX} ${
    targetY * 1.1
  } ${centerX} ${centerY}
  Q ${(targetX - sourceX) * 0.8 + sourceX} ${
    sourceY * 0.9
  } ${targetX} ${targetY}
  `;

  return <BaseEdge id={id} path={edgePath} />;
};

export default SignEdge;
