export default class Campaign {
  constructor() {
    this.locations = new Set();
  }

  addLocation(id) {
    this.locations.add(id);
  }

  removeLocation(id) {
    this.locations.delete(id);
  }
}
