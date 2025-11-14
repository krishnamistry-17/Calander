import { ReactFlowProvider } from "@xyflow/react";
import DateCalander from "./pages/Date";
import ERDaigram from "./pages/ERDaigram/ERDaigram";

function App() {
  return (
    <>
      <div>
        {/* <DateCalander /> */}
        <ReactFlowProvider>
          <ERDaigram />
        </ReactFlowProvider>
      </div>
    </>
  );
}

export default App;
