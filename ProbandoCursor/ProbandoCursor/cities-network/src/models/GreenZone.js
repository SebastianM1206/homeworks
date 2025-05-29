class GreenZone {
    constructor(name, height) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.height = height;
        this.subzones = [];
    }

    addSubzone(subzone) {
        this.subzones.push(subzone);
    }

    removeSubzone(subzoneId) {
        this.subzones = this.subzones.filter(zone => zone.id !== subzoneId);
    }

    getHeight() {
        return this.height;
    }

    getTotalSubzones() {
        return this.subzones.reduce((count, subzone) => count + subzone.getTotalSubzones() + 1, 0);
    }

    updateInfo(name, height) {
        this.name = name;
        this.height = height;
    }
}

export default GreenZone; 