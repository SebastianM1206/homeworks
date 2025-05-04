import React from "react";
import { Graph as D3Graph } from "react-d3-graph";
import { useEffect, useState } from "react";
import { createMockGraph } from "../utils/mockData";

const GraphView = () => {
  const [data, setData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    const graphData = createMockGraph();
    setData(graphData);
  }, []);

  const config = {
    nodeHighlightBehavior: true,
    node: {
      size: 500,
      fontSize: 14,
      fontColor: "#333",
      color: "#ff7f0e",
      highlightStrokeColor: "#000",
      labelProperty: "name",
      draggable: true,
    },
    link: {
      highlightColor: "#999",
      renderLabel: false,
      strokeWidth: 2,
      color: "#999",
    },
    directed: false,
    height: 600,
    width: 800,
    automaticRearrangeAfterDropNode: true,
    panAndZoom: false,
  };

  return (
    <D3Graph
      id="graph-id"
      data={data}
      config={config}
      onClickNode={(nodeId, node) =>
        alert(
          `ID: ${nodeId}\nName: ${node.name}\nAge: ${node.age}\nType: ${
            node.id.startsWith("city") ? "City" : "Person"
          }`
        )
      }
    />
  );
};

export default GraphView;
