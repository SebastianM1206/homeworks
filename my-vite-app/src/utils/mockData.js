import { City } from "./city.js";
import { Person } from "./person.js";
import { Graph } from "./graph.js";

export function createMockGraph() {
  const graph = new Graph(); // Create a new graph instance

  // creating cities
  const cities = [
    new City("Bogotá", 8000000),
    new City("Medellín", 2500000),
    new City("Cali", 2200000),
    new City("Barranquilla", 1200000),
    new City("Bucaramanga", 600000),
  ];

  // creating persons
  const persons = [
    new Person("Ana", 30),
    new Person("Luis", 25),
    new Person("Carlos", 28),
    new Person("María", 32),
    new Person("Pedro", 27),
    new Person("Lucía", 22),
    new Person("Juan", 35),
    new Person("Sofía", 29),
    new Person("Diego", 31),
    new Person("Valentina", 26),
  ];

  // relationships between persons and cities
  persons.forEach((person, index) => {
    const city = cities[index % cities.length];
    graph.addEdge(person, city);
  });

  const friendships = [
    [0, 1],
    [0, 2],
    [1, 3],
    [4, 5],
    [6, 7],
    [2, 8],
    [8, 9],
    [3, 6],
    [5, 9],
  ];

  // friendships between persons
  friendships.forEach(([i, j]) => {
    graph.addEdge(persons[i], persons[j]);
  });

  return graph.getGraphData();
}
