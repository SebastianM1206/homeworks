export class City {
  constructor(name, population) {
    this.name = name;
    this.population = population;
    this.id = `city-${name}`;
  }
}
