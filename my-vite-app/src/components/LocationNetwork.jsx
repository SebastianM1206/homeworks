import { useEffect, useRef } from "react";
import { Graph } from "react-d3-graph";
import { ShareIcon } from "@heroicons/react/24/outline";

function LocationNetwork({ locations }) {
  const graphRef = useRef(null);

  // Configuration for the shi graph
  const myConfig = {
    automaticRearrangeAfterDropNode: true,
    node: {
      color: "#3b82f6",
      size: 400,
      fontSize: 12,
      fontWeight: "bold",
      fontColor: "#ffffff",
      highlightFontSize: 14,
      highlightFontWeight: "bold",
      highlightColor: "#1d4ed8",
      highlightStrokeColor: "#1d4ed8",
      highlightStrokeWidth: 3,
      strokeColor: "#2563eb",
      strokeWidth: 2,
      labelProperty: "name",
      renderLabel: true,
    },
    link: {
      color: "#6b7280",
      fontSize: 10,
      highlightColor: "#3b82f6",
      strokeWidth: 2,
      highlightStrokeWidth: 4,
      type: "STRAIGHT",
    },
    directed: false,
    focusAnimationDuration: 0.75,
    height: 400,
    highlightDegree: 1,
    highlightOpacity: 0.2,
    linkHighlightBehavior: true,
    maxZoom: 8,
    minZoom: 0.1,
    nodeHighlightBehavior: true,
    panAndZoom: true,
    staticGraph: false,
    staticGraphWithDragAndDrop: false,
    width: 800,
    d3: {
      alphaTarget: 0.05,
      gravity: -100,
      linkLength: 120,
      linkStrength: 1,
      disableLinkForce: false,
    },
  };

  
  const getGraphData = () => {
    const nodes = locations.map((location) => ({
      id: location.id,
      name: location.name,
      color: location.environmentalZones.length > 0 ? "#10b981" : "#3b82f6",
    }));

    const links = [];
    const addedConnections = new Set();

    locations.forEach((location) => {
      location.connections.forEach((connectedLocation) => {
        const connectionKey = [location.id, connectedLocation.id]
          .sort()
          .join("-");
        if (!addedConnections.has(connectionKey)) {
          links.push({
            source: location.id,
            target: connectedLocation.id,
          });
          addedConnections.add(connectionKey);
        }
      });
    });

    return { nodes, links };
  };

  const data = getGraphData();

  const onClickNode = (nodeId) => {
    console.log("Clicked node:", nodeId);
  };

  const onClickLink = (source, target) => {
    console.log("Clicked link between:", source, "and", target);
  };

  const getTotalMaxDepth = () => {
    return locations.reduce((total, location) => {
      return total + (location.getMaxDepth ? location.getMaxDepth() : 0);
    }, 0);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-50 rounded-lg">
          <ShareIcon className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Location Network
          </h3>
          <p className="text-sm text-gray-500">
            Interactive visualization of location connections
          </p>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        {data.nodes.length === 0 ? (
          <div className="h-96 flex items-center justify-center">
            <div className="text-center">
              <ShareIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">
                No locations to display
              </p>
              <p className="text-sm text-gray-400">
                Add locations to see the network visualization
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <Graph
              id="location-network"
              data={data}
              config={myConfig}
              onClickNode={onClickNode}
              onClickLink={onClickLink}
              ref={graphRef}
            />
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs text-gray-600">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Locations without zones</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span>Locations with zones</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {data.nodes.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-blue-600">
              {data.nodes.length}
            </p>
            <p className="text-xs text-blue-700 font-medium">Locations</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-purple-600">
              {data.links.length}
            </p>
            <p className="text-xs text-purple-700 font-medium">Connections</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-emerald-600">
              {locations.reduce(
                (sum, loc) => sum + loc.environmentalZones.length,
                0
              )}
            </p>
            <p className="text-xs text-emerald-700 font-medium">Total Zones</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-orange-600">
              {getTotalMaxDepth()}
            </p>
            <p className="text-xs text-orange-700 font-medium">Total Depth</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationNetwork;
