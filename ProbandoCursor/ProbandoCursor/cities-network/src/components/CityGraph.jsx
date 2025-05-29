import { Graph } from "react-d3-graph";

function CityGraph({ cities }) {
  // Configuración del grafo
  const graphConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "#2a2a2a",
      size: 300,
      highlightStrokeColor: "#646cff",
      fontSize: 16,
      fontColor: "#e0e0e0",
      strokeColor: "#646cff",
      strokeWidth: 2,
    },
    link: {
      color: "#4a4a4a",
      highlightColor: "#646cff",
      strokeWidth: 2,
    },
    d3: {
      gravity: -200,
      linkLength: 200,
    },
    height: 400,
    width: 600,
    backgroundColor: "#2a2a2a",
  };

  // Preparar los datos para el grafo
  const graphData = {
    nodes: cities.map(city => ({
      id: city.name,
      color: "#3a3a3a",
    })),
    links: cities.flatMap(city =>
      city.connections.map(connection => ({
        source: city.name,
        target: connection.name,
      }))
    ).filter((link, index, self) => 
      // Eliminar enlaces duplicados
      index === self.findIndex(l => 
        (l.source === link.source && l.target === link.target) ||
        (l.source === link.target && l.target === link.source)
      )
    ),
  };

  return (
    <div className="city-graph">
      <h3>Visualización de la Red de Ciudades</h3>
      <div className="graph-container">
        <Graph
          id="city-network-graph"
          data={graphData}
          config={graphConfig}
        />
      </div>
    </div>
  );
}

export default CityGraph; 