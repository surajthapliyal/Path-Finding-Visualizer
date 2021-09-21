import React, { useEffect, useState } from "react";
import Node from "./../Node/Node";

const PathFindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [startNodeRow, setStartNodeRow] = useState(5);
  const [startNodeCol, setStartNodeCol] = useState(5);
  const [finishNodeRow, setFinishNodeRow] = useState(5);
  const [finishNodeCol, setFinishNodeCol] = useState(15);
  const [rowCount, setRowCount] = useState(25);
  const [colCount, setColCount] = useState(45);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [isStartNode, setIsStartNode] = useState(false);
  const [isFinishNode, setIsFinishNode] = useState(false);
  const [isMousePressed, setIsMousePressed] = useState(false);

  useEffect(() => {
    const grid = getInitialGrid();
    setGrid(grid);
  }, []);

  /*************Set up the initial grid************* */
  const getInitialGrid = (totalRows = rowCount, totalCols = colCount) => {
    const initialGrid = [];
    for (let row = 0; row < totalRows; row++) {
      const currentRow = [];
      for (let col = 0; col < totalCols; col++) {
        currentRow.push(createNode(row, col));
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  };

  const createNode = (row, col) => {
    return {
      row,
      col,
      isStart: row === startNodeRow && col === startNodeCol,
      isFinish: row === finishNodeRow && col === finishNodeCol,
      distance: Infinity,
      distanceToFinishNode:
        Math.abs(finishNodeRow - row) + Math.abs(finishNodeCol - col),
      isVisited: false,
      isWall: false,
      previousNode: null,
      isNode: true,
    };
  };

  /********************Mouse Events***********************/

  const handleMouseDown = (row, col) => {};

  const handleMouseEnter = (row, col) => {};

  const handleMouseUp = (row, col) => {};

  const isGridClear = () => {
    for (const row of grid) {
      for (const node of row) {
        const nodeClassName = document.getElementById(
          `node-${node.row}-${node.col}`
        ).className;
        if (
          nodeClassName === "node node-visited" ||
          nodeClassName === "node node-shortest-path"
        ) {
          return false;
        }
      }
    }
    return true;
  };

  /******************Clear Board/Walls*******************/
  const clearGrid = () => {};
  const clearWalls = () => {};

  /*******************Create Animations*******************/
  const visualize = (algo) => {};
  return (
    <div>
      <table className="grid-container mt-4">
        <tbody className="grid">
          {grid.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIndex}
                      col={col}
                      row={row}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      onMouseDown={() => handleMouseDown(row, col)}
                      onMouseEnter={() => handleMouseEnter(row, col)}
                      onMouseUp={() => handleMouseUp(row, col)}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="buttons-div d-flex justify-content-between m-4 mt-4">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => clearGrid()}
        >
          Clear Grid
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => clearWalls()}
        >
          Clear Walls
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => visualize("Dijkstra")}
        >
          Dijkstra's
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => visualize("AStar")}
        >
          A*
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => visualize("BFS")}
        >
          Bread First Search
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => visualize("DFS")}
        >
          Depth First Search
        </button>
      </div>
      <footer className="footer text-center p-4">
        Made With ❤️ By Suraj Thapliyal
      </footer>
    </div>
  );
};

export default PathFindingVisualizer;
