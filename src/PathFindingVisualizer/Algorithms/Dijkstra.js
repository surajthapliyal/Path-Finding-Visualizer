// Returns all nodes in the order in which they were visited.
// Make nodes point back to their previous node so that we can compute the shortest path
// by backtracking from the finish node.
export function Dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  //will work as priorityQueue
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length>0) {
    sortByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (!closestNode.isWall) {
    
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, grid);
    }
  }
}
function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const node of unvisitedNeighbors) {
    node.distance = node.distance + 1 + node.distanceToFinishNode;
    node.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((node) => !node.isVisited);
}

function sortByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}
