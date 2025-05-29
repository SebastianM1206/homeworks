import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import { MapIcon, CubeIcon } from "@heroicons/react/24/outline";

function EnvironmentalZoneTree({ zones }) {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const treeContainer = useRef(null);

  useEffect(() => {
    if (treeContainer.current) {
      const { width, height } = treeContainer.current.getBoundingClientRect();
      setDimensions({ width, height });
      setTranslate({ x: width / 2, y: 50 });
    }
  }, [zones]);

  const transformZonesToTreeData = (zones) => {
    if (!zones || zones.length === 0) return [];

    return zones.map((zone) => ({
      name: zone.name,
      attributes: {
        level: `Level ${zone.level}`,
        subzones: zone.subzones.length,
        id: zone.id,
      },
      children:
        zone.subzones.length > 0
          ? transformZonesToTreeData(zone.subzones)
          : undefined,
    }));
  };

  const treeData = transformZonesToTreeData(zones);

  const nodeSize = { x: 200, y: 80 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -nodeSize.x / 2,
    y: -nodeSize.y / 2,
  };

  const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => (
    <g>
      <foreignObject {...foreignObjectProps}>
        <div
          className="bg-white border-2 border-emerald-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={toggleNode}
        >
          <div className="flex items-center gap-2 mb-1">
            <MapIcon className="h-4 w-4 text-emerald-600 flex-shrink-0" />
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {nodeDatum.name}
            </h4>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <CubeIcon className="h-3 w-3" />
              <span>{nodeDatum.attributes?.level}</span>
            </div>
            {nodeDatum.attributes?.subzones > 0 && (
              <div className="text-xs text-blue-600 font-medium">
                {nodeDatum.attributes.subzones} subzone
                {nodeDatum.attributes.subzones !== 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>
      </foreignObject>
    </g>
  );

  const linkStyle = {
    stroke: "#10b981",
    strokeWidth: 2,
  };

  const getTotalZones = (zones) => {
    let count = 0;
    zones.forEach((zone) => {
      count += 1 + getTotalZones(zone.subzones || []);
    });
    return count;
  };

  const getMaxLevel = (zones) => {
    if (!zones || zones.length === 0) return 0;
    return Math.max(
      ...zones.map((zone) =>
        Math.max(zone.level, getMaxLevel(zone.subzones || []))
      )
    );
  };

  const getMaxDepth = (zones, depth = 0) => {
    if (!zones || zones.length === 0) return depth;
    return Math.max(
      ...zones.map((zone) => getMaxDepth(zone.subzones || [], depth + 1))
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-emerald-50 rounded-lg">
          <MapIcon className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Environmental Zone Hierarchy
          </h3>
          <p className="text-sm text-gray-500">
            Interactive tree visualization with automatic level assignment
          </p>
        </div>
      </div>

      <div
        ref={treeContainer}
        className="border border-gray-200 rounded-lg overflow-hidden bg-gradient-to-br from-emerald-50 to-blue-50"
        style={{ width: "100%", height: "500px" }}
      >
        {treeData.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <MapIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">
                No environmental zones
              </p>
              <p className="text-sm text-gray-400">
                Add zones to see the hierarchy visualization
              </p>
            </div>
          </div>
        ) : (
          <Tree
            data={treeData}
            translate={translate}
            nodeSize={nodeSize}
            renderCustomNodeElement={renderCustomNodeElement}
            orientation="vertical"
            pathFunc="step"
            linkClassNames={{ stroke: "emerald-400" }}
            separation={{ siblings: 1.5, nonSiblings: 2 }}
            zoom={0.8}
            scaleExtent={{ min: 0.3, max: 2 }}
            enableLegacyTransitions={true}
            transitionDuration={500}
          />
        )}
      </div>

      {treeData.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-emerald-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-emerald-600">
              {zones.length}
            </p>
            <p className="text-xs text-emerald-700 font-medium">Main Zones</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-blue-600">
              {getTotalZones(zones)}
            </p>
            <p className="text-xs text-blue-700 font-medium">Total Zones</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-orange-600">
              {getMaxLevel(zones)}
            </p>
            <p className="text-xs text-orange-700 font-medium">Max Level</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <p className="text-2xl font-bold text-purple-600">
              {getMaxDepth(zones)}
            </p>
            <p className="text-xs text-purple-700 font-medium">Max Depth</p>
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500 text-center">
        Click on nodes to expand/collapse • Drag to pan • Scroll to zoom
      </div>
    </div>
  );
}

export default EnvironmentalZoneTree;
