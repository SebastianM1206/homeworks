# 🏙️ Red de Ciudades Interconectadas - Parcial 3

## 📋 Descripción del Proyecto

Esta aplicación web modela una red de ciudades interconectadas usando **árboles** y **grafos** como estructuras de datos principales. Cada ciudad puede tener zonas verdes organizadas jerárquicamente, y las ciudades se pueden conectar entre sí formando una red.

## 🎯 Requisitos Cumplidos

### ✅ 1. Modelado de Red de Ciudades Interconectadas

- Implementación usando **Grafo** para representar las conexiones entre ciudades
- Cada nodo del grafo representa una ciudad
- Las aristas representan conexiones bidireccionales entre ciudades

### ✅ 2. Zonas Verdes Internas por Ciudad

- Cada ciudad puede tener múltiples zonas verdes
- Implementadas usando estructura de **Árbol** jerárquico
- Permite crear subzonas dentro de zonas principales

### ✅ 3. Nombres Únicos de Ciudades

- Validación para evitar ciudades duplicadas
- Interfaz intuitiva con mensajes de error claros

### ✅ 4. Jerarquía de Zonas Verdes

- **Estructura de Árbol** para organizar zonas y subzonas
- Visualización por niveles jerárquicos
- Cálculo automático de profundidad y altura

### ✅ 5. Agregar y Eliminar Ciudades

- Funcionalidad completa para gestión de ciudades
- Al eliminar una ciudad se eliminan todas sus conexiones
- Confirmación antes de eliminar para evitar pérdida de datos

### ✅ 6. Agregar y Editar Zonas Verdes

- Solo se pueden **agregar** y **editar** zonas verdes (no eliminar)
- Formulario intuitivo para crear jerarquías
- Edición inline de nombres de zonas

### ✅ 7. Cálculo de Altura Máxima y Total de Zonas Verdes

- **Algoritmo de altura del árbol** para calcular la profundidad máxima
- Conteo total de nodos en el árbol de zonas verdes
- Estadísticas en tiempo real por ciudad y para toda la red

## 🏗️ Arquitectura Técnica

### 📁 Estructuras de Datos Implementadas

#### 🌐 **Grafo** (`Graph.js`)

```javascript
class Graph {
  constructor() {
    this.nodes = [];        // Lista de ciudades
    this.adjList = [];      // Lista de adyacencia para conexiones
  }

  // Métodos principales:
  addNode(node)           // Agregar ciudad
  deleteNode(node)        // Eliminar ciudad
  addEdge(node1, node2)   // Conectar ciudades
  removeEdge(node1, node2) // Desconectar ciudades
  searchNode(node)        // Buscar ciudad
  getAdjacency(node)      // Obtener conexiones de una ciudad
}
```

#### 🌳 **Árbol de Zonas Verdes** (`GreenZoneTree.js`)

```javascript
class TreeNode {
  constructor(value) {
    this.value = value;     // Nombre de la zona
    this.children = [];     // Subzonas
    this.parent = null;     // Zona padre
  }
}

class GreenZoneTree {
  constructor() {
    this.root = null;       // Raíz del árbol
  }

  // Métodos principales:
  insertRoot(value)         // Insertar zona raíz
  insertValue(parent, value) // Insertar subzona
  getMaxHeight()           // Calcular altura máxima
  getTotalNodes()          // Contar total de zonas
  updateNodeValue()        // Editar nombre de zona
}
```

#### 🏙️ **Ciudad** (`City.js`)

```javascript
class City {
  constructor(name) {
    this.name = name;
    this.greenZones = new GreenZoneTree(); // Árbol de zonas verdes
  }

  // Métodos principales:
  addGreenZone(parent, zone)  // Agregar zona verde
  getGreenZoneMaxHeight()     // Altura máxima del árbol
  getTotalGreenZones()        // Total de zonas verdes
  getStatistics()             // Estadísticas de la ciudad
}
```

#### 🌐 **Red de Ciudades** (`CityNetwork.js`)

```javascript
class CityNetwork {
  constructor() {
    this.graph = new Graph();        // Grafo de conexiones
    this.cities = new Map();         // Mapa de ciudades
  }

  // Métodos principales:
  addCity(name)                     // Agregar ciudad
  deleteCity(name)                  // Eliminar ciudad
  connectCities(city1, city2)       // Conectar ciudades
  getNetworkStatistics()            // Estadísticas globales
}
```

## 🎨 Interfaz de Usuario

### 📱 **Diseño Responsivo con Tailwind CSS**

- Interfaz moderna y profesional
- Componentes responsivos para móvil, tablet y desktop
- Paleta de colores coherente y accesible

### 🧭 **Navegación por Pestañas**

