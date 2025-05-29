class EnvironmentalZone {
  constructor(name, level = 1) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.level = level;
    this.subzones = [];
    this.createdAt = new Date();
  }

  addSubzone(subzone) {
    subzone.level = this.level + 1;
    this.subzones.push(subzone);
  }

  removeSubzone(subzoneId) {
    this.subzones = this.subzones.filter((zone) => zone.id !== subzoneId);
  }

  getLevel() {
    return this.level;
  }

  getTotalSubzones() {
    return this.subzones.reduce(
      (count, subzone) => count + subzone.getTotalSubzones() + 1,
      0
    );
  }

  updateInfo(name) {
    this.name = name;
  }

  getAllSubzones() {
    let allSubzones = [];
    for (let subzone of this.subzones) {
      allSubzones.push(subzone);
      allSubzones = allSubzones.concat(subzone.getAllSubzones());
    }
    return allSubzones;
  }
}

export default EnvironmentalZone;
