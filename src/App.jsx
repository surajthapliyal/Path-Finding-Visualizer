import React from "react";
import PathFindingVisualizer from "./PathFindingVisualizer/PathFindingVisualizer";

const App = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a href="/" className="navbar-brand m-1">
          Pathfinding Visualizer
        </a>
      </nav>
      <div className="container d-flex justify-content-center">
        <PathFindingVisualizer />
      </div>
    </div>
  );
};

export default App;
