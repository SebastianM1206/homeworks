class Location {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.environmentalZones = [];
    this.connections = [];
    this.createdAt = new Date();
  }

  addEnvironmentalZone(zone) {
    zone.level = 1;
    this.environmentalZones.push(zone);
  }

  removeEnvironmentalZone(zoneId) {
    this.environmentalZones = this.environmentalZones.filter(
      (zone) => zone.id !== zoneId
    );
  }

  getTotalLevels() {
    return this.environmentalZones.reduce(
      (total, zone) => total + zone.getLevel(),
      0
    );
  }

  getMaxDepth() {
    const getDepth = (zones, currentDepth = 1) => {
      if (zones.length === 0) return currentDepth - 1;
      return Math.max(
        ...zones.map((zone) =>
          Math.max(currentDepth, getDepth(zone.subzones, currentDepth + 1))
        )
      );
    };
    return getDepth(this.environmentalZones);
  }

  getEnvironmentalZoneCount() {
    return this.environmentalZones.reduce(
      (count, zone) => count + zone.getTotalSubzones() + 1,
      0
    );
  }

  addConnection(location) {
    if (!this.connections.some((conn) => conn.id === location.id)) {
      this.connections.push(location);
      if (!location.connections.some((conn) => conn.id === this.id)) {
        location.connections.push(this);
      }
    }
  }

  removeConnection(location) {
    this.connections = this.connections.filter((c) => c.id !== location.id);
    location.connections = location.connections.filter((c) => c.id !== this.id);
  }

  getConnectionNames() {
    return this.connections.map((c) => c.name);
  }
}

export default Location;
