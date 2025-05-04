import { City } from "./city.js";

export class Graph {
  constructor() {
    this.nodes = new Map();
    this.links = [];
  }

  addNode(obj) {
    this.nodes.set(obj.id, obj);
  }

  addEdge(sourceObj, targetObj) {
    this.addNode(sourceObj);
    this.addNode(targetObj);
    this.links.push({ source: sourceObj.id, target: targetObj.id });
  }

  getGraphData() {
    return {
      nodes: Array.from(this.nodes.values()).map((obj) => ({
        id: obj.id,
        name: obj.name,
        color: obj instanceof City ? "#1f77b4" : "#ff7f0e",
        symbolType: obj instanceof City ? "square" : "circle",
        ...obj,
      })),
      links: this.links,
    };
  }
}
