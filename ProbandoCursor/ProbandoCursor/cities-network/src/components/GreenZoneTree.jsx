import Tree from "react-d3-tree";

function GreenZoneTree({ zones }) {
  // Función para convertir las zonas verdes al formato requerido por react-d3-tree
  const convertZonesToTreeData = (zones) => {
    return zones.map(zone => ({
      name: `${zone.name}\n(${zone.height}m)`,
      attributes: {
        height: `${zone.height}m`,
      },
      children: zone.subzones.length > 0 ? convertZonesToTreeData(zone.subzones) : [],
    }));
  };

  const treeData = {
    name: "Zonas Verdes",
    children: convertZonesToTreeData(zones),
  };

  // Configuración del árbol
  const treeConfig = {
    orientation: "vertical",
    nodeSize: { x: 200, y: 100 },
    separation: { siblings: 2, nonSiblings: 2.5 },
    pathFunc: "step",
  };

  // Estilos personalizados para los nodos
  const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => (
    <g>
      <circle 
        r="20" 
        fill="#3a3a3a"
        stroke="#646cff"
        strokeWidth="2"
        onClick={toggleNode}
      />
      <text
        fill="#e0e0e0"
        x="25"
        y="-10"
        style={{ fontSize: "14px" }}
        onClick={toggleNode}
      >
        {nodeDatum.name}
      </text>
      {nodeDatum.attributes?.height && (
        <text fill="#888" x="25" y="10" style={{ fontSize: "12px" }}>
          {nodeDatum.attributes.height}
        </text>
      )}
    </g>
  );

  const styles = {
    links: {
      stroke: "#4a4a4a",
      strokeWidth: 2,
    },
  };

  return (
    <div className="green-zone-tree">
      <h3>Jerarquía de Zonas Verdes</h3>
      <div style={{ width: "100%", height: "400px" }}>
        <Tree
          data={treeData}
          orientation="vertical"
          renderCustomNodeElement={renderCustomNodeElement}
          {...treeConfig}
          translate={{ x: 300, y: 50 }}
          styles={styles}
        />
      </div>
    </div>
  );
}

export default GreenZoneTree; 