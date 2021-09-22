import React, { useEffect, useState } from "react";
import Node from "./../Node/Node";
import "./PathFindingVisualizer.css";

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
  const [isRunning, setIsRunning] = useState(false);
  const [isWallNode, setIsWallNode] = useState(false);

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

  const handleMouseDown = (row, col) => {
    if (!isRunning) {
      if (isGridClear()) {
        if (
          document.getElementById(`node-${row}-${col}`).className ===
          "node node-start"
        ) {
          setIsMousePressed(true);
          setIsStartNode(true);
          setCurrentRow(row);
          setCurrentRow(col);
        } else if (
          document.getElementById(`node-${row}-${col}`).className ===
          "node node-finish"
        ) {
          setIsMousePressed(true);
          setIsFinishNode(true);
          setCurrentRow(row);
          setCurrentRow(col);
        } else {
          const newGrid = getNewGridWithWallToggled(grid, row, col);
          setGrid(newGrid);
          setIsMousePressed(true);
          setIsWallNode(true);
          setCurrentRow(row);
          setCurrentCol(col);
        }
      } else {
        clearGrid();
      }
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!isRunning) {
      if (isMousePressed) {
        const nodeClassName = document.getElementById(
          `node-${row}-${col}`
        ).className;

        if (isStartNode) {
          if (nodeClassName !== "node node-wall") {
            const prevStartNode = grid[currentRow][currentCol];
            prevStartNode.isStart = false;
            document.getElementById(
              `node-${currentRow}-${currentCol}`
            ).className = "node";
            setCurrentRow(row);
            setCurrentCol(col);

            const currentStartNode = grid[row][col];
            currentStartNode.isStart = true;
            document.getElementById(`node-${row}-${col}`).className =
              "node node-start";
          }
          setStartNodeRow(row);
          setStartNodeCol(col);
        } else if (isFinishNode) {
          if (nodeClassName !== "node node-wall") {
            const prevFinishNode = grid[currentRow][currentCol];
            prevFinishNode.isFinish = false;
            document.getElementById(
              `node-${currentRow}-${currentCol}`
            ).className = "node";
            setCurrentRow(row);
            setCurrentCol(col);
            const currentFinishNode = grid[row][col];
            currentFinishNode.isFinish = true;
            document.getElementById(`node-${row}-${col}`).className =
              "node node-finish";
          }
          setFinishNodeRow(row);
          setFinishNodeCol(col);
        } else if (isWallNode) {
          const newGrid = getNewGridWithWallToggled(grid, row, col);
          setGrid(newGrid);
        }
      }
    }
  };

  const handleMouseUp = (row, col) => {
    if (!isRunning) {
      setIsMousePressed(false);
      if (isStartNode) {
        const isStartNodeN = !isStartNode;
        setIsStartNode(isStartNodeN);
        setStartNodeRow(row);
        setStartNodeCol(col);
      } else if (isFinishNode) {
        const isFinishNodeN = !isFinishNode;
        setIsFinishNode(isFinishNodeN);
        setFinishNodeRow(row);
        setFinishNodeCol(col);
      }
      getInitialGrid();
    }
  };

  const handleMouseLeave = () => {
    if (isStartNode) {
      const isStartNodeN = !isStartNode;
      setIsStartNode(isStartNodeN);
      setIsMousePressed(false);
    } else if (isFinishNode) {
      const isFinishNodeN = !isFinishNode;
      setIsFinishNode(isFinishNodeN);
      setIsMousePressed(false);
    } else if (isWallNode) {
      const isWallNodeN = !isWallNode;
      setIsWallNode(isWallNodeN);
      setIsMousePressed(false);
      getInitialGrid();
    }
  };

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

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (!node.isStart && !node.isFinish && node.isNode) {
      const newNode = {
        ...node,
        isWall: !node.isWall,
      };
      newGrid[row][col] = newNode;
    }
    return newGrid;
  };

  /******************Clear Board/Walls*******************/
  const clearGrid = () => {
    if (!isRunning) {
      const newGrid = grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`
          ).className;
          if (
            nodeClassName !== "node node-start" &&
            nodeClassName !== "node node-finish" &&
            nodeClassName !== "node node-wall"
          ) {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node";
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(finishNodeRow - node.row) +
              Math.abs(finishNodeCol - node.col);
          } else if (nodeClassName === "node node-start") {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(finishNodeRow - node.row) +
              Math.abs(finishNodeCol - node.col);
            node.isStart = true;
            node.isWall = false;
            node.previousNode = null;
            node.isNode = true;
          } else if (nodeClassName === "node node-finish") {
            node.isVisited = true;
            node.distance = Infinity;
            node.distanceToFinishNode = 0;
          }
        }
      }
    }
  };
  const clearWalls = () => {
    if (!isRunning) {
      const newGrid = grid.slice();
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(
            `node-${node.row}-${node.col}`
          ).className;
          if (nodeClassName === "node node-wall") {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node";
            node.isWall = false;
          }
        }
      }
    }
  };

  /*******************Create Animations*******************/
  const visualize = (algo) => {};

  return (
    <div>
      <table className="grid-container mt-4" onMouseLeave={handleMouseLeave}>
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
                      isMousePressed={isMousePressed}
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
