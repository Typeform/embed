import "./App.css";
import "@typeform/embed/build/css/widget.css";
import { useEffect, useRef } from "react";
import { createWidget } from "@typeform/embed";

function App() {
  const container = useRef();

  // this is not ideal and we recommend using embed-react lib once it is ready :)
  useEffect(() => {
    createWidget("moe6aa", { container: container.current });
  }, []);

  return (
    <div className="App">
      <h1>This is an example react app.</h1>
      <p>Embed lib &lt;3 react ⚛️</p>
      <div className="App-spacer" />
      <div className="App-container">
        <div className="App-embed" ref={container} />
      </div>
    </div>
  );
}

export default App;
