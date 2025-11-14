import { render, screen } from "@testing-library/react";
import { ReactFlow, ReactFlowProvider } from "@xyflow/react";
import ButtonComponent from "../src/pages/ERDaigram/Button";

describe("Button", () => {
  test("renders the button component", () => {
    render(
      <div style={{ width: 400, height: 300 }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={[
              { id: "n1", position: { x: 0, y: 0 }, data: { label: "n1" } },
            ]}
            edges={[]}
          >
            <ButtonComponent />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    );
    const button = screen.getByRole("button", { name: /focus node/i });
    expect(button).toBeInTheDocument();
  });

  test("focus node buttton should be rendered", () => {
    render(
      <div style={{ width: 400, height: 300 }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={[
              { id: "n1", position: { x: 0, y: 0 }, data: { label: "n1" } },
            ]}
            edges={[]}
          >
            <ButtonComponent />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    );
    const button = screen.getByRole("button", { name: /focus node/i });
    expect(button).toBeInTheDocument();
  });

  test("zoom in and zoom out buttons should be rendered", () => {
    render(
      <div style={{ width: 400, height: 300 }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={[
              { id: "n1", position: { x: 0, y: 0 }, data: { label: "n1" } },
            ]}
            edges={[]}
          >
            <ButtonComponent />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    );
    const zoomInButton = screen.getByRole("button", { name: /zoom in/i });
    const zoomOutButton = screen.getByRole("button", { name: /zoom out/i });
    expect(zoomInButton).toBeInTheDocument();
    expect(zoomOutButton).toBeInTheDocument();
  });
});
