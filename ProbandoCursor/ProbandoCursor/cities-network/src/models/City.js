class City {
    constructor(name) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.greenZones = [];
        this.connections = [];
    }

    addGreenZone(zone) {
        this.greenZones.push(zone);
    }

    removeGreenZone(zoneId) {
        this.greenZones = this.greenZones.filter(zone => zone.id !== zoneId);
    }

    getTotalHeight() {
        return this.greenZones.reduce((total, zone) => total + zone.getHeight(), 0);
    }

    getGreenZonesCount() {
        return this.greenZones.reduce((count, zone) => count + zone.getTotalSubzones() + 1, 0);
    }

    addConnection(city) {
        if (!this.connections.includes(city)) {
            this.connections.push(city);
            city.connections.push(this);
        }
    }

    removeConnection(city) {
        this.connections = this.connections.filter(c => c !== city);
        city.connections = city.connections.filter(c => c !== this);
    }
}

export default City; 