1. **🌐 Red de Ciudades**: Visualización gráfica de la red
2. **🏙️ Gestión de Ciudades**: Agregar y administrar ciudades
3. **🔗 Conexiones**: Crear y gestionar conexiones
4. **📊 Estadísticas**: Analytics completos de la red

### 📊 **Visualizaciones**

- **Canvas interactivo** para mostrar la red de ciudades
- **Jerarquía visual** de zonas verdes por niveles
- **Tablas y rankings** con estadísticas detalladas
- **Gráficos de estadísticas** en tiempo real

## 🚀 Funcionalidades Principales

### 1. **Gestión de Ciudades**

- ➕ Agregar nuevas ciudades con validación
- 🗑️ Eliminar ciudades existentes (con confirmación)
- 🔍 Búsqueda y selección de ciudades
- 📋 Lista visual de todas las ciudades

### 2. **Sistema de Conexiones**

- 🔗 Conectar cualquier par de ciudades
- ✂️ Desconectar ciudades existentes
- 🌐 Visualización gráfica de conexiones
- 📊 Estadísticas de conectividad

### 3. **Zonas Verdes Jerárquicas**

- 🌱 Agregar zonas raíz o subzonas
- ✏️ Editar nombres de zonas existentes
- 🌳 Visualización por niveles jerárquicos
- 📏 Cálculo automático de altura máxima

### 4. **Analytics y Estadísticas**

- 📊 **Estadísticas globales**: Total de ciudades, conexiones, zonas verdes
- 🏆 **Rankings**: Por zonas verdes, altura máxima, conexiones
- 📋 **Tabla detallada**: Estado de cada ciudad
- 🌐 **Mapa de conexiones**: Visualización de todas las conexiones

## 🔧 Tecnologías Utilizadas

- **React 19.0** - Framework de interfaz de usuario
- **Vite** - Herramienta de build rápida
- **Tailwind CSS 4.0** - Framework de estilos utilitarios
- **Canvas API** - Visualización gráfica de la red
- **JavaScript ES6+** - Lógica de aplicación moderna

## 🎮 Cómo Usar la Aplicación

### 1. **Agregar Ciudades**

1. Ve a la pestaña "🏙️ Gestión de Ciudades"
2. Ingresa el nombre de la ciudad
3. Haz clic en "➕ Agregar Ciudad"

### 2. **Conectar Ciudades**

1. Ve a la pestaña "🔗 Conexiones"
2. Selecciona dos ciudades diferentes
3. Elige "Conectar ciudades"
4. Haz clic en "🔗 Conectar"

### 3. **Agregar Zonas Verdes**

1. Selecciona una ciudad en la visualización
2. Ve a la sección "⚙️ Gestionar"
3. Ingresa el nombre de la zona verde
4. Selecciona una zona padre (opcional)
5. Haz clic en "🌱 Agregar Zona Verde"

### 4. **Ver Estadísticas**

1. Ve a la pestaña "📊 Estadísticas"
2. Explora rankings, tablas y resúmenes
3. Analiza la conectividad de la red

## 🧮 Algoritmos Implementados

### **Cálculo de Altura Máxima del Árbol**

```javascript
calculateHeight(node) {
  if (node === null || node.children.length === 0) {
    return 1;
  }

  let maxChildHeight = 0;
  for (const child of node.children) {
    const childHeight = this.calculateHeight(child);
    maxChildHeight = Math.max(maxChildHeight, childHeight);
  }

  return 1 + maxChildHeight;
}
```

### **Conteo Total de Nodos**

```javascript
countNodes(node) {
  if (node === null) return 0;

  let count = 1; // Contar nodo actual
  for (const child of node.children) {
    count += this.countNodes(child);
  }
  return count;
}
```

### **Búsqueda en Grafo**

```javascript
searchNode(node) {
  return this.nodes.includes(node);
}

getAdjacency(node) {
  return this.adjList[node] || [];
}
```

## 🎯 Características Destacadas

- **🔄 Reactividad completa**: Todas las vistas se actualizan automáticamente
- **✅ Validación robusta**: Prevención de errores y datos inválidos
- **🎨 UI/UX excepcional**: Diseño moderno y profesional
- **📱 Totalmente responsivo**: Funciona en cualquier dispositivo
- **⚡ Rendimiento optimizado**: Estructuras de datos eficientes
- **🧪 Arquitectura escalable**: Código modular y mantenible

## 📈 Métricas de Rendimiento

- **Búsqueda de ciudad**: O(1) usando Map
- **Inserción en árbol**: O(h) donde h es la altura
- **Cálculo de altura**: O(n) donde n es el número de nodos
- **Búsqueda en grafo**: O(1) para nodos, O(V) para adyacencias

Este proyecto demuestra un dominio completo de estructuras de datos (árboles y grafos) aplicadas a un problema real, con una interfaz de usuario moderna y funcional.
