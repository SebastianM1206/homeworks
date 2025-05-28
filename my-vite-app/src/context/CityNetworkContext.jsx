import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import { Graph } from "../utils/Graph.js";
import { TreeNode } from "../utils/TreeNode.js";

// Crear el contexto
const CityNetworkContext = createContext();

// Tipos de acciones
const ActionTypes = {
  ADD_CITY: "ADD_CITY",
  REMOVE_CITY: "REMOVE_CITY",
  ADD_CONNECTION: "ADD_CONNECTION",
  REMOVE_CONNECTION: "REMOVE_CONNECTION",
  ADD_GREEN_ZONE: "ADD_GREEN_ZONE",
  EDIT_GREEN_ZONE: "EDIT_GREEN_ZONE",
  REMOVE_GREEN_ZONE: "REMOVE_GREEN_ZONE",
  SELECT_CITY: "SELECT_CITY",
  SET_VIEW_MODE: "SET_VIEW_MODE",
};

// Estado inicial
const initialState = {
  cityNetwork: new Graph(),
  greenZones: {}, // cityName -> TreeNode (root de zonas verdes)
  selectedCity: null,
  viewMode: "network", // 'network' | 'greenZones'
  stats: {
    totalCities: 0,
    totalConnections: 0,
    totalGreenZones: 0,
  },
};

// Reducer para manejar el estado
function cityNetworkReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_CITY: {
      // Verificar si la ciudad ya existe
      if (state.cityNetwork.nodes.includes(action.payload.name)) {
        return state; // No agregar ciudad duplicada
      }

      const newNetwork = Object.assign(
        Object.create(Object.getPrototypeOf(state.cityNetwork)),
        state.cityNetwork
      );
      newNetwork.addCity(action.payload.name);

      const newGreenZones = { ...state.greenZones };
      if (!newGreenZones[action.payload.name]) {
        // Crear zona verde raíz por defecto
        const rootZone = new TreeNode({
          id: `${action.payload.name}-root`,
          name: `Zona Central de ${action.payload.name}`,
          type: "central",
          area: 0,
          description: "Zona verde principal",
        });
        newGreenZones[action.payload.name] = rootZone;
      }

      return {
        ...state,
        cityNetwork: newNetwork,
        greenZones: newGreenZones,
        stats: {
          ...state.stats,
          totalCities: newNetwork.nodes.length,
          totalGreenZones: Object.values(newGreenZones).reduce(
            (total, tree) => total + tree.getTotalNodes(),
            0
          ),
        },
      };
    }

    case ActionTypes.REMOVE_CITY: {
      const newNetwork = Object.assign(
        Object.create(Object.getPrototypeOf(state.cityNetwork)),
        state.cityNetwork
      );
      newNetwork.removeCity(action.payload.name);

      const newGreenZones = { ...state.greenZones };
      delete newGreenZones[action.payload.name];

      return {
        ...state,
        cityNetwork: newNetwork,
        greenZones: newGreenZones,
        selectedCity:
          state.selectedCity === action.payload.name
            ? null
            : state.selectedCity,
        stats: {
          ...state.stats,
          totalCities: newNetwork.nodes.length,
          totalGreenZones: Object.values(newGreenZones).reduce(
            (total, tree) => total + tree.getTotalNodes(),
            0
          ),
        },
      };
    }

    case ActionTypes.ADD_CONNECTION: {
      const newNetwork = Object.assign(
        Object.create(Object.getPrototypeOf(state.cityNetwork)),
        state.cityNetwork
      );
      newNetwork.addConnection(action.payload.city1, action.payload.city2);

      return {
        ...state,
        cityNetwork: newNetwork,
        stats: {
          ...state.stats,
          totalConnections:
            Object.values(newNetwork.adjList).reduce(
              (total, connections) => total + connections.length,
              0
            ) / 2,
        },
      };
    }

    case ActionTypes.ADD_GREEN_ZONE: {
      const { cityName, parentZoneId, zoneData } = action.payload;
      const newGreenZones = { ...state.greenZones };

      if (newGreenZones[cityName]) {
        const tree = newGreenZones[cityName];
        const parentNode = parentZoneId ? tree.findNode(parentZoneId) : tree;

        if (parentNode) {
          parentNode.addChild(zoneData);
        }
      }

      return {
        ...state,
        greenZones: newGreenZones,
        stats: {
          ...state.stats,
          totalGreenZones: Object.values(newGreenZones).reduce(
            (total, tree) => total + tree.getTotalNodes(),
            0
          ),
        },
      };
    }

    case ActionTypes.EDIT_GREEN_ZONE: {
      const { cityName, zoneId, newData } = action.payload;
      const newGreenZones = { ...state.greenZones };

      if (newGreenZones[cityName]) {
        const tree = newGreenZones[cityName];
        const node = tree.findNode(zoneId);

        if (node) {
          node.data = { ...node.data, ...newData };
        }
      }

      return {
        ...state,
        greenZones: newGreenZones,
      };
    }

    case ActionTypes.SELECT_CITY:
      return {
        ...state,
        selectedCity: action.payload.cityName,
      };

    case ActionTypes.SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.payload.mode,
      };

    default:
      return state;
  }
}

export function CityNetworkProvider({ children }) {
  const [state, dispatch] = useReducer(cityNetworkReducer, initialState);

  // Actions
  const addCity = useCallback((name) => {
    dispatch({ type: ActionTypes.ADD_CITY, payload: { name } });
  }, []);

  const removeCity = useCallback((name) => {
    dispatch({ type: ActionTypes.REMOVE_CITY, payload: { name } });
  }, []);

  const addConnection = useCallback((city1, city2) => {
    dispatch({ type: ActionTypes.ADD_CONNECTION, payload: { city1, city2 } });
  }, []);

  const addGreenZone = useCallback((cityName, parentZoneId, zoneData) => {
    dispatch({
      type: ActionTypes.ADD_GREEN_ZONE,
      payload: { cityName, parentZoneId, zoneData },
    });
  }, []);

  const editGreenZone = useCallback((cityName, zoneId, newData) => {
    dispatch({
      type: ActionTypes.EDIT_GREEN_ZONE,
      payload: { cityName, zoneId, newData },
    });
  }, []);

  const selectCity = useCallback((cityName) => {
    dispatch({ type: ActionTypes.SELECT_CITY, payload: { cityName } });
  }, []);

  const setViewMode = useCallback((mode) => {
    dispatch({ type: ActionTypes.SET_VIEW_MODE, payload: { mode } });
  }, []);

  const getCityGreenZoneStats = useCallback(
    (cityName) => {
      const tree = state.greenZones[cityName];
      if (!tree) return { maxHeight: 0, totalZones: 0 };

      return {
        maxHeight: tree.getHeight(),
        totalZones: tree.getTotalNodes(),
      };
    },
    [state.greenZones]
  );

  const value = {
    ...state,

    addCity,
    removeCity,
    addConnection,
    addGreenZone,
    editGreenZone,
    selectCity,
    setViewMode,

    // Funciones utilitarias
    getCityGreenZoneStats,
  };

  return (
    <CityNetworkContext.Provider value={value}>
      {children}
    </CityNetworkContext.Provider>
  );
}

// hook for using the context my dad
export function useCityNetwork() {
  const context = useContext(CityNetworkContext);
  if (!context) {
    throw new Error("useCityNetwork must be used within a CityNetworkProvider");
  }
  return context;
}
