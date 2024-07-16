class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
    return this;
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let node of vertexArray){
      this.addVertex(node)
    }
    return this;
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
    return this;
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
    return this;
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for(let node of this.nodes){
      if(node.adjacent.has(vertex)){
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
    return this;
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const toVisitStack = [start];
    const result = []
    let seen = new Set();
    let currVertex;

    seen.add(start);

    while (toVisitStack.length){
      currVertex = toVisitStack.pop();
      result.push(currVertex.value);

      currVertex.adjacent.forEach(neighbor => {
        if(!seen.has(neighbor)){
          seen.add(neighbor);
          toVisitStack.push(neighbor);
        }
      });
        }
    return result;
  }
  

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const toVisitQueue = [start];
    const result = []
    let seen = new Set();
    let currVertex;

    seen.add(start);

    while (toVisitQueue.length){
      currVertex = toVisitQueue.shift();
      result.push(currVertex.value);

      currVertex.adjacent.forEach(neighbor => {
        if(!seen.has(neighbor)){
          seen.add(neighbor);
          toVisitQueue.push(neighbor);
        }
      });
        }
    return result;
  }
}

module.exports = {Graph, Node}