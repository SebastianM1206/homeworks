//A continuación tenemos una lista de futbolistas a los cuales se le aplicarán las funciones de los arrays.

const futbolistas = [
  { nombre: "Lionel Messi", edad: 36, equipo: "Inter Miami", goles: 850 },
  { nombre: "Cristiano Ronaldo", edad: 40, equipo: "Al-Nassr", goles: 910 },
  { nombre: "Neymar Jr", edad: 33, equipo: "Al-Hilal", goles: 436 },
  { nombre: "Kylian Mbappé", edad: 25, equipo: "PSG", goles: 261 },
  { nombre: "Erling Haaland", edad: 23, equipo: "Manchester City", goles: 216 },
];

const nombres = futbolistas.map((jugador) => jugador.nombre); //Obtener una lista con solo los nombres de los futbolistas.
console.log(nombres); //map devuelve un nuevo array con los nombres de los futbolistas.

const goleadores = futbolistas.filter((jugador) => jugador.goles > 500); //Filtrar los futbolistas que hayan hecho más de 500 goles.
console.log(goleadores); //filter devuelve un nuevo array con esos futbolistas

const totalGoles = futbolistas.reduce(
  (total, jugador) => total + jugador.goles,
  0
); //contar cuántos goles en total han hecho todos los futbolistas.
console.log(totalGoles); //reduce devuelve un número con la suma de los goles de todos los futbolistas.

const psgPlayer = futbolistas.find((jugador) => jugador.equipo === "PSG"); //Encontrar a un futbolista que juegue en el PSG.
console.log(psgPlayer); //find devuelve el primer jugador que cumpla la condición.

const hayVeteranos = futbolistas.some((jugador) => jugador.edad > 40); //Saber si hay algún futbolista que tenga más de 40 años.
console.log(hayVeteranos); //some devuelve un booleano si hay algún jugador que cumpla la condición.

const todosGoleadores = futbolistas.every((jugador) => jugador.goles > 200); //Saber si todos los futbolistas han hecho más de 200 goles.
console.log(todosGoleadores); //every devuelve un booleano si todos los jugadores cumplen la condición.

const ordenadosPorGoles = [...futbolistas].sort((a, b) => b.goles - a.goles); //Ordenar a los futbolistas por la cantidad de goles de mayor a menor.
console.log(ordenadosPorGoles); //sort devuelve un nuevo array con los futbolistas ordenados por goles.

futbolistas.forEach((jugador) => console.log(jugador.nombre)); //Mostrar en consola el nombre de todos los futbolistas.
//forEach no devuelve nada, simplemente recorre el array y ejecuta la función que le pasamos.

const index = futbolistas.findIndex((jugador) => jugador.equipo === "Al-Nassr"); //Encontrar la posición en la que se encuentra el futbolista que juega en el Al-Nassr.
console.log(index); //findIndex devuelve la posición del primer jugador que cumpla la condición.

futbolistas.push({
  nombre: "Vinícius Jr",
  edad: 24,
  equipo: "Real Madrid",
  goles: 120,
}); //Agregar un nuevo futbolista al array.
console.log(futbolistas); //push agrega un nuevo elemento al final del array.

const eliminado = futbolistas.pop(); //Eliminar el último futbolista del array.
console.log(eliminado); //pop devuelve el elemento eliminado.
console.log(futbolistas); //pop elimina el último elemento del array y devuelve el elemento eliminado.

futbolistas.unshift({
  nombre: "Ronaldinho",
  edad: 44,
  equipo: "Retirado",
  goles: 300,
}); //Agregar un nuevo futbolista al inicio del array.
console.log(futbolistas); //unshift agrega un nuevo elemento al inicio del array.

const primero = futbolistas.shift(); //Eliminar el primer futbolista del array.
console.log(primero); //shift devuelve el elemento eliminado.
console.log(futbolistas); //shift elimina el primer elemento del array y devuelve el elemento eliminado.

futbolistas.splice(2, 1, {
  nombre: "Luka Modric",
  edad: 38,
  equipo: "Real Madrid",
  goles: 150,
}); //Reemplazar al futbolista que juega en el Al-Hilal por Luka Modric.
console.log(futbolistas); //splice reemplaza un elemento del array por otro.

const top3 = futbolistas.slice(0, 3); //Obtener los primeros 3 futbolistas del array.
console.log(top3); //slice devuelve un nuevo array con los elementos seleccionados.  (inicio, fin)

const otrosJugadores = [
  { nombre: "Zlatan Ibrahimović", edad: 42, equipo: "Retirado", goles: 570 },
]; //Crear un nuevo array con otros jugadores.
const todos = futbolistas.concat(otrosJugadores); //Unir el array de futbolistas con el de otros jugadores.
console.log(todos); //concat devuelve un nuevo array con los elementos de ambos arrays.

const ordenadosPorGol = futbolistas.toSorted((a, b) => b.goles - a.goles); //Ordenar a los futbolistas por la cantidad de goles de mayor a menor.  (otra forma que devuelve un nuevo array)
console.log(ordenadosPorGoles); //sort devuelve un nuevo array con los futbolistas ordenados por goles.

const invertidos = futbolistas.toReversed(); //Invertir el orden de los futbolistas.
console.log(invertidos); //toReversed devuelve un NUEVO array con los elementos invertidos.

futbolistas.reverse(); //Invertir el orden de los futbolistas en el array original.
console.log(futbolistas); //reverse modifica el array original.

const nombresString = futbolistas.map((j) => j.nombre).join(", "); //Obtener una lista con solo los nombres de los futbolistas separados por coma (en un string).
console.log(nombresString); //join devuelve un string con los elementos separados por el caracter que le pasamos.

console.log(futbolistas.toString()); //Convertir el array de futbolistas en un string (lo cambia).

const anidado = [[{ nombre: "Messi" }], [{ nombre: "Ronaldo" }]]; //Array anidado con dos arrays de un objeto.
console.log(anidado.flat()); //Convertir el array anidado en un array simple.

const equipos = ["PSG", "Real Madrid", "Barcelona"];
console.log(equipos.indexOf("Real Madrid")); //Encontrar la posición en la que se encuentra el Real Madrid.

console.log(equipos.lastIndexOf("PSG")); //Encontrar la última posición en la que se encuentra el PSG.

console.log(equipos.includes("Barcelona")); //Saber si el Barcelona está en el array.
//includes devuelve un booleano si el elemento está en el array.s
